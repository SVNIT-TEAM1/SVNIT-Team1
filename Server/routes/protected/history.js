const router = require("express").Router();
const User = require("../../modals/user");

router.post("/", async(req,res)=>{
    if(req.body.userId){
      const user=await User.findById(req.body.userId);
          res.status(200).json({history:user.history})

    }else{
        res.sendStatus(404);
    }
})

module.exports = router;
