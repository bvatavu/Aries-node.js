'use strict'

const express = require('express');
const app = express();
const config=require('./config/index')


require('./config/mongoose').initMongoose();
require('./config/express').initExpress(app);
require('./config/routes').initRoutes(app);

app.all('*',function(req,res,next){
    console.log('final router if not exist');
    return res.status(404).json({
        status:'fail',
        message: 'Can`t find url'
    });
})

app.use(function(err,req,res,next){
    console.log('middleware error');
    
    
    res.status(err.statusCode || 401).json({
        status:'error',
        message:err && err.message || 'Default message'
    })
});

app.listen(config.PORT,function(){
    console.log(`API on port ${config.PORT}`);
})

