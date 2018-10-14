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
      url: "https://graph.facebook.com/v2.9/EasyConnectDuke/posts?access_token=EAAgu8PurRGYBAJaIey7ICaIJ0rsU7XBZB6QlZAyVNAG4NHBIJLn2iIu86bGtoj0eizpS9TymNY9z20A8w1hCs6XDbcDa0aSXTqk9w9atZByeAIT9rZC7e0lKv4KEIbGHZAzwnqzffn4dCuuZB2iVPx8RQZB4GKega5GVOoNOsPj7GJWd1ctebxE2AmS43i0yg22ZAZAZBi94rkE6nHIExKOqxbhUMxkqV9RhYVvkDHZB6WZANAZDZD",
      method: "GET",
      timeout: 100000,
      followRedirect: true,
      maxRedirects: 10
  },function(error, response, body){
      if(!error && response.statusCode == 200){
          console.log('sucess!');
          //var data = JSON.parse(response.body[0]);
          console.log(response.body[0]);

          // JSONObject json = new JSONObject(data);
          // String statistics = json.getString("");
          // JSONObject name1 = json.getJSONObject("data");
          // //String ageJohn = name1.getString("Age");
          // console.log(name1);

      }else{
          console.log('error' + response.statusCode);
      }
  });
}, 5000);


function sendData(toNumber,message) {
  client.messages.create({
    body:"\n"+ message +"\n",
    from: '+18509192242',
    to: toNumber
  })
  .then(message => console.log(message.sid))
  .done();
}
