const { TokenExpiredError } = require("jsonwebtoken");
const Tweet = require("../schema/tweet");
const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const titleQuery = req.query.title;

        let tweets;
        if (titleQuery) {
            tweets = await Tweet.find({ idUser: req.user.id, title: { $regex: titleQuery, $options: "i" } });
        } else {
            tweets = await Tweet.find({ idUser: req.user.id });
        }

        if (tweets.length > 0) {
            res.json(tweets);
        } else {
            res.status(404).json({ error: "No tweets found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/", async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ error: "Title is required" });
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

router.delete("/:id", async (req, res) => {
    try {
        const tweet = await Tweet.findByIdAndDelete({ _id: req.params.id, idUser: req.user.id });
        if (!tweet) {
            return res.status(404).json({ error: "Tweet not found" });
        }
        res.json({ message: "Tweet deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { title } = req.body;
        const tweet = await Tweet.findByIdAndUpdate(
            { _id: req.params.id, idUser: req.user.id },
            { title },
            { new: true }
        );

        if (!tweet) {
            return res.status(404).json({ error: "Tweet not found" });
        }

        res.json(tweet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;