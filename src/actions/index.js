import axios from "axios";

export const getExpertAiToken = async () => {
    try {
        const response = await axios.post('https://developer.expert.ai/oauth2/token', {
            "username": process.env.REACT_APP_EXPERT_AI_USERNAME,
            "password": process.env.REACT_APP_EXPERT_AI_PASSWORD
        })
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export const getContentSummary = async (token, text) => {
    try {
        const response = await axios.post('https://nlapi.expert.ai/v2/analyze/standard/en/relevants', {
            "document": {
                "text": text
            }
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data.data.mainSentences
    } catch (error) {
        console.error(error);
    }
}

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
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&language=en&excludeDomains=stocknews.com&sortBy=popularity&pageSize=30&apiKey=${process.env.REACT_APP_NEWS_API_TOKEN}`);
        return response.data.articles
    } catch (error) {
        console.error(error);
    }
}
