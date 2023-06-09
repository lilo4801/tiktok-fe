import * as request from '~/utils/httpRequest';

const searchService = {
    search: async (q, type = 'less') => {
        try {
            const res = await request.get('users/search', {
                params: {
                    q,
                    type,
                },
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
};

export default searchService;
