import pool from "../config/db.js";
import argon from "argon2";

class TeacherService {
  async addTeacher(req) {
    const { fullname, phone, password, experience, job, site } = req.body;

    const existTeacher = await pool.query(
      "select * from teachers where phone = $1",
      [phone],
    );

    if (existTeacher.rows.length) {
      return {
        status: 409,
        message: "This teacher was already created!",
      };
    }

    const hashPassword = await argon.hash(password);

    await pool.query(
      "insert into teachers(fullname, phone, password, experience, job, site) values($1, $2, $3, $4, $5, $6)",
      [fullname, phone, hashPassword, experience, job, site],
    );

    return {
      status: 201,
      message: "Teacher is successfully created!",
    };
  }

  async getAllTeachers() {
    const teachers = await pool.query(
      "select id, fullname, phone, experience, job, site, created_at from teachers",
    );

    return {
      status: 200,
      data: teachers.rows,
    };
  }

  async updateTeacher(req) {
    const { teacherId } = req.params;
    const { fullname, phone } = req.body;

    let upTeacher = await pool.query("select * from teachers where id = $1", [
      teacherId,
    ]);

    if (upTeacher.rows.length === 0) {
      return {
        status: 404,
        message: "Teacher is not found with this id!",
      };
    }

    let info = fullname ? `fullname='${fullname}'` : "";
    info += phone
      ? fullname
        ? ", " + `phone='${phone}'`
        : `phone='${phone}'`
      : "";


    await pool.query(`update teachers set ${info} where id=$1`, [teacherId]);

    return { status: 200, message: "Teacher updated" };
  }

  async deleteTeacher(req) {
    const { teacherId } = req.params;

    let delTeacher = await pool.query("select * from teachers where id = $1", [
      teacherId,
    ]);

    if (delTeacher.rows.length === 0) {
      return {
        status: 404,
        message: "Teacher is not found with this id!",
      };
    }

    await pool.query("delete from teachers where id = $1", [teacherId]);

    return {
      status: 200,
      message: "Teacher is succesfully deleted!",
    };
  }
}

export default new TeacherService();
