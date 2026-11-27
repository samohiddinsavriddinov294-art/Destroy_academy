import pool from "../config/db.js";
import argon from "argon2";

class AdminServices {
  
  async createAdmin(req) {
    const { fullname, phone, password } = req.body;

    const existAdmin = await pool.query(
      "select * from admins where phone = $1",
      [phone],
    );

    if (existAdmin.rows.length) {
      return {
        status: 409,
        message: "This admin was already created!",
      };
    }

    const hashPassword = await argon.hash(password);

    await pool.query(
      "insert into admins(fullname, phone, password) values ($1, $2, $3)",
      [fullname, phone, hashPassword],
    );

    return {
      status: 201,
      message: "Admin successfully created!",
    };
  }

  async getAllAdmins() {
    const admins = await pool.query(
      "select id, fullname, phone, photo, status, created_at from admins",
    );

    return {
      status: 200,
      data: admins.rows,
    };
  }

  async updateAdmin(req) {
    const { adminId } = req.params;
    const { fullname, phone, password } = req.body;

    let upAdmin = await pool.query("select * from admins where id = $1", [
      adminId,
    ]);

    if (upAdmin.rows.length === 0) {
      return {
        status: 404,
        message: "Admin is not found with this id!",
      };
    }

    let info = fullname ? `fullname='${fullname}'` : "";
    info += phone
      ? fullname
        ? ", " + `phone='${phone}'`
        : `phone='${phone}'`
      : "";

    if (password) {
      const hashPassword = await argon.hash(password);
      info += info ? ", " : "";
      info += `password='${hashPassword}'`;
    }

    if (!info) {
      return {
        status: 400,
        message: "No data provided for update!",
      };
    }

    await pool.query(`update admins set ${info} where id=$1`, [adminId]);

    return { status: 200, message: "Admin updated" };
  }

  async deleteAdmin(req) {
    const { adminId } = req.params;

    let delAdmin = await pool.query("select * from admins where id = $1", [
      adminId,
    ]);

    if (delAdmin.rows.length === 0) {
      return {
        status: 404,
        message: "Admin is not found with this id!",
      };
    }

    await pool.query("delete from admins where id = $1", [adminId]);

    return {
      status: 200,
      message: "Admin is succesfully deleted!",
    };
  }
}

const adminService = new AdminServices();

export default adminService;
