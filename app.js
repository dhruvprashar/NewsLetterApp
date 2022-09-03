//jshint esversion: 6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const https=require("https");
const client = require("@mailchimp/mailchimp_marketing");



const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html")
  //console.log(req);
});

app.post("/",function(req,res){

  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;

  const subscribingUser={
    firstName: firstname,
    lastName: lastname,
    email: email
  }

  const run=async()=>{
    const response = await client.lists.addListMember("9bf19ea1f9",{
      email_address:subscribingUser.email,
      status: "subscribed",
      merge_fields:{
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });
    console.log(response);

    res.sendFile(__dirname +"/success.html");
  };

  run().catch(e => res.sendFile(__dirname + "/failure.html"));

/*
  const jsondata=JSON.stringify(data);
  const url=""
  https.request(url,options , function(response){
    response.on("data",function(){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsondata);
  console.log(firstname + " "+ lastname +" "+ email);  */
})

client.setConfig({
  apiKey:"4896c693e516fdf64fa3e01dfc1363bb-us1",
  server: "us1"
});


app.post("/failure",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT||3000,function(){
  console.log("Server is running on port 3000");

})


//API key :
//4896c693e516fdf64fa3e01dfc1363bb-us1

//List id
//9bf19ea1f9
