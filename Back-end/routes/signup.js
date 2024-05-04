const { jsonResponse } = require("../lib/jsonResponse");
const router = require("express").Router();
const User = require("../schema/user");

router.post("/", async (req, res) => {
    const {username, email, password} = req.body;

    if(!!!username || !!!email || !!!password) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Fields are required",
            })
        );
    }

    try {
        //crear usuario
        const user = new User();
        const exists = await user.usernameExist(username);
        
        if(exists){
            return res.status(400).json(
                jsonResponse(400, {
                    error: "Username already exists",
                })
            );
        }

        const newUser = new User({username, email, password});

        newUser.save();

        res.status(200).json(
            jsonResponse(200, {
                message: "User created succesfully",
            })
        );

        res.send("Signup");
    } catch (error) {
        res.status(500).json(
            jsonResponse(500, {
                error: "Error creating user",
            })
        );
    }
});

module.exports = router;