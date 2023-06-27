import axiosClient from '~/utils/axiosClient';

const searchApi = {
    search: (params) => {
        const url = '/users/search';

        return axiosClient.get(url, { params });
    },
};
export default searchApi;
