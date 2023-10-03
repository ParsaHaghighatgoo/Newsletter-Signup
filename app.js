//jshint esversion: 6

//set requires
const express =  require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

//getin req in route
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

//postin req in route
app.post("/", function(req ,res){
    const firstName = req.body.firstName ;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
      members: [
        {
            email_address : email,
            status: "subscribed",
            merge_fileds:{
                FNAME : firstName,
                LNAME : lastName

            }

        }
      ]  
    };

    const jsonData = JSON.stringify(data);
    
    //console.log(jsonData);
    
    const url = "https://us11.api.mailchimp.com/3.0/lists/7b035b34bc" ;
    
    const option = {
        method : "POST",
        auth : "faggotIV:84bd7ed7d9c43f3edf26414e41d2f3b5-us11"
    };

    const request = https.request(url,option,function(response){
        
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
            }else{
                res.sendFile(__dirname + "/failure.html");    
            }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

})
  

//postin req in failure section
app.post("/failure",function(req, res){
    res.redirect("/");
});


//port 3000 set:
app.listen(process.env.PORT || 3000,function(){
    console.log('Server is running on port no : '+3000);
});
