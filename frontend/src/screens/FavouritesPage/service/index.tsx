import api from '@helpers/api.helper';

export const favouritesPageService = {
  getFavouritesPosts: async params => api.get(`/api/favourite/${params.id}`, { params })
};
