
const router = require("express").Router();
const User = require("./../../modals/user.js");
const passport = require("passport");

router.post("/", function(req,res){

    User.register({ username: req.body.username}, req.body.password, function(err,user){
      if(err){
        console.log(err);
        res.status(404).json({error:err});
      } else {
        passport.authenticate("local")(req,res,function(){
            res.status(200).json({message:'Signup successfully'});
        });
      }
    });

  });


module.exports = router;
