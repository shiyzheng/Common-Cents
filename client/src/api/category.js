import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const getAllCategories = async () => {
    try {
        // frontend calls getAllCategories, know that you woudl have all the categories 
        // iterate through like an array, and then render a card separately to see all the categories 
        const response = await axios.get(`${baseURL}/category/`);
//        const response = await axios.get(`${baseURL}/account/profile`, {
        return response.data;
    } catch (err) {
        return err;
    }
};

// export const getCategoryById
// params to get id
// id: 
//  
// /category/investing

// admin
// export const deleteCategory for admin user
// export const addCategory 
// modifyCategory