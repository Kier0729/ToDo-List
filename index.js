import express, { response } from "express";
import bodyParser from "body-parser";
import { myExternalJs, externalVariable } from "./public/assets/indexDom.js";//importing external function, variable

const app = express();
const port = 3000;

var arrayToDo = [];
var myArray = [];
var currYear = "";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));//Static files should be inside public folder eg. images, css (while ejs files should be inside views folder)
 
//function/custom middleware for getting current year
function currentYear(req, res, next){
    const year = new Date();
    currYear = year.getFullYear();
    
    next();
    }
//mounting/using the custom middleware (currentYear)
app.use(currentYear);

app.get("/", (req, res) => {
    myExternalJs();
    console.log(externalVariable);         
    res.render("index.ejs", {
        arrayToDo,
        myArray,
        currYear
    });
     
});

app.get("/schedule", (req, res) => {
        
    res.render("schedule.ejs",{
        currYear
    });
     
});

app.post("/submit", (req, res) => {
    arrayToDo.push(req.body["newTodo"]);
       
    res.render("index.ejs", {
        arrayToDo,
        myArray,
        currYear
    });
    console.log("Add Req.body: "+req.body["newTodo"]); 
    
});

//save changes in tick box status
app.post("/save", (req, res) => {
    var i = (req.body["myCheckbox"]);//getting the "value" of all checkbox with the name (myCheckbox) which is tick, so that I will know which index got tick and passing it to variable i     
    
    if (i){
        var newText = i.toString();//converting i to string
        console.log("Save Req.body: Ticked! "+ (i));
         myArray = newText.split(",");//using split() to separate newText with "," indicator and making it an array
    //getting myArray ready to know which checkbox is tick by setting the "value" of each checkbox to correspond to its index to be past and called when the index.ejs gets render            
    } else {

    console.log("Save Req.body: Nothing was Ticked! "+ (i));
    myArray = [];// Will not work if myArray is declared as const
    }
    
    console.log("Save myArray.Length: "+myArray.length);  
      
       res.render("index.ejs", {
        arrayToDo,
        myArray,
        currYear
        
    });
    console.log("Save myArray: "+myArray);
    
});

app.post("/delete", (req, res) => {//for deleting element in an array
    console.log("Delete// arrayToDo value before deletion: "+arrayToDo);
    var i = (req.body["myCheckbox"]);//getting the "value" of all checkbox with the name (myCheckbox) which is tick, so that I will know which index got tick and passing it to variable i     
    if (i){
        console.log("Delete// index selected: "+i);
        var newText = i.toString();//converting i to string
        myArray = newText.split(",");//using split() to separate newText with "," indicator and making it an array
        for( var x = myArray.length-1; x >=0; x--){
        console.log("Delete// element value to be deleted: "+arrayToDo[myArray[x]]);
        arrayToDo.splice(myArray[x],1);//Deleting arrayToDo element with an index same with myArray elements
        }
    } else {
        console.log("Nothing was selected to be deleted");
    }
    console.log("Delete// arrayToDo value after deletion: "+arrayToDo);
        myArray = [];//Deleting value of myArray after deletion so that no elements is going to be ticked when index.ejs rendered
        res.render("index.ejs", {
        arrayToDo,
        myArray,
        currYear
        
    });
    
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });


// import { dirname } from "path";//use to figure directory name dynamically when the server is hosted in a cloud
// import { fileURLToPath } from "url";//use to figure directory name dynamically when the server is hosted in a cloud
// const __dirname = dirname(fileURLToPath(import.meta.url));//use to figure directory name dynamically when the server is hosted in a cloud
// import got from "got";
// import jquery from "jquery";
// import fs from "fs";
//import {JSDOM} from "jsdom";
//const myURL = "http://localhost:3000/";

// const dom = new JSDOM(myEjs);

// const try1 = dom.window.document.querySelector("h1").innerHTML;
// console.log(try1);
// import { alertOnly } from "./views/indexDom.js";
// alertOnly;

// for (var i = 0; i < dom.window.document.querySelectorAll("checkbox").length; i++){
//     // dom.window.document.querySelectorAll("checkbox")[i].addEventListener("click"), function(){
//     //     var checkedValue = dom.window.document.querySelectorAll("checkbox");
//         // if (checkedValue.checked){
    
//     // }
//     // }
// }
// var myLength = dom.window.document.querySelector("h1");
// console.log(myLength.innerHTML);
// myLength.innerHTML = "EY!";
// console.log(myLength.innerHTML);
  
//   got(myURL).then(res => {
//     const dom = new JSDOM(res.body);
//     console.log(dom.window.document.querySelector("body").innerHTML);
//     for(var i = 0; i < dom.window.document.querySelectorAll(".cb").length; i++){
//        console.log(dom.window.document.querySelectorAll(".cb")[i].checked);
       
       
//     }
//     console.log(dom.window.document.querySelectorAll(".cb").length);   
// }).catch(err => {
//  console.log(err);
// });


// got(myURL).then(res => {
// const dom = new JSDOM(res.body);
//         // console.log(dom.window.document.querySelector("#label0").textContent);
//         const myCheck = dom.window.document.querySelectorAll(".cb");
//         // console.log(dom.window.document.querySelector("body").innerHTML);
//         for (var i = 0; i < arrayToDo.length; i++){
           
//             // console.log("New value of checked:");
//             // console.log(myCheck[i].checked);
//             // console.log(checkedValue[i]);
//         }
        
        
//     }).catch(err => {
//         console.log(err);
//        });