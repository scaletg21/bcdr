# SCALE BCDR APP

SCALE Technology Group - Business Continuity & Disaster Recovery Assesment

Frontend and Backend code. This does not include SCALE question, scoring, and metadata that is collected during the assesment. Only the logic to gather data. 

Use the compose.yml file to start the application
`docker compose -f compose.yml up -d`

This will create two containers - "Frontend" & "Backend".

Frontend is configured to only listen on 443 and the certificates are configured within Nginx. There is a reverse proxy configured to make sure that /api calls are routed correctly. 
Backend is configured to only respond on 3443 and the certificates are configured within the Express API. Therefore, the frontend makes calls to the backend using /api via 3443 then retrieves the data from MongoDB hosted via Atals on a GCP instance. 

This application is hosted in the SCALE private cloud and was created using the following:

[![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&amp;logo=react&amp;logoColor=61DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&amp;logo=vite&logoColor=fff)](#)
[![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=for-the-badge&amp;logo=node.js&amp;logoColor=white)](#)
[![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&amp;logo=npm&amp;logoColor=fff)](#)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&amp;logo=chartdotjs&amp;logoColor=fff)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&amp;logo=mongodb&amp;logoColor=white)](#)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3.svg?style=for-the-badge&amp;logo=bootstrap&amp;logoColor=white)](#)




