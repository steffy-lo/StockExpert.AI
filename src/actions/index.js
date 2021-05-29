import axios from "axios";

export const symbolLookUp = async (query) => {
    try {
        const response = await axios.get(`https://finnhub.io/api/v1/search?q=${query}&token=${process.env.REACT_APP_FINNHUB_API_TOKEN}`);
        return response.data.result.slice(0, 15)
    } catch (error) {
        console.error(error);
    }
}

export const getStockNews = async (query) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=popularity&pageSize=30&apiKey=${process.env.REACT_APP_NEWS_API_TOKEN}`);
        return response.data.articles
    } catch (error) {
        console.error(error);
    }
}
