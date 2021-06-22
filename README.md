<p align="center">
<img src="https://res.cloudinary.com/viclo2606/image/upload/v1624362747/title_rwedcs.gif" />
</p>

## Inspiration

In finance, sentimental analysis is an important tool for stock analysis.

Based on news or any media-related sources, it is used to determine investors’ opinion on a specific stock. And this opinion or sentiment can forecast the stock’s value over time.

Today, there are many stock sentimental tools online but they come at a high cost to an investor. Furthermore, some of these tools lack clarity and depth to their sentimental analysis, making it difficult for an investor to get value out of the analysis results.

Our solution to these problems is **StockExpert.AI**, a tool that we believe can be your intelligent stock sentimental analysis expert.


## What it does
The main goal of our app is to provide sentimental analysis on any stock with simple yet comprehensive visuals. Here is the typical user experience flow:
1. The user will enter a stock to analyze, the app suggests stock symbols in the search bar using Finnhub.io API.
2. Next, using the News API, the app retrieves 15 related news on the stock
3. The app uses expert.ai’s NLP API to analyse each article on the stock
4. All the data is then compiled and presented in readable charts and graphs using the Recharts.js library
5. More features, such as saving stock searches to watchlist or looking at past sentimental results, can be used if the user creates a free account in the app.

## How we built it
- For the front end, we use the React framework and Recharts.js library to render the graphs and charts
- For user authentication, we use AWS Amplify + Cognito
- To store user data, we use MongoDB
- The APIs we used to build this app is Finnhub.io API, News API and expert.ai NLP API

## Challenges we ran into
1. **API limits:** Using free tier versions for Finnhub.io, News and expert.ai APIs posed some challenges and restrictions after many testing. We had to create a new Finnhub.io dev account after we reached their limit.
2. **News parser**: Feeding in relevant text to the expert.ai was a challenge due to the news parser scraping any text in the article including the date, author’s name, and social media links. We had to ensure only the article's content is analysed by the API.
3. **Database design:** we were concerned with how to store so much sentimental data for each user so that our app can easily fetch, push and display this data whenever.
4. **API in Production Issue**: When deploying our app to Heroku, we noticed that the News API free tier does not permit production environments. However, without this API, the app won’t be able to fetch 15 related news articles for the stock's sentimental analysis. The paid version for this API is too expensive ($499/month). 

So the workaround is to create a test account in which we have already run sentimental analysis on a few stocks. This data is saved under that account and we deployed the app to heroku for the judges and anyone to test on that account.

You can view watchlist, history and see the results for the saved stocks under the test account. But you won't be able to run analysis on a new stock on the heroku app because News API is not free in production.

If you really want to test the app's "Run Sentimental Analysis" function, you can clone the repo to a local machine. Create an `.env` in the root folder and pass in your own credentials because we cannot share our own credentials to the public. Sorry for any inconvenience.

```
REACT_APP_FINNHUB_API_TOKEN=
REACT_APP_NEWS_API_TOKEN=
REACT_APP_EXPERT_AI_USERNAME=
REACT_APP_EXPERT_AI_PASSWORD=

REACT_APP_AWS_REGION=
REACT_APP_COGNITO_ID_POOL=
REACT_APP_USER_POOLS_ID=
REACT_APP_USER_POOLS_WEB_CLIENT_ID=

MONGODB_URI=
```
## How to test our demo on heroku
1. Go to https://stock-expert-ai.herokuapp.com/
2. Click "Sign In"
3. Enter username: stockexpert.ai@gmail.com
4. Enter password: stocksaregreat123
5. View History, Watchlist and Sentimental Analysis data on saved stocks

## Accomplishments that we're proud of
- Completed a fully functioning demo that encompasses our vision when we started on this project
- Even added extra features besides sentimental analysis, such as watchlist, history and user authentication
- Learning all about expert.ai’s NLP API and new technologies such as Recharts.js and AWS Amplify
- Managed to find a workaround to our “News API free tier can’t use in production” issue

## What we learned
- Learning a lot about expert.ai’s NLP API
- Learning a new React library called Rechart.js to display data is visually appealing charts
- Better database design with MongoDB
- Learning how to add authentication to React apps with AWS Amplify

## What's next for StockExpert.AI
- **Stock recommendations:** Recommend similar stocks based user's past searches
- **Action recommendations:** Recommend next action after sentimental data is displayed (i.e. buy, hold or sell)
- **Enhance UI/UX experience:** User customization (i.e. risk threshold, full in-depth sentimental and technical analysis, etc.), cleaner and more engaging UI and graphs
- **Export, save and download data from History or Watchlist**: Allow user to export their data for their own records

## Learn More
Read the [About](https://github.com/steffy-lo/StockExpert.AI/blob/master/About.md) documentation to learn more about each chart and what they mean.
