const { TokenExpiredError } = require("jsonwebtoken");
const Tweet = require("../schema/tweet");

const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        const titleQuery = req.query.title; // Obtener el título de la consulta de la URL

        let tweets;
        if (titleQuery) {
            // Si se proporciona un título en la consulta, buscar tweets por título
            tweets = await Tweet.find({ idUser: req.user.id, title: { $regex: titleQuery, $options: "i" } });
        } else {
            // Si no se proporciona un título en la consulta, obtener todos los tweets del usuario
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