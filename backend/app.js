const express=require('express');
const cookieParser = require('cookie-parser');
const authRoutes=require('./routes/authRoutes');
const dotenv = require('dotenv')
const connectDB=require('./db');

dotenv.config();
const app=express();
connectDB();

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);


app.use((req,res)=>{
    res.status(404).json({
        msg:'page not found'
    })
})

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`);
  });
