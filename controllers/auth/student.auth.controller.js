import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {Student} from "../../models/studentModels.js";

export const register = async(req, res)=>{
    
    try{

        const { name, email, password, age, description } = req.body;

        const existedStudent = await Student.findOne({ email });

        if (existedStudent != null) {
            return res.status(401).json({
                success: false,
                message: "Student already created"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = {
            name,
            email,
            password: hashedPassword,
            age,
            description
        }

        await Student.create(newStudent);

        return res.status(201).json({
            success: true,
            message: "Student created"
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

        const student = await Student.findOne({email}).select("+password");

        if(student == null){
            return res.status(401).json({
                success: false,
                message: "Student not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, student.password);

        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }

        const payload ={
            id: student._id,
            name: student.name
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