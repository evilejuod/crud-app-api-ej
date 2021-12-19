const joi = require('joi');

async function validateUser(req, res, next) {
  console.log('body got to validate:', req.body);
  // validate body using joi
  const schema = joi.object({
    name: joi.string().min(3).max(50).required(),
    age: joi.number().positive().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.warn(error);
    res.status(400).send({
      error: error.details.map((e) => ({
        errorMsg: e.message,
        field: e.context.key,
      })),
    });
    return false;
  }
}

module.exports = {
  validateUser,
};