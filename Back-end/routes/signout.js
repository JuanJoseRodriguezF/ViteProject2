const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Signout");
});

module.exports = router;