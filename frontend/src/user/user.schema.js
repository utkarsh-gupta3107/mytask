const Joi = require("@hapi/joi");

const schema = {
  user: Joi.object({
    Title: Joi.string().max(30).required(),
  }),
};

module.exports = schema;
