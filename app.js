const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));




app.get("/",function(req,res){
    res.render("home");
});
app.get("/register",function(req,res){
    res.render("register");
});
app.get("/login",function(req,res){
    res.render("login");
});




app.post("/register", funtion(req,res){
    const newUser = new User({
        email = req.body.username,
        password = req.body.password
    });
    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            res.render("dash");
        }
    });
});

app.post("login", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email : username}, function(err, foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser{
                if(foundUser.password === password){
                    res.render("dash");
                }
            });
        }
    });
});





app.listen(3000, function(){
    console.log("server has launched on port 3000");
});