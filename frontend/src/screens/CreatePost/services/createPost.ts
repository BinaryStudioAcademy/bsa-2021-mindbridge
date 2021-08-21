import api from '@helpers/api.helper';

const createPostService = {
  getData: async (id: string) => api.get(`/api/user/${id}`),
  getPostVersions: async (filter: any) => api.get(`/api/postVersion/all/${filter.postId}`, { params: filter.params }),
  sendImage: async (image: FormData) => (
    api.post('/api/image/save',
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: image
      })
  ),
  sendPost: async (post: object) => api.post('/api/post/create', { data: post }),
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
