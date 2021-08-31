
const router = require("express").Router();
const User = require("./../../modals/user.js");
const passport = require("passport");

router.post("/", function(req,res){

    User.register({ username: req.body.username}, req.body.password, function(err,user){
      if(err){
        console.log(err);
        res.sendStatus(404);
      } else {
        passport.authenticate("local")(req,res,function(){
            res.sendStatus(200);
        });
      }
    });
  
  });


module.exports = router;