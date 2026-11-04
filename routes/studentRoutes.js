import express from "express" 
import { createStudent, deleteStudent, getStudent, getStudents, updateStudent } from "../controllers/student.controller.js";
import { login, register } from "../controllers/auth/student.auth.controller.js"; 
import { verifyToken } from "../middleware/auth.middleware.js";

 const router = express.Router();

 //auth routes

 router.post("/register", register)
 router.post("/login", login)

 //CRUD routes

 router.post("/", verifyToken, createStudent)
router.get("/", verifyToken, getStudents);
router.put("/:id", verifyToken, updateStudent)
router.get("/:id", verifyToken, getStudent);
router.delete("/:id", verifyToken, deleteStudent)

 export default router;