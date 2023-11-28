import axios from 'axios';

import * as qs from 'qs';

const baseURL = 'http://localhost:3000';

const PATH_PREFIX = '/category/';



export const getAllCategories = async () => {
    try {
        // frontend calls getAllCategories, know that you would have all the categories 
        // iterate through like an array, and then render a card separately to see all the categories 
        const response = await axios.get(`${baseURL}${PATH_PREFIX}`);
        return response.data;
    } catch (err) {
        console.error("axios file error:", err)
        return err;
    }
};

export const putCategoryFromName = async (categoryName) => {
    try {
        await axios.put(`${baseURL}${PATH_PREFIX}${categoryName}`) 
    } catch (error) {
        console.log("axios function call error:", error);
    }
}

export const deleteCategoryFromName = async (categoryName) => {
    try {
        await axios.delete(`${baseURL}${PATH_PREFIX}${categoryName}`) 
    } catch (error) {
        console.log("axios function call error:", error);
    }
}

export const putCategoryQuestion = async (category) => {
    let query_params = "";
    if (category.questions.length > 0) {
        query_params = qs.stringify(category.questions[0]);
    }
    try {
        await axios.put(`${baseURL}${PATH_PREFIX}${category.name}?${query_params}`) 
    } catch (error) {
        console.log("axios function call error:", error);
    }
}

export const deleteCategoryQuestion = async (category) => {
    let query_params = "";
    if (category.questions.length > 0) {
        query_params = qs.stringify(category.questions[0]);
    }
    try {
        await axios.delete(`${baseURL}${PATH_PREFIX}${category.name}?${query_params}`) 
    } catch (error) {
        console.log("axios function call error:", error);
    }
}

export const getCategory = async (categoryName) => {
    try {
        const res = await axios.get(`${baseURL}${PATH_PREFIX}${categoryName}`);
        console.log("category api res:::", res);
        console.log("category api res.body:::", res.body);
        return res.data;
    } catch (error) {
        console.log("axios function call error:", error);
    }
}

export async function respondToCategoryAdd(categoryName) {
    await putCategoryFromName(categoryName);
    const res = await getAllCategories();
    return res;
}

export async function respondToCategoryDelete(categoryName) {
    console.log("delete category:::", categoryName);
    await deleteCategoryFromName(categoryName);
    const res = await getAllCategories();
    return res;
}

export async function respondToCategoryGet(categoryName) {
    const res = await getCategory(categoryName);
    return res;
}
