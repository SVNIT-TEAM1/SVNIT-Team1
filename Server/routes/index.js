const router = require("express").Router();


const public = require("./public/index.js");
const protected = require("./protected/index.js"); 

router.use("/", public);
router.use("/", protected);

module.exports = router;
