import React from "react";
import { getContentSummary } from "../actions";
import Loader from "../components/Loader";
import { articleBreakdownData } from "../mock_data";
import {getColor} from "../utils";

function ArticleBreakdown({ newsList, token, sentiment }) {

    const [articles, setArticles] = React.useState([]);

    const loadArticleBreakdown = async () => {
        // const articles = [];
        // for (let i = 0; i < newsList.length; i++) {
        //     const mainSentences = await getContentSummary(token, newsList[i].content);
        //     if (mainSentences) {
        //         articles.push({
        //             title: newsList[i].title,
        //             url: newsList[i].url,
        //             sentiment: sentiment[i].overall,
        //             sentences: mainSentences
        //         });
        //     }
        // }
        setArticles(articleBreakdownData);
    }

    React.useEffect(() => {
        if (sentiment.length > 0) {
            loadArticleBreakdown();
        }
    }, [newsList, sentiment])

    return (
        <>
            {articles.length > 0 ?
                <div style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <p style={{
                        fontSize:"24px"}}>
                        Articles Breakdown
                    </p>
                    <div style={{ textAlign: "left"}}>
                        {articles.slice(0).reverse().map(article =>
                            <div style={{
                                backgroundColor: "rgba(255, 255, 255, .15)",
                                backdropFilter: "blur(5px)",
                                paddingLeft: "22px",
                                paddingRight: "22px"
                            }}>
                                <div style={{ display: "flex", alignItems: "center"}}>
                                    <a  href={article.url} style={{fontSize:"18px", color: "#a8a1ff", cursor: "pointer"}}>
                                        {article.title}
                                    </a>
                                    <span style={{ marginLeft: "auto", padding: "10px", backgroundColor: getColor(article.sentiment), width: "70px", textAlign: "center"}}>
                                        {article.sentiment.toFixed(1)}
                                    </span>
                                </div>
                                <ul style={{ marginTop: "10px" }}>
                                    {article.sentences.map(sentence =>
                                    <li style={{fontSize:"16px"}}><p>{sentence.value}</p></li>)}
                                </ul>
                                <hr style={{borderColor: "#7469ff"}}/>
                            </div>
                            )}
                    </div>
                </div> :
                <div style={{height: "400px", marginTop: "50px"}}>
                    <Loader/>
                </div>}
        </>
    );
}

export default ArticleBreakdown;
