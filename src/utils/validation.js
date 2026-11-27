import Joi from "joi";

export const AdminSchema = Joi.object({
  fullname: Joi.string().trim().required(),
  phone: Joi.string()
    .pattern(/^998(9[012345789]|3[3]|7[1]|8[8]|5[0])[0-9]{7}$/)
    .required(),
  password: Joi.string().min(6).required(),
});


export const updateAdminSchema = Joi.object({
  fullname: Joi.string().trim(),
  phone: Joi.string().pattern(/^998(9[012345789]|3[3]|7[1]|8[8]|5[0])[0-9]{7}$/)
});