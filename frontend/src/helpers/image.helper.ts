import postPageService from '@screens/PostPage/services/PostPage';
import { toastr } from 'react-redux-toastr';

export const checkImage = file => {
  const BYTES_IN_MEGABYTE = 1024 * 1024;
  if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
    toastr.error('Error', 'Select a valid image!');
    return false;
  }
  if (file.size > (BYTES_IN_MEGABYTE)) {
    toastr.error('Error', 'File is too large, use image less than 1Mb!');
    return false;
  }
  return true;
};

export const getUrl = (file, uploadHandler) => {
  if (checkImage(file)) {
    const formData = new FormData();
    formData.append('file', file);
    return postPageService.sendImage(formData)
      .then(url => {
        const response = {
          result: [
            {
              url: `${url}`,
              name: file.name,
              size: file.size
            }
          ]
        };
        uploadHandler(response);
      });
  }
  return uploadHandler(null);
};
