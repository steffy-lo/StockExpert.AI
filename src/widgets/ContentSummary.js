import React from "react";
import { getContentSummary } from "../actions";
import { extract } from 'article-parser';

const getArticle = async (url) => {
    try {
        const article = await extract(url);
        return article;
    } catch (err) {
        console.trace(err);
    }
};

const removeTags = (str) => {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, ' ');
}

function ContentSummary({ newsList, token }) {

    const [summaries, setSummaries] = React.useState([]);

    const loadSummaries = async () => {
        const contentSummaries = [];
        for (let i = 0; i < newsList.length; i++) {
            const article = await getArticle(newsList[i].url)
            if (article) {
                // expert.ai text input supports up to 10,000 characters for free version
                const textContent = removeTags(article.content).slice(0, 10000)
                const mainSentences = await getContentSummary(token, textContent);
                if (mainSentences) {
                    contentSummaries.push(mainSentences);
                }
            }
        }
        setSummaries(contentSummaries);
        console.log(contentSummaries)
    }

    React.useEffect(() => {
        loadSummaries();
    }, [newsList])

    return (
        <>
            {/*{summaries.map(summary => <div>*/}
            {/*    {summary.map(sentence => sentence.value)}*/}
            {/*</div>)}*/}
        </>
    );
}

export default ContentSummary;
