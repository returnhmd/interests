const yup = require('yup');

module.exports = yup.object().shape({
  interest_id: yup
    .number()
    .integer()
    .required()
    .positive(),
  grade: yup
    .number()
    .required()
    .integer()
    .max(10),
  description: yup.string().required(),
});
