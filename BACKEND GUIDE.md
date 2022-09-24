BACKEND GUIDE 

# Project Set Up:
Create folders
initialize json package
install dependencies.. mongoose, express, dotenv
create server file
add start script

# Basic Express Server
import server dependencies
create temp port
initialize express

# DB
Create new DB/Cluster
Add credentials to .env
hook up process.env to declared port
confirm app.listen is running env port number

# Router / Routes
create routes folder and routes.js
intialize router & kick off simple get req
create route within server, call created route with app.use('foo', routeName)

# Controllers
create various controllers within controller folder
export them all as object
import methods from controller to router.. get/post/put/delete