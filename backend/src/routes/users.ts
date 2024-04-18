import express, {Request, Response} from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// /api/users/register
router.post("/register", [
    check("firstName", "Введите имя").isString(),
    check("lastName", "Введите фамилию").isString(),
    check("email", "Введите почту").isEmail(),
    check("password", "Введите пароль длинной не менее 6 символов").isLength({min:6}),
], async (req: Request, res: Response)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if(user){
            return res.status(400).json({message:"Такой пользователь уже существует"});
        }

        user = new User(req.body)
        await user.save();

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {
          expiresIn: "1d"  
        });

        res.cookie("auth_token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge:86400000,
        });
        return res.sendStatus(200);
    }catch (error){
        console.log(error);
        res.status(500).send({message: "Что-то пошло не так"});
    }
    

});

export default router;