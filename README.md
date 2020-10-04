# sourdoughTracker

Solve all of your sourdough baking woes by logging your bakes and viewing your baking data. 

## Initial Set Up
To run on your own machine, first create a postgres database, and update the "DATABASE_URL" field in sourdough-tracker/api/.flaskenv with the appropriate database url. 

Run "yarn start-api" then enter the following commands in your console to create the neccessary data tables in your database

"flask db init"  
"flask db migrate"  
"flask db upgrade"  

You can check in psql to make sure the "bakes" table has been created.  Once you have the database set up, you won't have to set it up again (unless you delete the tables or something). 

## Running the Application 

First start up your database server.  On Ubuntu, I use the command "sudo service postgresql start"


To start up backend, run command: yarn start-api

To start up frontend, run command (in a different terminal): yarn start


Application should open in your default browser window automatically. Sometimes Firefox will block you from posting entries to the database, so Chrome might be a better browser choice. 
You can now log your bakes and find out what factors contribute to great bread!
