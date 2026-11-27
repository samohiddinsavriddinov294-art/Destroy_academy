import express from "express";
import teacherController from "../controllers/teachers.js";
import teacherMiddleware from "../middlewares/teacherValidations.js";

const router = express.Router();

router
  .post("/api/teachers",teacherMiddleware.teacherAddSchema,teacherController.addTeacher)
  .get("/api/teachers/all", teacherController.getAllTeachers)
  .delete('/api/teachers/:teacherId',teacherController.deleteTeacher)
  .put("/api/teachers/:teacherId",teacherMiddleware.updateTeacherSchema,teacherController.updateTeacher)


export default router;
