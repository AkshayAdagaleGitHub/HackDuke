// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI

function AppViewModel() {
    var self= this;
    
    self.Name=ko.observable('');
    self.Number=ko.observable('');
    self.Region=ko.observable('');
    self.Zip=ko.observable('');
    self.Skill=ko.observable('');
    self.Job=ko.observable('');
    self.urlIP=ko.observable('http://13.58.41.200:1337');
 
self.saveWorkRequest = function (params) {

    alert('calling ajax');
    $.ajax({
        method: "POST",
        contentType: 'application/x-www-form-urlencoded',
        data: JSON.stringify({
            Name: self.Name(),
            from: self.Number(),
            zip:self.Zip(),
            region: self.Region(),
            job:self.Job(),
            skill: self.Skill()}),
            url: self.urlIP()+"/register_workrequest_mobile",
           
            success: function(result) {
                alert('done');
                //Write your code here
                
                //self.token(result.token);
                $.toast({ heading: 'Success',
                text:'successfuly created the work request',
                  showHideTransition: 'slide',
                icon: 'success'});
                },
            error:
            function(result) {
                //Write your code here
                alert('error');
                $.toast({heading:'error',text:result,icon:'error'});
                }
        
      });
        // .done(function( data ) {
        //   alert( "welcome your token is = : " + data.token );
        // });

}
}

ko.applyBindings(new AppViewModel());

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}


// Activates knockout.js


