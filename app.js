//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost/myJournalDB")





nav=document.querySelector('.nav')









const postSchema=mongoose.Schema({
  name:String,
  Text:String
})


const homeStartingContent = "LHarvesting Readiness using AI/ML offers a solution to reducing labor costs, optimizing harvest scheduling, enabling selective harvesting, and increasing operation efficiency. These attributes allow the users of AI harvesters to maximize production efficiency and profits. This article reviews ML fruits harvesting systems and CNN applications on hardware. The Cellular Neural Network (CNN) is a large-scale nonlinear analog circuit able to process signals in real life applications . The advantage of using CNN makes the design to be portable on all the available graphics processing devices and multi core processors. Performance evaluation is done in terms of execution time with both device (i.e. GPU) and host (i.e. CPU). Keywords— Image processing, Hardware accelerators, Cellular Neural Networks, GPUs, High Performance Computing.";
const aboutContent = "I'm Batman (Keep it a secret)";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const Post = mongoose.model("Post",postSchema)

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){

  window.addEventListener('scroll',()=>{


    if (window.scrollY>nav.offsetHeight){
        nav.classList.add('active')
        console.log(window.scrollY)
    }
    else {
        nav.classList.remove('active')
        console.log('blabla')
    }
    
    console.log(window.scrollY,nav.offsetHeight-10)
    
    })
    
Post.find({},(err,result)=>{
  if(!err){
    console.log(result)
    res.render("home", {
        startingContent: homeStartingContent,
        posts: result
        });
  }
})
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  // const post = {
  //   title: req.body.postTitle,
  //   content: req.body.postBody
  // };

  // posts.push(post);
  const post = new Post({
    name:req.body.postTitle,
    Text:req.body.postBody,
  })
  post.save()
  posts.push(post);

  

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const postName=req.params.postName
  Post.find({},(err,resource)=>{
resource.forEach(resource => {

  console.log(postName,resource.name)
  if(postName===resource.name.replace(/ /g, "")){
    
    res.render("post",{title:resource.name ,content:resource.Text})
    console.log(postName,resource.name,resource.Text)
  }
 
  
});

  })
  

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
