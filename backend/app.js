const express=require('express')
const mongoose=require("mongoose")
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv')
dotenv.config();
const app=express();


mongoose.connect(process.env.dbURI, {useFindAndModify:true, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) =>{
      console.log('mongodb connected');
      app.listen(process.env.PORT||5000,()=>console.log(5000));

})
  .catch((err) => console.log(err));

app.use(express.static('public'))
app.use(express.json());
app.use(cookieParser());

app.set('views','./views')
app.set('view engine','ejs')