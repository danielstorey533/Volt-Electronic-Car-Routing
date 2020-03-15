# VOLT Maps
A third year project for IADT Creative Computing. Made by Daniel Storey and John Cleoffe Navarro.

![Screenshot of Volt Application](https://i.imgur.com/xprfpH6.png)


## Overview
Volt Maps is an app designed for electric vehicle users to calculate long distance journeys relative to
electronic chargers along the way.
The application uses the Google Maps JS API which offers numerous features such as places, directions and geocoding services.

## Pre-Requisite
- [Node.js](https://nodejs.org/en/download/ "Node Js")
  w/ NPM
- [Gulp](https://gulpjs.com/ "Gulp")

Install Gulp Globally

    $ npm -g install gulp
    
## Running the webapp

1. Clone repository:
`git clone https://github.com/jabskii/volt-maps-webapp.git`

2. Change directory:
`cd volt-maps-webapp.git`

3. Install all dependencies and libraries:
`npm install`

4. Run Gulp Task:
  - `gulp`        - To compile scss to css, minify css and js and build ready for production files in **dist** folder.

  - `gulp serve`  - Starts a local server with browserSync and hot reloading on changes to files (HTML, SCSS, JS).
