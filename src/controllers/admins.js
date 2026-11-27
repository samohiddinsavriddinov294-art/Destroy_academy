import adminService from "../services/admin.js";

class AdminController {
  async createAdmin(req, res) {
    let resData = await adminService.createAdmin(req);
    return res.status(resData.status).json(resData);
  }

  async getAllAdmins(req, res) {
    let resData = await adminService.getAllAdmins(req);
    return res.status(resData.status).json(resData);
  }

  async updateAdmin(req, res) {
    let resData = await adminService.updateAdmin(req);

    return res.status(resData.status).json(resData);
  }

  async deleteAdmin(req, res) {
    let resData = await adminService.deleteAdmin(req);
    return res.status(resData.status).json(resData);
  }
}

const adminController = new AdminController();

export default adminController;
