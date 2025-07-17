import axios, { AxiosError } from 'axios';
import { API_URL } from '../config/defaults';
import { apiGet, apiPost } from '../utils/http';
import { ProductDetailsParams } from '../Components/ProductsComponent';
const APIService = {
    auth: {
        login: async (data: any) => {
            try {
                return await apiPost('login', data);
            } catch (error) {
                console.error('Login failed:', JSON.stringify(error));
                throw error;
            }
        },
    },
    dashboard: {
        all: async (params = {}) => {
            return await apiGet('dashboard', {
                params: params
            });
        }
    },
    products: {
        all: async () => {
            return await apiGet('products');
        },
        view: async (id: number) => {
            return await apiGet(`products/${id}`);
        },
    },
    category: {
        all: async () => {
            try {
                return await apiGet('categories');
            } catch (error) {
                console.error('category.all failed', JSON.stringify(error));
                throw error;
            }
        },
        view: async (id: number) => {
            try {
                return await apiGet(`categories/${id}`);
            } catch (error) {
                console.error('category.id failed', JSON.stringify(error));
                throw error;
            }
        },
    },
    cart: {
        add: async (id: ProductDetailsParams['id']) => {
            try {
                return await apiPost(`cart/add`, {
                    "product_id": id
                });
            } catch (error: any) {
                console.error('cart.add failed', JSON.stringify(error.response.data));
                throw error;
            }
        },
        remove: async (id: ProductDetailsParams['id']) => {
            try {
                return await apiPost(`cart/remove`, {
                    "product_id": id
                });
            } catch (error: any) {
                console.error('cart.remove failed', JSON.stringify(error.response));
                throw error;
            }
        }
    }
}
function objectToUrlParams(obj: any) {
    const params = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
        }
    }
    return params.join('&');
}
export const productsData = async (params = {}) => {
    const API = `${API_URL}products?${objectToUrlParams(params)}`
    try {
        const response = await axios.get(API);
        return response.data.products;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
export const categoriesData = async (params = {}) => {
    const API = `${API_URL}products/category?${objectToUrlParams(params)}`
    try {
        const response = await axios.get(API);
        if (Object.keys(params).indexOf('type') > -1) {
            return response.data.products;
        }
        return response.data.categories;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
export const GetSingleProduct = async (id: number, params = {}) => {
    const API = `${API_URL}products/${id}?${objectToUrlParams(params)}`
    try {
        const response = await axios.get(API);
        if (Object.keys(params).indexOf('type') > -1) {
            return response.data.products;
        }
        return response.data.product;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
export async function fetchProducts(productIds = [], params = {}) {
    const urls = productIds.map(id => `${API_URL}products/${id}?${objectToUrlParams(params)}`);
    try {
        const responses = await Promise.all(urls.map(url => axios.get(url)));
        const products = await Promise.all(responses.map(res => res.data?.product));
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

export async function randomUserData(params = {}) {
    try {
        const response = await axios.get('https://randomuser.me/api/')
        return (response).data?.results[0]
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}
export default APIService;