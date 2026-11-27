import Joi from "joi";

export const teacherAddSchema = Joi.object({
  fullname: Joi.string().trim().required(),
  phone: Joi.string()
    .pattern(/^998(9[012345789]|3[3]|7[1]|8[8]|5[0])[0-9]{7}$/)
    .required(),
  password: Joi.string().alphanum().min(6).required(),
  experience: Joi.number().required(),
  job: Joi.string().required(),
  site: Joi.required(),
});

export const updateTeacherSchema = Joi.object({
  fullname: Joi.string().trim(),
  phone: Joi.string().pattern(
    /^998(9[012345789]|3[3]|7[1]|8[8]|5[0])[0-9]{7}$/,
  ),
});