#Bookshelf

Simple CRUD app to manage books. The objective of this project is to practice Backbone and MongoDB.

Database runs on a node.js server.

##Set up environment (Mac OS X)
Brew, Node.js and npm must be installed.

Install MongoDB:
  ```
  $ brew install mongodb
  ```

Create Database in `./data` folder:
  ```
  $ cd bookshelf-project-folder
  $ mongod --dbpath ./data
  ```

Create Database documents (mongo shell):
  ```
  $ mongo
  $ use bookshelf
  $ db.bookcollection.find()
  $ db.counters.insert({ _id: 'bookid', seq: 0 })
  ```

Start server:
  ```
  $ ./server
  ```

Access new app at:
  ```
  http://localhost:3000
  ```
