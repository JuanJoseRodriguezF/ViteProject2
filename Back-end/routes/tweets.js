const { TokenExpiredError } = require("jsonwebtoken");
const Tweet = require("../schema/tweet");

const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const tweets = await Tweet.find({ idUser: req.user.id });
        if(tweets){
           res.json(tweets); 
        }else{
            res.status(404).json({error: "No tweets found"});
        }
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async(req, res) => {
    if(!req.body.title){
        res.status(400).json({error: "Title is required"})
    }

    try {
        const tweet = new Tweet({
            title: req.body.title,
            completed: false,
            idUser: req.user.id,
        });

        const newTweet = await tweet.save();
        res.json(newTweet);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;