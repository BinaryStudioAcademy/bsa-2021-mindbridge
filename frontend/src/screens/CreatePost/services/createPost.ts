import api from '@helpers/api.helper';

const sendPostFetch = async (post: object) => api.post('/api/post/create', { data: post });

const createPostService = {
  getData: async (id: string) => api.get(`/api/user/${id}`),
  getPostVersions: async () => api.get('/api/post/versions/6dd35066-4b3b-4321-a576-dd249c45603d'),
  sendImage: async (image: FormData) => (
    api.post('/api/image/save',
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: image
      })
  ),
  sendPost: async (post: object) => sendPostFetch(post),
  getTags: async () => api.get('/api/tag/all'),
  getPost: async postId => api.get(`/api/post/${postId}`),
  sendPR: async payload => api.post(
    '/api/postPR/create',
    {
      data: payload
    }
  ),
  editPost: async payload => api.put(
    '/api/post/edit',
    {
      data: payload
    }
  )
};

export default createPostService;
