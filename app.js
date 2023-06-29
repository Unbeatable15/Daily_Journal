//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');

const homeStartingContent = "Hello guys, My name is Ajinkya Kshatriya, I am from Pune, I have created this blogging website for fun.You can go to the Compose section and add title and text which you want to post and click on publish button. In about section there is information about me and in contact section there is contact detail about me(which are fake So try to contact me).Post whatever you want!!✌️";
const aboutContent = "My Name is Ajinkya Kshatriya. I have created this website for fun if there is anything you want to tell be about this website there is no need to tell as this is just small website with no particular major funcionality it is just for bloging and You can download and edit any file you want to edit as per your choice and you can deploy it. Keep Coding👨‍💻";
const contactContent = "Ajinkya Kshatriya";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const posts = [];

app.get("/",(req,res)=>{
  res.render('home',{homeContent:homeStartingContent,posts:posts});
})

app.get("/about",(req,res)=>{
  res.render('about',{aboutStart:aboutContent});
})

app.get("/contact",(req,res)=>{
  res.render('contact',{contactStart:contactContent});
})

app.get("/compose",(req,res)=>{
  res.render('compose');
})
app.post("/compose",(req,res)=>{
  const post = {
    title : req.body.postTitle,
    body : req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
})

app.get("/post/:title",(req,res)=>{
  const requestedTitle = _.lowerCase(req.params.title); 
  let postTitle;
  let postsBody;
  for(let i = 0; i< posts.length; i++){
    postTitle = _.lowerCase(posts[i].title);
    if(requestedTitle === postTitle){
      res.render('post',{
        title:posts[i].title,
        content:posts[i].body
      });
    }
  }
  
})

let port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});

