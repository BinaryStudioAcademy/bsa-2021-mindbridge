import api from '@helpers/api.helper';

const createPostService = {
  sendImage: async (image: FormData) => {
    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: image
    });
  },

  sendPost: async (post: object) => { api.post('/api/post/create', {data: post})}
  
};

export default createPostService;
