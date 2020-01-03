const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/";
const port = 4000;
var alert = require("alert-node");

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views",path.join(__dirname+"/views"));
app.use(express.static(__dirname +"/public"));

let dbo;

MongoClient.connect(
	url,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, db) => {
		if (err) throw err;
		dbo = db.db("myDb");
	}
);

app.get("/", (_req, res) => {
	res.sendFile("/Users/vbq5822/Training/NodeJs/Day 9/Assignment-MenuCard/html/login.html");
});

app.get("/menu", (_req, res) => {
	res.sendFile("/Users/vbq5822/Training/NodeJs/Day 9/Assignment-MenuCard/html/index.html");
});

app.get("/addMenu", (_req, res) => {
	res.sendFile("/Users/vbq5822/Training/NodeJs/Day 9/Assignment-MenuCard/html/addMenu.html");
});

app.post("/registerUser",(req,res)=>{
    console.log(req.body.user);
    dbo.collection("UserTable").insertOne({UserName:req.body.user,Password:req.body.pass,role:"user"});
    res.redirect("/menu");
})

app.post("/validateUser",(req,res)=>{

    var userName = req.body.user;
 
    dbo.collection("UserTable").find({UserName:userName}).toArray((err,result)=>{
        if(err) throw err;
        // console.log(result)
       
        if(req.body.user === null  && req.body.password === null){
            alert("User Name and Password can not be blank")
            console.log("NULL CHECK")
            res.end();
        }
        else
        {
            // if(result[0].role === "admin"){
            //     res.redirect("/menu")
                 console.log("admin");
            // }
            // else{
            //     alert("Invalid username or password")
            // }
        }
    })
})

app.get("/MenuItems", (_req, res) => {
    
    dbo.collection("Menu")
		.find().sort({"id":1})
		.toArray((err, result) => {
            if (err) throw err;
			res.send(result);
        });    
});

app.post("/add",(req,res)=>{
    if(Number(req.body.itemId) == "" || req.body.itemName == "" || req.body.imgName == "" || req.body.price == ""){
  
        alert("Please enter all the fields mandatory");
        // res.end();
    }
    else{
        insertData({id:Number(req.body.itemId), Item:req.body.itemName, url:req.body.imgName, Price:req.body.price});
        res.redirect("/menu");
        res.end() 
    }
})

function insertData(bodyObj){
    try{
        dbo.collection("Menu").insertOne(bodyObj);
        return "Data entered"
    }
    catch(error)
    {
        return ("Error " + error);
    }
}

app.get("/update/:id",(req,res)=>{
    dbo.collection("Menu")
    .find({"id":Number(req.params.id)})
    .toArray((err,result)=>{
        if(err) throw err;
        res.render("update",{data:result[0]});
    })
})

app.post("/updateDish",(req,res)=>{
    dbo.collection("Menu")
	.updateOne(
		{id:Number(req.body.id)},
		{$set : {"id":Number(req.body.id),"Item":req.body.Dish,"url":req.body.imageUrl,"Price":Number(req.body.Price)}}
	);
	res.redirect("/menu");
})

app.get("/deleteItem/:id",(req,res)=>{
    console.log(req.params.id)
    var localId = Number(req.params.id);
    dbo.collection("Menu").deleteOne({"id":localId})
    res.redirect("/menu")
})

app.get('/Registration',(_req,res)=>{
    res.sendFile("/Users/vbq5822/Training/NodeJs/Day 9/Assignment-MenuCard/html/Registration.html");
})

app.get("/addToCart/:id",(req,res)=>{
    // console.log(req.params.id)
    // dbo.collection("")
})

app.get("/viewCart",(req,res)=>{

})

app.get("/logout",(req,res)=>{
    res.sendFile("/Users/vbq5822/Training/NodeJs/Day 9/Assignment-MenuCard/html/login.html")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));