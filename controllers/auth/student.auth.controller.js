import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {Admin} from "../../models/adminModels.js"

export const register = async(req, res)=>{
    
    try{

        const { name, email, password } = req.body;

        const existedAdmin = await Admin.findOne({ email });

        if (existedAdmin) {
            return res.status(401).json({
                success: false,
                message: "Admin already created"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = {
            name,
            email,
            password: hashedPassword
        }

        await Admin.create(newAdmin);

        const payload = {
            id: newAdmin._id,
            name: newAdmin.name
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({
            success: true,
            message: "Admin created",
            token
        })

    }catch(e){
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}

export const login = async(req, res)=>{

    try{

        const { email, password } = req.body;

        const admin = await Admin.findOne({email});

        if(admin == null){
            return res.status(401).json({
                success: false,
                message: "Admin not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }

        const payload ={
            id: admin._id,
            name: admin.name
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        })

    }catch(e){
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}