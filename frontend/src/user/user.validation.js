const {user} = require("./user.schema");
module.exports={
    addUserValidation: async(req,res,next)=>{
        try {
            await user.validateAsync(req.body);
            next();
          } catch (error) {
            const errorMessage = error.details[0].message;
            res.status(400).json({
              success: 0,
              message: errorMessage,
            });
          }
    }
}