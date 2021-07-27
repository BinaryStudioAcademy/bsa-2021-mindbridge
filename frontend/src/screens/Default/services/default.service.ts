import { callApi } from '@helpers/api.helper';

const defaultService = {
  getData: async () => {
    const response = await callApi({
      endpoint: '/api/data/',
      type: 'GET'
    });

    return response.json();
  }
};

export default defaultService;
