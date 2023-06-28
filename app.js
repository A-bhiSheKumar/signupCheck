const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.emailId;
   
    const data ={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData =JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/03e66331ea";

    const option = {
        method:"POST",
        auth:"avi86:ae621879f5bb09ac81550c065497eb27-us21"
    }
    const request = https.request(url,option,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
        if (response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
    })
    request.write(jsonData);
    request.end();
});


// redirecting to the home page using failure page route

app.post("/failure",function(req , res){
    res.redirect("/");
})

app.post("/success" , function(req , res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is ready to go....");
})


//Api key

//ae621879f5bb09ac81550c065497eb27-us21

//list id

//03e66331ea