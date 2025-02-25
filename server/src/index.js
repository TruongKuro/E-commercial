const express = require('express');
const cors=require("cors");
const mongoose=require("mongoose");
const route = require('./routes');
const bodyParser=require('body-parser');
const session=require('express-session');
const app = express();
const port = 5000;
require("dotenv").config();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: 'admin',
    resave: false, // session sẽ ko lưu với mỗi lệnh request => tốc đô
    saveUninitialized: false, // chắn chăn ko có session đc save mỗi request
}));
app.use((req, res, next) => {
    // gui ve 1 bien trong moi 1 route
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.Manager = req.session.isManager;
    res.locals.currentUser = req.session.user;
    res.locals.currentCart = req.session.cart;
    res.locals.session = req.session;
    next();
});



mongoose.connect('mongodb://localhost:27017/ecommerce_project', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
}).then(()=>{
    console.log("Successful connection!");
}).catch((err)=>{
    console.log(err.message);
    console.log("Lỗi database!");
});

route(app);
app.listen(port, () => {
    console.log(`Run app on port ${port}`);
});