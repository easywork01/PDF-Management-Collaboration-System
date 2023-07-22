require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;  


const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true});

const userScema = {
    email: String,
    password: String
}//userSchema is based on simple JsObject which has two fields

const User = new mongoose.model("User", userScema)
//making a new model using userSchema name of model is "User"(singluar form)
//next we make a new collection called "Users"(plural) to store each entry of our model

app.get("/",function(req,res){
    res.render("home");
});
app.get("/register",function(req,res){
    res.render("register");
});
app.get("/login",function(req,res){
    res.render("login");
});






app.post("/register", function(req, res) {
  
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
      try {
        if (err) {
          console.log(err);
          return res.status(500).send("Error occurred while hashing the password.");
        }
  
        // Store hash in your password DB.
        const newUser = new User({
          email: req.body.username,
          password: hash
        });
  
        await newUser.save();
        res.render("dash");
      } catch (err) {
        console.log(err);
        res.status(500).send("Error occurred while saving the user.");
      }
    });
  });
  




app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email : username}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                // Load hash from your password DB.
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    // result == true
                    if(result === true){
                        res.render("dash");
                    }
                });
                    
                
            };
        }
    });
});





app.listen(3000, function(){
    console.log("server has launched on port 3000");
});