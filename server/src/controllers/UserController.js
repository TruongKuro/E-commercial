const User =require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

const generatesToken=(user)=> {
    return jwt.sign({user}, process.env.JWT_TOKEN, {
        expiresIn: "30d",
    });
};

class UserController {
    async register(req, res, next){
         try {
            const { name, phoneNumber, password } = req.body;
            const check = await User.findOne({ phoneNumber });
            if (check)
            return res.json({ msg: "Phone number already used", status: false });

            const hashedPassword = await bcrypt.hash(password, 10);
            const user= await User.create({
                phoneNumber,
                name,
                password: hashedPassword,
                nameShop: name,
            });

            //const token=generatesToken(user._id);
            
            return res.json({ 
                status: true, 
                user,
                token: generatesToken(user),
            });  
        } catch (error) {
            console.log(error);
        }
    }

    async login(req, res, next) {
        try {
            const { phoneNumber, password } = req.body;
            const user = await User.findOne({ phoneNumber });
             if (user && (await bcrypt.compare(password, user.password))) {
                req.session.user=user;
                res.json({
                    status: true, 
                    user,
                    token: generatesToken(user),
                });
                console.log(req.session.user);
            } else {
                console.log('Sai thông tin đăng nhập!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    logout(req, res, next) {
        try {
            req.session.destroy();
            return res.status(200).send();      
        } catch (ex) {
            next(ex);
        }
    }
}

module.exports = new UserController;