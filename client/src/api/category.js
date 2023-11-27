import axios from 'axios';

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

export const putCategory = async (categoryName) => {
    try {
        await axios.put(`${baseURL}${PATH_PREFIX}${categoryName}`) 
    } catch (error) {
        console.log("axios function call error:", error);
    }
}

// export const testExport = async () => {
//     return "test export success";
// }

export async function respondToCategorySubmit(categoryName) {
    await putCategory(categoryName);
    const res = await getAllCategories();
    return res;
}

export async function testReturnString() {
    return "Some Success Export"
}

// export const getCategoryById
// params to get id
// id: 
//  
// /category/investing

// admin
// export const deleteCategory for admin user
// export const addCategory 
// modifyCategory