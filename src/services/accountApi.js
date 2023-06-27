import axiosClient from '~/utils/axiosClient';

const accountApi = {
    login: (params) => {
        const url = '/auth/login';
        return axiosClient.post(url, { ...params });
    },
    getMe: () => {
        const url = '/auth/getMe';
        return axiosClient.get(url);
    },
};
export default accountApi;
