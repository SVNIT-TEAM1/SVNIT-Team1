
const router = require("express").Router();
const User = require("./../../modals/user.js");
const passport = require("passport");

router.post("/", function(req,res){

    const user = new User({
        username : req.body.username,
        password : req.body.password
      });
    
      req.login(user, function(err){
        if(err){
          console.log(err);
          res.sendStatus(404);
        } else{
          passport.authenticate("local")(req, res, function(){
            res.sendStatus(200);
          });
        }
      });
  
  });


module.exports = router;