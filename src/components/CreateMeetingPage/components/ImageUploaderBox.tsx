import React, {
  ChangeEvent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';

import styled from '@emotion/styled';

import delete_icon from '../../../assets/icon/createMeeting/delete_icon.svg';
import upload_img from '../../../assets/icon/createMeeting/upload_img.svg';
import { COLOR } from '../../../constant/color';
interface Props {
  previewRef: React.MutableRefObject<HTMLImageElement | null>;
  onSetImageHandler: (e?: ChangeEvent<HTMLInputElement>) => void;
  image: File | null;
}

function ImageUploaderBox({
  previewRef,
  onSetImageHandler,
  image,
}: Props): ReactElement {
  const [imageUrl, setImageUrl] = useState(upload_img);

  const ImageSrc = useCallback(() => {
    if (image && typeof image === 'object') {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(image);
    } else setImageUrl(upload_img);
  }, [image]);

  useEffect(() => {
    ImageSrc();
  }, [ImageSrc, image]);

  return (
    <ImageUploaderBoxWrapper>
      <TitleText>
        사진 추가<SubTitle>(선택)</SubTitle>
      </TitleText>
      <Notice>모임 사진을 선택하지 않으면 기본 사진이 들어가요.</Notice>
      <FileWrapper>
        <FileUploadBox className="file-upload-box file-upload btn btn-primary">
          <ImageInputPreview
            src={imageUrl}
            ref={previewRef}
            hasImage={image ? true : false}
          />
          <FileUploadInput
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            name="FileAttachment"
            id="FileAttachment"
            className="upload"
            onChange={onSetImageHandler}
          />
        </FileUploadBox>
        {image && (
          <RemoveImg src={delete_icon} onClick={() => onSetImageHandler()} />
        )}
      </FileWrapper>
    </ImageUploaderBoxWrapper>
  );
}

const ImageUploaderBoxWrapper = styled.div`
  margin: 1.96rem 1.6rem 3.2rem 1.6rem;
`;

const TitleText = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;

  margin-bottom: 0.8rem;
  color: ${COLOR.TEXT_BLACK};
`;

const SubTitle = styled.div`
  display: inline;
  margin-left: 0.4rem;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2.3rem;
  letter-spacing: -0.03rem;
  color: ${COLOR.FONT_BODY_GREY};
`;

const Notice = styled.div`
  font-size: 1.3rem;
  line-height: 1.9rem;
  letter-spacing: -0.03rem;

  color: ${COLOR.LIGHT_GREEN};
  margin-bottom: 1.6rem;
`;

const FileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const FileUploadBox = styled.div`
  position: relative;
  overflow: hidden;

  width: 7rem;
  height: 7rem;
  border: 1px solid #cbcccd;
  box-sizing: border-box;
  border-radius: 0.4rem;
  background-size: 7rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const FileUploadInput = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  filter: alpha(opacity=0);
`;

const ImageInputPreview = styled.img<{ hasImage: boolean }>`
  max-width: 100%;
  height: auto;
`;

const RemoveImg = styled.img`
  margin-left: 0.2rem;
`;

export default ImageUploaderBox;
