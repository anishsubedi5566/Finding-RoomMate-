const express = require("express");
const router = express.Router();
const data = require("../data");
const commentData = data.comment;

// Error checking, call to data function, render the data to handlebars

router.post("/", async (req, res) => {
    
    let {id,
        username, 
        date, 
        comment
    } = req.body;

    try{
        if (!id) throw "Id not provided";
        if (!username) throw "user not provided, please provide.";
        if (typeof user !== "string") throw "User is not a string";
        if (username.trim().length === 0) throw "String contains only spaces";
        if (username.length === 0) throw "User is empty";

        if (!date) throw `Enter date`;

        if (!comment) throw "user not provided, please provide.";
        if (typeof comment !== "string") throw "User is not a string";
        if (comment.trim().length === 0) throw "String contains only spaces";
        if (comment.length === 0) throw "User is empty";

        const newComment = commentData.createComment(id, user, date, comment); 
        // if (newComment){
        //     res.redirect("/comment");
        // }
        // not sure which page to use
    }
    catch (e){
    //     res.status(400).render("/private", {error: e.message});
    // //     return; 
    }

    // try{
    //     const newComment = commentData.createComment(id, username, date, comment);
    //     res.status(200).render("", {comment: newComment});
    // }
    // catch(e){
    //     console.log(e);
    //     res.status(400).render("", {error: e.message});
    //     return; 
    // }
});



module.exports = router;