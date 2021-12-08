import customAxios from '../util/request';

export const uploadImage = async (file: File): Promise<string | undefined> => {
  const preSignedUrl = await getPreSignedUrl(file.name);
  const imageUrl = await uploadToBucket(preSignedUrl, file);
  return imageUrl
    ? `${preSignedUrl.data.url}${preSignedUrl.data.fields.key}`
    : '';
};

const getPreSignedUrl = async (fileName: string) => {
  const result: presignedUrlRes = await customAxios().get(
    `/meetings/presigned-url?file_name=${fileName}`,
  );
  return result;
};

const uploadToBucket = async (preSignedUrl: presignedUrlRes, file: File) => {
  return new Promise((res, rej) => {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(preSignedUrl.data.fields)) {
        formData.append(key, value);
      }
      formData.append('file', file);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', preSignedUrl.data.url, true);
      xhr.send(formData);
      xhr.onload = function () {
        this.status === 204 ? res(true) : rej(false);
      };
    } catch (e) {
      rej(false);
    }
  });
};

type presignedUrlRes = {
  data: {
    url: string;
    fields: {
      key: string;
      'x-amz-algorithm': string;
      'x-amz-credential': string;
      'x-amz-date': string;
      policy: string;
      'x-amz-signature': string;
    };
  };
};
