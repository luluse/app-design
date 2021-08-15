<p align="center">
  <img alt="hirondelle" src="./assets/logo-react.png" width="60" />
</p>

# Genuine Drink


<img alt="Video Genuine Drink" src="./assets/gd-gif.gif" width="250" />

## React Native App using the following libraries:

- Styled Components
- Expo
- Redux
- GraphQL
- Apollo
- Contentful
- LottieFiles designs
- Firebase Authentication

## Vision
#### What is the vision of this product?
A mobile application That gather news from different sources regarding the Wine, Beer and Food Industry.

#### What pain point does this project solve?
This allows the user to find all news related to that subject in one place.

#### Why should we care about your product?
The app does the hard work of scrapping the internet to collect and offer to the user all articles and last top news about the hospitality industry in one app.

### MVP
A user can create an account and login and have a news feed of most recent news. The user can filter articles for different categories. 

### Scope
#### IN
- This app will allow users to create an account and login in/log out.
- This app will allow users to save, share through email/text articles.
- This app will allow users to pick up and article where they left it off.
- This app will allow the user to filter their search for selected topics.
- The notifications component notifies the user of new articles since last time they visited.

#### OUT
- This app will not allow users to interact with other users.
- This app will not allow users to comment on articles.
- This app will not chat functionality.

## Data Flow
- User creates an account using username and password. New account get stored in Firebase
- Upon login, users' token get saved in local storage. The app remembers the users everytime they lanch the app.  
- When logged in, GraphQL/Appolo do a query to server and provides list of news articles and data relating to the idividual user.
- User engages by reading, saving, sharing articles.

### Functional Requirements
- A user can update their profile information
- A user can search all of the articles available in the app

### Non-Functional Requirements
- Security: FireBase allows the user to create and log in to secure account. 

- User Interface: The UI and UX allow the user to enjoy a smooth experience with surfing the app. 
