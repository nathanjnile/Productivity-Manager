const express = require("express");
const router = new express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");

router.post("/users", async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    }catch (error) {
        res.status(400).send(error);
    }
})

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (error) {
        res.status(400).send();
    }
});

router.post("/users/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save();

        res.status(200).send();
    } catch (error) {
        res.status(500).send();
    }
});

router.post("/users/logoutAll", auth, async (req, res) => {
    try {

        req.user.tokens = [];

        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user);
})

// Removed as users should not be able to get others users data by id and an endpoint already exists for getting own data
// router.get("/users/:id", async (req, res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);
//         if(!user) {
//             return res.status(404).send();
//         }
//         res.send(user);
//     } catch (error) {
//         res.status(500).send();
//     }
// })

router.patch("/users/me", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid updates!"})
    }

    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update]; 
        });

        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete("/users/me", auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
})

module.exports = router;

