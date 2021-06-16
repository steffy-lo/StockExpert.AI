import React from "react";
import { getContentSummary } from "../actions";
import Loader from "../components/Loader";
import { articleBreakdownData } from "../mock_data";
import {getColor} from "../utils";

function ArticleBreakdown({ newsList, token, sentiment, setArticleBreakdownResult}) {

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
        //             sentences: mainSentences.map(sentence => sentence.value)
        //         });
        //     }
        // }
        setArticles(articleBreakdownData);
        setArticleBreakdownResult(articleBreakdownData);
    }

    React.useEffect(() => {
        if (sentiment.length > 0) {
            loadArticleBreakdown();
        }
    }, [newsList, sentiment])

    return (
        <>
            {articles.length > 0 ?
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", height: "435px", overflowY: "scroll"}}>
                    <p style={{
                        fontSize:"24px"}}>
                        Articles Breakdown
                    </p>
                    <div style={{ textAlign: "left"}}>
                        {articles.slice(0).reverse().map(article =>
                            <div style={{
                                backgroundColor:"#3e444f",
                                backdropFilter: "blur(5px)",
                                paddingLeft: "22px",
                                paddingRight: "22px",
                                borderRadius:"6px"
                            }}>
                                <div style={{ display: "flex", alignItems: "center"}}>
                                    <a  href={article.url} style={{fontSize:"18px", color: "#a8a1ff", cursor: "pointer"}}>
                                        {article.title}
                                    </a>
                                    <span style={{ borderBottomRightRadius:"6px",borderBottomLeftRadius:"6px", marginLeft: "auto", backgroundColor: getColor(article.sentiment), padding:"8px 0px", minWidth: "80px", textAlign: "center"}}>
                                        {article.sentiment.toFixed(1)}
                                    </span>
                                </div>
                                <ul style={{ marginTop: "10px" }}>
                                    {article.sentences.map(sentence =>
                                    <li style={{fontSize:"16px"}}><p>{sentence}</p></li>)}
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
