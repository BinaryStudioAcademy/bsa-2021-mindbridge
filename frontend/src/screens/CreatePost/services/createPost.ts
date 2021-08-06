import api from '@helpers/api.helper';

const createPostService = {
  getData: async () => api.get('/api/user/b9eb8231-5422-4d6f-906b-eeb55da1edd1'),
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
