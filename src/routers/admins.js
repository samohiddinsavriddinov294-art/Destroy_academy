import express from "express";
import adminController from "../controllers/admins.js";
import middleware from '../middlewares/validations.js'

const router = express.Router();

router
    .get('/api/admins/all', adminController.getAllAdmins)
    .post("/api/admins",middleware.createAdmin, adminController.createAdmin)
    .put('/api/admins/:adminId', middleware.updateAdminMiddle, adminController.updateAdmin)
    .delete('/api/admins/:adminId', adminController.deleteAdmin)

export default router;
