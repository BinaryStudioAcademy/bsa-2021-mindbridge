import api from '@helpers/api.helper';

const createPostService = {
  sendImage: async (image: FormData) => (
    api.post('/api/image/save',
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: image
      })
  ),

  sendPost: async (post: object) => { await api.post('/api/post/create', { data: post }); }

};

export default createPostService;
