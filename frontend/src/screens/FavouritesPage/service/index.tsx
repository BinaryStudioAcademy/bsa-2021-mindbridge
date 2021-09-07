import api from '@helpers/api.helper';

export const favouritesPageService = {
  getFavouritesPosts: async params => api.get(`/api/favourite/${params.id}`, { params }),
  saveFavouritePost: async body => api.post('/api/favourite/save', { data: body }),
  deleteFavouritePost: async body => api.delete('/api/favourite/delete', { data: body })
};
