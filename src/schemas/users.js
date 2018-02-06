const yup = require('yup');

module.exports = {
  signUp: yup.object().shape({
    nickname: yup
      .string()
      .required()
      .lowercase()
      .min(4)
      .max(10),
    email: yup
      .string()
      .email()
      .required()
      .lowercase(),
    password: yup.string().required(),
  }),

  logIn: yup.object().shape({
    nickname: yup
      .string()
      .required()
      .lowercase()
      .min(4)
      .max(10),
    password: yup.string().required(),
  }),

  change: yup.object().shape({
    email: yup
      .string()
      .email()
      .required()
      .lowercase(),
    password: yup.string().required(),
  }),
};
