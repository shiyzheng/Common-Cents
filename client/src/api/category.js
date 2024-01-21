import axios from 'axios';

import qs from 'qs';

const baseURL = 'http://localhost:3000';

const PATH_PREFIX = '/category/';

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${baseURL}${PATH_PREFIX}`);
        return response.data;
    } catch (err) {
        console.error("axios file error:", err)
        return err;
    }
};

export const putCategoryFromName = async (categoryName) => {
    try {
        // TODO:  can place JSON object in data argument
        await axios.put(`${baseURL}${PATH_PREFIX}${categoryName}`) 
    } catch (error) {
        console.error("axios function call error:", error);
    }
}

export const getCategoryByName = async (name) => {
    try {
        const response = await axios.get(`${baseURL}/category/getName`, {
            params: { name },
        });
        return response.data;
    } catch (err) {
        return err;
    }
}

export const deleteCategoryFromName = async (categoryName) => {
    try {
        await axios.delete(`${baseURL}${PATH_PREFIX}${categoryName}`) 
    } catch (error) {
        console.error("axios function call error:", error);
    }
}

export const putCategoryPath = async (category) => {
    let query_params = "";
    if (category.questions.length > 0) {
        query_params = "?" + qs.stringify(category.questions[0]);
    }
    try {
        await axios.put(`${baseURL}${PATH_PREFIX}${category.name}${query_params}`) 
    } catch (error) {
        console.error("axios function call error:", error);
    }
}

export const deleteCategoryPath = async (category) => {
    let query_params = "";
    if (category.questions.length > 0) {
        query_params = "?" + qs.stringify(category.questions[0]);
    }
    try {
        await axios.delete(`${baseURL}${PATH_PREFIX}${category.name}${query_params}`) 
    } catch (error) {
        console.error("axios function call error:", error);
    }
}

export const getCategory = async (categoryName) => {
    try {
        const res = await axios.get(`${baseURL}${PATH_PREFIX}${categoryName}`);
        return res.data;
    } catch (error) {
        console.error("axios function call error:", error);
    }
}

export async function respondToCategoryGet(categoryName) {
    const res = await getCategory(categoryName);
    return res;
}
