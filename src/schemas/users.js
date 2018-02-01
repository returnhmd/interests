const yup = require('yup');

module.exports = yup.object().shape({
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
});
