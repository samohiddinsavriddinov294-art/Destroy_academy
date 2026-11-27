import {
  teacherAddSchema,
  updateTeacherSchema,
} from "../utils/teacherValidation.js";

export default {
  teacherAddSchema: (req, res, next) => {
    const { error } = teacherAddSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }

    return next();
  },

  updateTeacherSchema: (req, res, next) => {
    const { error } = updateTeacherSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }

    return next();
  },
};