import axios from 'axios';

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
        await axios.put(`${baseURL}${PATH_PREFIX}${categoryName}`) 
    } catch (error) {
        console.error("axios function call error:", error);
    }
}

///
export const putCategory = async (category) => {
    try {
        await axios.put(`${baseURL}${PATH_PREFIX}`, {category}) 
    } catch (error) {
        console.error("axios function call error:", error);
    }
}
///

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

export const getQuestionsByLessonAndProgress = async (lessonObject) => {
    try {
        const { lesson, progress } = lessonObject;
        const username = sessionStorage.getItem('username');
        const response = await axios.post(`${baseURL}${PATH_PREFIX}lesson-progress`, {
            lesson,
            progress,
            username
        });
        return response.data;
    } catch (err) {
        return err;
    }
}

export const getAllUnitByLesson = async (lesson) => {
    try {
        const response = await axios.post(`${baseURL}${PATH_PREFIX}by-lesson`, {
            lesson,
        });
        return response.data;
    } catch (err) {
        return err;
    }
}

export const getUnitByLessonAndId = async (lessonObject) => {
    try {
        const { lesson, id } = lessonObject;
        const response = await axios.post(`${baseURL}${PATH_PREFIX}by-lesson-id`, {
            lesson,
            id,
        });
        return response.data;
    } catch (err) {
        return err;
    }
}

export const getStudyGuideByLessonAndId = async (lessonObject) => {
    try {
        const { lesson, id } = lessonObject;
        const response = await axios.post(`${baseURL}${PATH_PREFIX}by-lesson-id`, {
            lesson, 
            id,
        });
        return response.data.categories.study_guide;
    } catch (err) {
        return err;
    }
}
