import axios from 'axios';

import landongmoAxios from '../util/request';

export const uploadImage = async (file: File): Promise<string | undefined> => {
  const preSignedUrl = await getPreSignedUrl(file.name);
  const imageUrl = await uploadToBucket(preSignedUrl, file);
  return imageUrl
    ? `${preSignedUrl.data.url}${preSignedUrl.data.fields.key}`
    : '';
};

const getPreSignedUrl = async (fileName: string) => {
  const result: presignedUrlRes = await landongmoAxios().get(
    `/meetings/presigned-url?file_name=${fileName}`,
  );
  return result;
};

const uploadToBucket = async (preSignedUrl: presignedUrlRes, file: File) => {
  try {
    const formData = new FormData();
    for (const [key, value] of Object.entries(preSignedUrl.data.fields)) {
      formData.append(key, value);
    }
    formData.append('file', file);
    await axios.post(preSignedUrl.data.url, formData);
    return true;
  } catch (e) {
    return false;
  }
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
