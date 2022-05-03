const express = require("express");
const router = express.Router();
const data = require("../data");
const commentData = data.comment;

// Error checking, call to data function, render the data to handlebars

router.post("/", async (req, res) => {
    
    let {id,
        user, 
        date, 
        comment
    } = req.body;

    try{

        if (!user) throw "user not provided, please provide.";
        if (typeof user !== "string") throw "User is not a string";
        if (user.trim().length === 0) throw "String contains only spaces";
        if (user.length === 0) throw "User is empty";

        if (!date) throw `Enter date`;

        if (!comment) throw "user not provided, please provide.";
        if (typeof comment !== "string") throw "User is not a string";
        if (comment.trim().length === 0) throw "String contains only spaces";
        if (comment.length === 0) throw "User is empty";


        const newComment = commentData.createComment(id, user, date, comment);

        // if (newComment){
        //     res.redirect("/comment");
        // }

    }
    catch (e){

    }
});



module.exports = router;