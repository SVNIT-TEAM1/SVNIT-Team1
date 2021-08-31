const router = require("express").Router();


router.post("/", (req,res)=>{
    if(req.isAuthenticated()){
        res.send(req.user.history);
    }else{
        res.sendStatus(404);
    }   
})

module.exports = router;