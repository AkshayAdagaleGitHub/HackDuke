const http = require('http');
const express = require('express');
const accountSid = 'ACa85c7b7f567b95194f8868555ebe16be';
const authToken = 'e58077322dda5c40a269f6c043c89559';
const client = require('twilio')(accountSid, authToken);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jsonwebtoken = require("jsonwebtoken");
const handyman = require('./model/Handymanmodel');
const workrequest = require('./model/WorkRequestModel');
const app = express();

//var Task = mongoose.model('inclass03');
// var medi = new Task();
// var user ;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://aMad:12019@cluster0-axmyu.mongodb.net/test?retryWrites=true');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./Routes/routes'); //importing route
  routes(app); //register the route


// function sendData(message) {
//   client.messages.create({
//     body:"\n"+ message +"\n",
//     from: '+18509192242',
//     to: '+19293101100'
//   })
//   .then(message => console.log(message.sid))
//   .done();
// }
//
//
// //sendData("You are already registered. Please reply to the previous response.");
//
//
//
// app.post('/sms', (req, res) => {
//   //const twiml = new MessagingResponse();
//
//   console.log(req.body);
//   if (req.body.Body.toUpperCase() == 'START') {
//     console.log(req.body.From);
//     Task.findOne({from:req.body.From}, function(err, task) {
//       if (err){
//         console.log("error me");
//         res.send(err);
//       }
//       if(!task){
//
//         var newM = new Task();
//         newM.count = 1;
//         newM.step = 0;
//         newM.from = req.body.From;
//         newM.message = 'Welcome to the study!Please indicate your symptom (1)Headache, (2)Dizziness, (3)Nausea, (4)Fatigue, (5)Sadness, (0)None!';
//         newM.symptoms = "";
//         newM.response = "skhbdj";
//
//
//         newM.save(function(err, newM) {
//           console.log("here");
//           if (err) {
//             console.log(err + "ksjd");
//             return res.status(400).send({message: err, status:'400'});
//
//           } else {
//             console.log("saved");
//             sendData("Welcome to the study!Please indicate your symptom (1)Headache, (2)Dizziness, (3)Nausea, (4)Fatigue, (5)Sadness, (0)None");
//             //twiml.message('Welcome to the study!Please indicate your symptom (1)Headache, (2)Dizziness, (3)Nausea, (4)Fatigue, (5)Sadness, (0)None');
//             console.log("Welcome to the study!Please indicate your symptom (1)Headache, (2)Dizziness, (3)Nausea, (4)Fatigue, (5)Sadness, (0)None");
//
//           }
//         });
//
//       }else if(task.step == 0 && task.count ==1){
//         var newM = new Task();
//
//         newM.count = 1;
//         newM.step = 0;
//         newM.from = req.body.From;
//         newM.message = 'Welcome to the study!Please indicate your symptom (1)Headache, (2)Dizziness, (3)Nausea, (4)Fatigue, (5)Sadness, (0)None!';
//         newM.symptoms = "";
//         newM.response = "skhbdj";
//
//         Task.findOneAndUpdate({from: req.body.From},newM, {new: true}, function(err, task) {
//           if (err)
//           res.send(err);
//           if(task)
//           {      console.log(task.message);
//             sendData("Welcome to the study!Please indicate your symptom (1)Headache, (2)Dizziness, (3)Nausea, (4)Fatigue, (5)Sadness, (0)None");
//             console.log("Thank you and see you soon.!!!!");
//             //sendData("Thank you and see you soon.!!!!");
//           }
//         });
//       }
//       else{
//         //var twiml1 = new MessagingResponse();
//         user = task;
//         console.log("You are already registered. Please reply to the previous response.");
//         sendData("You are already registered. Please reply to the previous response.");
//
//         //    twiml1.message('You are already registered. Please reply to the previous response.');
//       }
//     });
//
//   }
//   else{
//     Task.findOne({from:req.body.From}, function(err, task) {
//       if (err){
//         console.log("error me");
//         res.send(err);
//       }
//       if(task){
//         if(task.step == 0 && (task.count ==1 || task.count == 2 || task.count ==3) && req.body.Body ==0){
//           sendData("Thank you and we will check with you later.");
//           console.log("Thank you and we will check with you later.");
//           var newM = new Task();
//
//           newM.count = 1;
//           newM.step = 0;
//           newM.from = req.body.From;
//           newM.message = 'Welcome to the study!Please indicate your symptom (1)Headache, (2)Dizziness, (3)Nausea, (4)Fatigue, (5)Sadness, (0)None!';
//           newM.symptoms = "";
//           newM.response = "skhbdj";
//
//           Task.findOneAndUpdate({from: req.body.From},newM, {new: true}, function(err, task) {
//             if (err)
//             res.send(err);
//             if(task)
//             {      console.log(task.message);
//               //sendData("Thank you and see you soon.!!!!");
//             }
//           });
//
//           //    twiml.message('Thank you and we will check with you later.');
//         }
//         else if(task.step ==0 && task.count == 1 ){
//           if(req.body.Body == '1' || req.body.Body == '2' || req.body.Body == '3' || req.body.Body == '4' || req.body.Body == '5'){
//             console.log("in one");
//             var newM = new Task();
//             newM.step  = 1;
//             newM.count = task.count;
//             newM.from = task.from;
//             if(req.body.Body == '1')
//             newM.symptoms = task.symptoms+'Headache';
//             if(req.body.Body == '2')
//             newM.symptoms = task.symptoms+'Dizziness';
//             if(req.body.Body == '3')
//             newM.symptoms = task.symptoms+'Nausea';
//             if(req.body.Body == '4')
//             newM.symptoms = task.symptoms+'Fatigue';
//             if(req.body.Body == '5')
//             newM.symptoms = task.symptoms+'Sadness';
//
//             newM.message = 'Indicate rating';
//             newM._id = task._id;
//             console.log(newM);
//
//             Task.findOneAndUpdate({from: req.body.From},newM, {new: true}, function(err, task) {
//               if (err)
//               res.send(err);
//               if(task){
//               console.log("On a sacle of 0 to 4. How would you rate your "+task.symptoms+" in last 24 hours?");
//               sendData("On a scale of 0 to 4. How would you rate your "+task.symptoms+" in last 24 hours?");
//             }});
//           }
//           else{
//             sendData("Please enter a no. 0 to 5 ");
//             console.log("Please enter a no. 0 to 5 ");
//           }
//         }else if(task.step ==0 && task.count == 2 ){
//           if(req.body.Body == '1' || req.body.Body == '2' || req.body.Body == '3' || req.body.Body == '4' || req.body.Body == '5'){
//             console.log("in two");
//             var newM = new Task();
//             newM.step  = 1;
//             newM.count = task.count;
//             newM.from = task.from;
//             var avai_syms = task.available_symptoms;
//
//             if(req.body.Body == '1')
//             newM.symptoms = avai_syms[0];
//             if(req.body.Body == '2')
//             newM.symptoms = avai_syms[1];
//             if(req.body.Body == '3')
//             newM.symptoms = avai_syms[2];
//             if(req.body.Body == '4')
//             newM.symptoms = avai_syms[3];
//
//             newM.message = 'Indicate rating';
//             newM._id = task._id;
//             newM.available_symptoms = task.available_symptoms;
//             console.log(newM);
//
//             Task.findOneAndUpdate({from: req.body.From},newM, {new: true}, function(err, task) {
//               if (err)
//               res.send(err);
//               if(task){
//               console.log("On a sacle of 0 to 4. How would you rate your "+newM.symptoms+" in last 24 hours?");
//                 sendData("On a sacle of 0 to 4. How would you rate your "+newM.symptoms+" in last 24 hours?");
//             }
//           });
//           }
//           else{
//             sendData("Please enter a no. 0 to 5 ");
//             console.log("Please enter a no. 0 to 5 ");
//           }
//
//         } else if(task.step ==0 && task.count == 3 ){
//           if(req.body.Body == '1' || req.body.Body == '2' || req.body.Body == '3' || req.body.Body == '4' || req.body.Body == '5'){
//             console.log("in two");
//             var newM = new Task();
//             newM.step  = 1;
//             newM.count = task.count;
//             newM.from = task.from;
//             var avai_syms = task.available_symptoms;
//
//             if(req.body.Body == '1')
//             newM.symptoms = avai_syms[0];
//             if(req.body.Body == '2')
//             newM.symptoms = avai_syms[1];
//             if(req.body.Body == '3')
//             newM.symptoms = avai_syms[2];
//
//             newM.message = 'Indicate rating';
//             newM._id = task._id;
//             newM.available_symptoms = task.available_symptoms;
//             console.log(newM);
//
//             Task.findOneAndUpdate({from: req.body.From},newM, {new: true}, function(err, task) {
//               if (err)
//               res.send(err);
//               if(task){
//               console.log("On a sacle of 0 to 4. How would you rate your "+newM.symptoms+" in last 24 hours?");
//                 sendData("On a sacle of 0 to 4. How would you rate your "+task.symptoms+" in last 24 hours?");
//             }
//           });
//           }
//           else{
//             sendData("Please enter a no. 0 to 5 ");
//             console.log("Please enter a no. 0 to 5 ");
//           }
//         }else if(task.step == 1 && task.count ==1 ){
//           if (req.body.Body == '1' || req.body.Body == '2' || req.body.Body == '3' || req.body.Body == '4' || req.body.Body == '0'){
//           console.log("in one");
//           var newM = new Task();
//           newM.step  = 0;
//           newM.count = 2;
//           newM.from = task.from;
//           if(req.body.Body == '1')
//           { newM.response = "1";
//           newM.message = 'You have a mild '+task.symptoms;
//         }
//         if(req.body.Body == '2'){
//           newM.response = "2";
//           newM.message = 'You have a mild '+task.symptoms;
//         }
//         if(req.body.Body == '3'){
//           newM.response = "3";
//           newM.message = 'You have a moderate '+task.symptoms;
//         }
//         if(req.body.Body == '4'){
//           newM.response = "4";
//           newM.message = 'You have a severe '+task.symptoms;
//         }
//         if(req.body.Body == '0'){
//           newM.response = "0";
//           newM.message = 'you do not have a ' +task.symptoms;
//         }
//         newM.symptoms = task.symptoms;
//         newM._id = task._id;
//         var syms = task.available_symptoms;
//         var del = task.symptoms;
//         var copy =syms;
//         for (var i = 0; i < syms.length; i++) {
//           if(syms[i] == del){
//             copy.splice(i,1);
//           }
//         }
//         syms =copy;
//         console.log(syms);
//         newM.available_symptoms = syms;
//
//         Task.findOneAndUpdate({from: req.body.From},newM, {new: true}, function(err, task) {
//           if (err)
//           res.send(err);
//           if(task){
//             console.log(task.message+"\n\n");
//           sendData(task.message+"\n\n");
//             var string  = "Please indicate your symptom. "
//             for (var i = 0; i <task.available_symptoms.length; i++) {
//               string = string +"(" + (i+1)  +")" + " " + task.available_symptoms[i]+" ";
//             }
//             string = string +"(0)None."
//             console.log(string);
//             sendData(string);
//           }
//
//         });
//       }
//       else{
//         sendData("Please enter a no. 0 to 4 ");
//         console.log("Please enter a no. 0 to 5 ");
//       }
//       }else if(task.step == 1 && task.count == 2 ){
// if (req.body.Body == '1' || req.body.Body == '2' || req.body.Body == '3' || req.body.Body == '4' || req.body.Body == '0'){
//         console.log("in one");
//         var newM = new Task();
//         newM.step  = 0;
//         newM.count = 3;
//         newM.from = task.from;
//         if(req.body.Body == '1')
//         { newM.response = "1";
//         newM.message = 'You have a mild '+task.symptoms;
//       }
//       if(req.body.Body == '2'){
//         newM.response = "2";
//         newM.message = 'You have a mild '+task.symptoms;
//       }
//       if(req.body.Body == '3'){
//         newM.response = "3";
//         newM.message = 'You have a moderate '+task.symptoms;
//       }
//       if(req.body.Body == '4'){
//         newM.response = "4";
//         newM.message = 'You have a severe '+task.symptoms;
//       }
//       if(req.body.Body == '0'){
//         newM.response = "0";
//         newM.message = 'you do not have a ' +task.symptoms;
//       }
//       newM.symptoms = task.symptoms;
//       newM._id = task._id;
//       newM.available_symptoms = task.available_symptoms;
//       console.log(newM);
//
//       var syms = task.available_symptoms;
//       console.log(syms);
//       var del = task.symptoms;
//       console.log(del);
//       var copy =syms;
//       for (var i = 0; i < syms.length; i++) {
//         if(syms[i] == del){
//           copy.splice(i,1);
//         }
//       }
//       syms =copy;
//       console.log(syms);
//       newM.available_symptoms = syms;
//
//       Task.findOneAndUpdate({from: req.body.From},newM, {new: true}, function(err, task) {
//         if (err)
//         res.send(err);
//         if(task){
//           console.log(task.message+"\n\n");
//           sendData(task.message+"\n\n");
//           var string  = "Please indicate your symptom. "
//           for (var i = 0; i <task.available_symptoms.length; i++) {
//             string = string +"(" + (i+1)  +")" + " " + task.available_symptoms[i]+" ";
//           }
//           string = string +"(0)None."
//           console.log(string);
//           sendData(string);
//
//         }
//       });
//     }
//     else{
//       sendData("Please enter a no. 0 to 4 ");
//       console.log("Please enter a no. 0 to 5 ");
//     }
//     }
//     else if(task.step == 1 && task.count == 3 ){
// if (req.body.Body == '1' || req.body.Body == '2' || req.body.Body == '3' || req.body.Body == '4' || req.body.Body == '0'){
//       console.log("in one");
//       var newM = new Task();
//       newM.step  = 0;
//       newM.count = 1;
//       newM.from = task.from;
//       if(req.body.Body == '1')
//       { newM.response = "1";
//       newM.message = 'You have a mild '+task.symptoms;
//     }
//     if(req.body.Body == '2'){
//       newM.response = "2";
//       newM.message = 'You have a mild '+task.symptoms;
//     }
//     if(req.body.Body == '3'){
//       newM.response = "3";
//       newM.message = 'You have a moderate '+task.symptoms;
//     }
//     if(req.body.Body == '4'){
//       newM.response = "4";
//       newM.message = 'You have a severe '+task.symptoms;
//     }
//     if(req.body.Body == '0'){
//       newM.response = "0";
//       newM.message = 'you do not have a ' +task.symptoms;
//     }
//     newM.symptoms = task.symptoms;
//     newM._id = task._id;
//     newM.available_symptoms = task.available_symptoms;
//     console.log(newM);
//
//     Task.findOneAndUpdate({from: req.body.From},newM, {new: true}, function(err, task) {
//       if (err)
//       res.send(err);
//       if(task)
//       {      console.log(task.message);
//         sendData(task.message);
//         console.log("Thank you and see you soon.!!!!");
//         sendData("Thank you and see you soon.!!!!");
//       }
//     });
//   }
//   else{
//     sendData("Please enter a no. 0 to 4 ");
//     console.log("Please enter a no. 0 to 5 ");
//   }
//   }
//
//
//       }
//     });
//   }
//
// });
//

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
