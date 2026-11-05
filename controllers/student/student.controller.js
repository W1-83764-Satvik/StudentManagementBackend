import mongoose from "mongoose";
import { Student } from "../../models/studentModels.js";


export const createStudent = async (req, res) => {

    try {

        const { name, email, age, description } = req.body;

        // Check required fields
        if (!name || !email || !Number.isFinite(age) || age < 1) {
            return res.status(400).json({
                success: false,
                message: "Name, email and valid age are required"
            });
        }

        // Check if student already exists
        const existedStudent = await Student.findOne({ email });

        if (existedStudent) {
            return res.status(409).json({
                success: false,
                message: "Student already exists"
            });
        }

        // Create student
        const newStudent = await Student.create({
            name,
            email,
            age,
            description
        });

        return res.status(201).json({
            success: true,
            message: "Student created successfully",
            student: newStudent
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });

    }

};


export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();

        return res.status(200).json({
            success: true,
            students
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Could not retrieve students",
            error: e.message
        });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student deleted",
            student: deletedStudent
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Could not delete student",
            error: error.message
        });
    }
}

export const updateStudent = async (req, res) => {

    try {

        const { id } = req.params;

        if (!id) {
            return res.status(401).json({
                success: false,
                message: "Id required for update"
            })
        }

        const { name, age, description } = req.body;

        if (!name || !Number.isFinite(age) || age < 1) {
            return res.status(401).json({
                success: false,
                message: "A name and valid age are required for update"
            })
        }

        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name, age, description },
            { new: true, runValidators: true }
        )

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: updatedStudent
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

export const getStudent = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid student ID"
            });
        }

        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student found",
            data: student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}