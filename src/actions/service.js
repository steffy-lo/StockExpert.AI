import axios from "axios";

let DEBUG = 1;
const host = DEBUG ? "http://localhost:3000" : "";

export const addUser = async (email) => {
    try {
        const response = await axios.post(host + "/user", {
            username: email,
            watchlist: [],
            history: []
        })
        return response.data
    } catch (error) {
        const errorMsg = error.response && error.response.data;
        if (errorMsg === "User already exist!") {
            return await getUser(email)
        }
        console.log(error)
    }
}

export const getUser = async (username) => {
    try {
        const response = await axios.get(host + `/user/${username}`)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateUser = async (userData) => {
    try {
        const response = await axios.put(host + "/user", userData)
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const addToUserHistory = async (resultData, username) => {
    try {
        const response = await axios.post(host + `/result/${username}`, resultData)
        return response.data
    } catch (error) {
        console.error(error);
    }
}
