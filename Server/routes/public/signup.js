
const router = require("express").Router();

router.post("/", function(req,res){

    User.register({ username: req.body.username, email: req.body.email}, req.body.password, function(err,user){
      if(err){
        console.log(err);
        res.redirect("/register")
      } else {
        passport.authenticate("local")(req,res,function(){
            res.redirect("/createform");
          });
      }
    });
  
  });