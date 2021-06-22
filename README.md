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

## How to test our demo
1. Go to https://stock-expert-ai.herokuapp.com/
2. Click "Sign In"
3. Enter username: stockexpert.ai@gmail.com
4. Enter password: stocksaregreat123

## Challenges we ran into
1. **API limits:** Using free tier versions for Finnhub.io, News and expert.ai APIs posed some challenges and restrictions after many testing. We had to create a new Finnhub.io dev account after we reached their limit.
2. **News parser**: Feeding in relevant text to the expert.ai was a challenge due to the news parser scraping any text in the article including the date, author’s name, and social media links. We had to ensure only the article's content is analysed by the API.
3. **Database design:** we were concerned with how to store so much sentimental data for each user so that our app can easily fetch, push and display this data whenever.
4. **API in Production Issue**: When deploying our app to Heroku, we noticed that the News API free tier does not permit production environments. However, without this API, the app won’t be able to fetch 15 related news articles for the stock's sentimental analysis. The paid version for this API is too expensive ($499/month). One solution we thought of was asking the judges to test our app locally, but that would mean disclosing our other environment variables (Finnhub.io API, expert.ai API, AWS and MongoDB credentials). So the workaround is to create a test account in which we have already run sentimental analysis on a few stocks. All the data is saved under that account and we deployed the app to production for the judges to test on that account.

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
