const yup = require('yup');

module.exports = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3)
    .max(15),
  description: yup.string().required(),
});
