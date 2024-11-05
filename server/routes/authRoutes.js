 const express = require('express');

 const routes = express.Router();

 const {createUser , loginUser, getUsers , logout} = require('../controllers/authCont');

 const  authenticated  = require('../middlewares/verifyToken');


//  routes 

routes.post("/create" , createUser);

routes.post("/login" , loginUser);

routes.get("/users" , authenticated , getUsers);

routes.get("/logout" ,authenticated , logout);





module.exports = routes;