# React.js-UI
Sign-Off Task for SSE Module, Portsmouth University

# Description 
This application is a React.js user interface which connects to an API at the endpoint /api/.

For development purposes, I've set up the React.js development proxy which redirects api calls to https://counters-dot-sse-2019.appspot.com/

# Before installation
- The current configuartion tells the React Development Server to run on port 80 so admin privileges are required.

# Installation
1. Install Git
2. Install Node.js
3. 'git clone https://github.com/austcollins/React.js-UI.git' |OR| Download this repository as a zip and extract
4. Navigate to the installation directory 'cd React.js-UI/'
4. run 'npm install'
5. run 'sudo npm start'

# Assumptions/Decision notes
- I've left the application in one file instead of code splitting as it's a small applicaiton and doing so wouldn't aid readability.
- refreshCounter simply calls updateValue, I found it more readable when keeping the event handler seprate from the timer - rather than having the interval call the event handler.
