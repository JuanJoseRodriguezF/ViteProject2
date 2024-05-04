const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Refresh Token");
});

module.exports = router;