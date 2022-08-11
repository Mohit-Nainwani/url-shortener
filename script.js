require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const ShortURL = require("./models/shortURL")
const crypto = require("crypto");

const app = express();
app.set("view engine","ejs");
app.set("views","views");
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));

main().catch(err=>console.log(err));
async function main(){
    await mongoose.connect(process.env.DATABASE)
}

app.get("/",async (req,res)=>{
    urls = await ShortURL.find();
    // console.log(urls);
    res.render("index",{db:urls});
});

app.post("/",async (req,res)=>{
    await ShortURL.create({
        fullURL : req.body.fullurl,
        shortURL : crypto.randomBytes(4).toString('hex')
    });
    res.redirect("/");
})

app.get("/:shortURL",async (req,res)=>{
    const link = await ShortURL.findOne({shortURL : req.params.shortURL});
    if(link==null) return res.status(404).send("NOT FOUND");
    link.click++;
    link.save();
    res.redirect(link.fullURL);
})

app.listen(process.env.PORT || 80,()=>console.log("Server Started"));