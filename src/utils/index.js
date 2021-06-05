import {extract} from "article-parser";

export const getArticle = async (url) => {
    try {
        return await extract(url);
    } catch (err) {
        console.trace(err);
    }
};

export const removeTags = (str) => {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, ' ');
}

export const COLORS = ['#3c31d4','#653cfa','#9188fc','#1b5efa','#0088FE', '#52aeff','#00C49F','#26a642','#72d932', '#fffb14','#FFBB28', '#FF8042','#cc3535','#e848a5','#fa9cff'];

export const getColor = (num) => {
    return num >= 0 ? "rgb(0, 196, 159)" : "#7469ff"
}