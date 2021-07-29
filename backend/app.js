const express=require('express');
const cookieParser = require('cookie-parser');


const authRoutes=require('./routes/authRoutes');
const adminRoutes=require('./routes/admin/authRoutes');
const categoryRoutes=require('./routes/categoryRoutes');
const productRoutes=require('./routes/productRoutes');


const dotenv = require('dotenv')
const connectDB=require('./db');

dotenv.config();
const app=express();
connectDB();

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());


app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);



app.use((req,res)=>{
    res.status(404).json({
        msg:'page not found'
    })
})

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}!`);
  });
