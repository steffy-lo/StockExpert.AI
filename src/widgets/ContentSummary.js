import React from "react";
import { getContentSummary } from "../actions";
import Loader from "../components/Loader";
import { contentSummaryData } from "../mock_data";

function ContentSummary({ newsList, token }) {

    const [summaries, setSummaries] = React.useState([]);

    const loadSummaries = async () => {
        // const contentSummaries = [];
        // for (let i = 0; i < newsList.length; i++) {
        //     const mainSentences = await getContentSummary(token, newsList[i].content);
        //     if (mainSentences) {
        //         contentSummaries.push({
        //             title: newsList[i].title,
        //             sentences: mainSentences
        //         });
        //     }
        // }
        setSummaries(contentSummaryData);
    }

    React.useEffect(() => {
        loadSummaries();
    }, [newsList])

    return (
        <>
            {summaries.length > 0 ?
                <div style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <p style={{
                        fontSize:"24px"}}>
                        Content Summary
                    </p>
                    <div style={{ textAlign: "left"}}>
                        {summaries.map(summary =>
                            <div>
                            <p style={{
                                fontSize:"18px", color: "#a8a1ff"}}>
                                {summary.title}
                            </p>
                            <ul>
                                {summary.sentences.map(sentence =>
                                <li style={{fontSize:"16px"}}><p>{sentence.value}</p></li>)}
                            </ul>
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

export default ContentSummary;
