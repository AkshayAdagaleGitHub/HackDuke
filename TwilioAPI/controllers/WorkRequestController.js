'user strict';

const accountSid = 'ACa85c7b7f567b95194f8868555ebe16be';
const authToken = 'e58077322dda5c40a269f6c043c89559';
const client = require('twilio')(accountSid, authToken);
const https = require('https');
var request = require('request');
var mongoose = require('mongoose');
  // admin = mongoose.model('Admin');
  workrequest = mongoose.model('workrequest');
  handyman = mongoose.model('handyman');


  exports.register_workrequest = function(req, res) {
    var newworkrequest = new workrequest();
    newworkrequest = req;
    console.log(newworkrequest);
    newworkrequest.save(function(err, workrequest){
      if (err) {
          console.log(err);

      } else {

        console.log('work request saved');
        var getzip = newworkrequest.zip;
        console.log(getzip);

        handyman.find({
            zip: getzip
          },{
            from: 1,
            _id: 0
          }
          , function(err, data){
            if (err) console.log(err);
            if(data){
              var list = []

              for (var i = 0; i < data.length; i++) {
                var counter = data[i].from;
                list.push(counter);

              }
              console.log(list);
              var message="Hi! I have a job: "+ newworkrequest.job +" please contact me at: "+newworkrequest.from;

              list.forEach(function(item,index) {

                sendData(item,message);
                console.log("sent");
              })

            }
      });
        }
    });

};


exports.register_workrequest_mobile = function(req, res) {
  var newworkrequest = new workrequest(req.body);
  //newR = req.body;
  console.log(newworkrequest);
  newworkrequest.save(function(err, survey) {
    if (err) {
      return res.status(400).send({
        message: err, status:'400'
      });
    } else {
      var getzip = newworkrequest.zip;
      console.log(getzip);

      handyman.find({
          zip: getzip
        },{
          from: 1,
          _id: 0
        }
        , function(err, data){
          if (err) console.log(err);
          if(data){
            var list = []

            for (var i = 0; i < data.length; i++) {
              var counter = data[i].from;
              list.push(counter);

            }
            console.log(list);
            var message="Hi! I have a job: "+ newworkrequest.job +" please contact me at: "+newworkrequest.from;

            list.forEach(function(item,index) {

              sendData(item,message);
              console.log("sent");
            })

          }
        });
      return res.json({message: 'survey submitted successfully', status:'200'});

      }
  });
};


exports.register_workrequest_mobile = function(req, res) {
  var newworkrequest = new workrequest(req.body);
  //newR = req.body;
  console.log(newworkrequest);
  newworkrequest.save(function(err, survey) {
    if (err) {
      return res.status(400).send({
        message: err, status:'400'
      });
    } else {
      var getzip = newworkrequest.zip;
      console.log(getzip);

      handyman.find({
          zip: getzip
        },{
          from: 1,
          _id: 0
        }
        , function(err, data){
          if (err) console.log(err);
          if(data){
            var list = []

            for (var i = 0; i < data.length; i++) {
              var counter = data[i].from;
              list.push(counter);

            }
            console.log(list);
            var message="Hi! I have a job: "+ newworkrequest.job +" please contact me at: "+newworkrequest.from;

            list.forEach(function(item,index) {

              sendData(item,message);
              console.log("sent");
            })

          }
        });
      return res.json({message: 'survey submitted successfully', status:'200'});

      }
  });
};



var requestLoop = setInterval(function(){
  request({
      url: "https://graph.facebook.com/v2.9/EasyConnectDuke/posts?access_token=EAAgu8PurRGYBAEGx1gBQ9wsIhL0UwZBV3JlgRkovZAOwQL71eMUbPx2H0SzZArttKalEa9YOnkSgYTKFIiW784VcvL9Qpdc3MxZCtYPMPmqAQ6HwUXw7tdFvTMrFUZCBz8ATezoLDfsPiR516xC0Fi8vBeZBSMFslZAyVUF286cyAZDZD",
      method: "GET",
      timeout: 100000,
      followRedirect: true,
      maxRedirects: 10
  },function(error, response, body){
      if(!error && response.statusCode == 200){
          console.log('sucess!');
          //var data = JSON.parse(response.body[0]);
          //console.log(response.body);
          const parsedRes = JSON.parse(response.body).data;
          console.log(parsedRes[0].message);
          var fb_data = parsedRes[0].message;
          var n = new workrequest();
          var split_data = fb_data.split(" ");

          n.from = split_data[0];
          n.Name = split_data[1];
          n.zip = split_data[2];
          n.region = split_data[3];
          n.skill=split_data[4];

         var fromIndex= fb_data.indexOf(split_data[4])+split_data[4].length+1;
         var toIndex= fb_data.length;

         n.job=fb_data.slice(fromIndex,toIndex);

         var newworkrequest = new workrequest(n);
         //console.log(newworkrequest);
         //console.log(n);

         mongoose.connection.collection('workrequests').findOne({from: n.from, Name: n.Name, zip: n.zip, region: n.region, skill: n.skill, job: n.job})
 .then(function(doc) {
        if(!doc){

             newworkrequest.save(function(err, survey) {
               if (err) {
                 return res.status(400).send({
                   message: err, status:'400'
                 });
               } else {
                 var getzip = newworkrequest.zip;
                 console.log(getzip);

                 handyman.find({
                     zip: getzip
                   },{
                     from: 1,
                     _id: 0
                   }
                   , function(err, data){
                     if (err) console.log(err);
                     if(data){
                       var list = []

                       for (var i = 0; i < data.length; i++) {
                         var counter = data[i].from;
                         list.push(counter);

                       }
                       console.log(list);
                       var message="Hi! I have a job: "+ newworkrequest.job +" please contact me at: "+newworkrequest.from;

                       list.forEach(function(item,index) {

                         sendData(item,message);
                         console.log("sent");
                       })

                     }
                   });
                 //return res.json({message: 'survey submitted successfully', status:'200'});

                 }
             });

           } else {
             console.log('record already exists');
             }
         });

         //console.log(n);




      }else{
          console.log('error' + response.statusCode);
      }
  });
}, 30000);


function sendData(toNumber,message) {
  client.messages.create({
    body:"\n"+ message +"\n",
    from: '+18509192242',
    to: toNumber
  })
  .then(message => console.log(message.sid))
  .done();
}
