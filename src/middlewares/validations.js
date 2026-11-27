import { AdminSchema, updateAdminSchema} from "../utils/validation.js";

export default {
  createAdmin: (req, res, next) => {
    const { error } = AdminSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.message,
      });
    }

    return next();
  },

  updateAdminMiddle: (req, res, next) => {
    const { error } = updateAdminSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }

    return next();
  },
};
