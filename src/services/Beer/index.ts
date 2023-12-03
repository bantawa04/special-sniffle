import API from "@/lib/API.ts";


export const getBeers = async ({pageParam}:{pageParam: number}) => {

    const response = await API.get(`/beers?page=${pageParam}&per_page=10`);

    return response.data;

};

export const createBeer = async (props): Promise<{ success: boolean, data?: any }> => {
    try {
        const { name, tagline, image_url, ingredients } = props;

        if (name && tagline && image_url && ingredients) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            return Promise.resolve({ success: true, data: props });
        } else {
            throw new Error('Missing required parameters');
        }
    } catch (error) {
        return Promise.reject({ success: false, error: error.message });
    }
};
