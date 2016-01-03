// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      Welcome();
      FriendList();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
        $( "#logindiv" ).css( "display", "none" );
    } else {
        // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
        $( "#logindiv" ).css( "display", "none" );
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
     FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1194406197253855',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  var me="";
  var meID="";
  function Welcome() {
    
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'You are logged in as: ' + response.name + '!';
        me=response.name;
        meID=response.id;
        $( "#logindiv" ).css( "display", "block" );
    });
  }
  
  
  var arr=[];
  var MyHomies=[];
  
  
  function removeLi(i){
    console.log("removeLi("+i+")");
    
  //Deletes the DIV tag
      var divs = document.getElementsByTagName('div'),
      coolVar = divs.length;
      while (coolVar) {
          coolVar -= 1;
          if (divs[coolVar].getAttribute('id') == "coolcool"+i) {
              divs[coolVar].parentNode.removeChild(divs[coolVar]);
              break;
          }
      }
      
  //Removes the person from the array of wanted secret santa-ers
      for (var p=0;p<MyHomies.length;p++){
        if (MyHomies[p]==arr[i]){
          
          console.log('MyHomies Before: ' + JSON.stringify(MyHomies));
          console.log("remove from homies("+p+")");
          
          MyHomies.splice(p,1);
          console.log('MyHomies After: ' + JSON.stringify(MyHomies));
          
          break; 
        }
      }
      
  }
  
  function test(i){
      console.log("Test Activated "+ arr[i]);
      $("#list2 ul").append('<div id="coolcool'+i+'"><li><a onClick = "removeLi('+i+')">'+arr[i]+'</a></li></div>');
      MyHomies.push(arr[i]);
      
    }
    
  var MyFriends=[];
  
  function FriendList() {
    FB.api(
    "/me/friends",
    function (response) {
      if (response && !response.error) {
        MyFriends=response.data;
        MyFriends.push({"name":me,"id":meID});
        console.log('Friends: ' + JSON.stringify(MyFriends));
          console.log("Length: "+response.data.length);
       //arr.push(me);
        for (var i=0;i<response.data.length;i++){
          arr.push(response.data[i]['name']);
        }
        
        
        for (var i=0;i<arr.length;i++){
          $("#list ul").append('<li><a onClick = "test('+i+')">'+arr[i]+'</a></li>');
        } 
      }
          
    }
    );
  }
  
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
  var gifters=[];
  
  function Choose(){
    
    $('#rels ul').empty();
    
    
    MyHomies=shuffle(MyHomies);
    for (var i=0;i<MyHomies.length;i++){
      if (i!=MyHomies.length-1){
        //$("#rels ul").append('<li>'+MyHomies[i]+', you have '+MyHomies[i+1]+'</li>');
        gifters.push(MyHomies[i]+","+MyHomies[i+1]);
      }
      else{
        //$("#rels ul").append('<li>'+MyHomies[i]+', you have '+MyHomies[0]+'</li>');
        gifters.push(MyHomies[i]+","+MyHomies[0]);
        break;
      }
      
    }
    SendHerOff();
  }
  var dataToSend="";
  function SendHerOff(){
    
    console.log("gifters: "+JSON.stringify(gifters));
      for (var i=0;i<gifters.length;i++){
      
        var str = gifters[i];
        var res = str.split(",");
        
        var WhoTo=res[0];
        
        for (var j=0;j<MyFriends.length;j++){
          if (MyFriends[j]['name']==WhoTo){
            WhoTo=MyFriends[j]['id'];
            break;
          }
        }
        dataToSend=gifters[i];
        dataToSend+=","+document.getElementById('budget').value;
        dataToSend+=","+document.getElementById('datepicker').value;
        dataToSend+=","+document.getElementById('OptMessage').value;
        
        dataToSend=CryptoJS.AES.encrypt(dataToSend,"topkek");
        
        dataToSend=dataToSend.toString();
        
        
        dataToSend=replaceAll(dataToSend,"+","plussign");
        dataToSend=replaceAll(dataToSend,"%","percentsign");
        //'https://secretsantagarbage-benmirtchouk.c9users.io/result.php?data='+dataToSend
        console.log("To: "+gifters[i]);
        console.log("DataToSend: "+dataToSend);
        FB.ui({
          method: 'send',
          link: 'http://secretsantagarbage.github.io/result.php?data='+dataToSend,
          to: WhoTo,
        });
    }
    
    gifters=[];
  }
  
  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }
