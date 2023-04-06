![Linter](https://github.com/BogdanMilivojevic/Hermes-chat-v2-FE/actions/workflows/linter.yml/badge.svg)

# Hermes-chat  
Hermes-chat-v2-FE is a React frontend for a real-time messaging app
\
Hermes-chat-v2-BE or the server side can be found on Github: https://github.com/BogdanMilivojevic/Hermes-chat-v2-BE

![Homescreen](/public/uiOne.png)

![Chat](/public/uiTwo.png)

Features:
- Websocket enables real-time messaging
- Debounced users search
- Messages can contain text and images
- Timestamp of the sent messages
- Infinite scroll pagination in chat
- Browser notification
## Local development   
Clone this repository. You will need node v18.9.0 and npm installed on your machine.

Installation:

` npm install `

Env variables:

create .env file from .env.example and put your own keys

To Start Server:

` npm start `

To Visit App:

localhost:3000

## Deployment   

The app is deployed on Vercel at the following link: https://hermes-chat-v2.vercel.app/

Deploy is done automatically when merging into master.
## Naming conventions

Branches should be named as following: HE-30-Popup-Fix,in this example HE-30 is the number of the ticket on Trello and after that is a short description. Commit messages should also have this format.





