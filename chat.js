$(document).ready(function(){
	var firebaseRef = new Firebase("https://tommyleejones.firebaseio.com/");
	var messagesRef = firebaseRef.child("messages");
	var messagesLimitRef = firebaseRef.child("messages").limit(50);
    var favicon = false;
		messagesLimitRef.on("child_added", function(snapshot, previousNeighborId) {
		var data = snapshot.val();
		$("#bottom").before("<div class='container round' style='background-color:" + data.color + "'><div class='col-md-4 chatName'><h3><a target='_blank' href='" + data.wikiLink + "'><img src = '" + data.img + "' height = 50px/>" + data.user + "</a></div><div class='col-md-8 chatMessage'><h3>" + data.message + "</h3></div></div><br />");
	});
		$("#chat").click(function(){
			firebaseRef.onAuth(function(authData){
				 if (authData) {
				    console.log("User " + authData.uid + " is logged in with " + authData.provider);
				  } else {
				     alert("Please login as a page first");
				     window.location.assign("index.html");
				  }
			});
			var userAuth = firebaseRef.getAuth();
			var userRef = firebaseRef.child(userAuth.uid);
			var usersname = userRef.child("/userName");
			userRef.orderByChild("userName").on("value", function(snapshot){
				var data = snapshot.val();
				var name = data.userName;
				var link = data.userLink;
                var image = data.userImg;
                var clr = data.userColor;
                if(!favicon) {
                    $("head").append("<link rel = 'icon' href = '" + image + "'>");
                    favicon = true;
                }
				var userMessage = $("#message").val();
				userMessage = userMessage.replace(/<\/?[^>]+(>|$)/g, "");
				messagesRef.push({user: name, img: image, wikiLink: link, message: userMessage, color: clr});
				$("#message").val("");

			});

		});

		$("#message").keydown(function(e) {
			firebaseRef.onAuth(function(authData){
				 if (authData) {
				    console.log("User " + authData.uid + " is logged in with " + authData.provider);
				  } else {
				     alert("Please login as a page first");
				     window.location.assign("index.html");
				  }
			});
    		if (e.keyCode == 13) {
			var userAuth = firebaseRef.getAuth();
			var userRef = firebaseRef.child(userAuth.uid);
			var usersname = userRef.child("/userName");
			userRef.orderByChild("userName").on("value", function(snapshot){
				var data = snapshot.val();
				var name = data.userName;
				var link = data.userLink;
                var image = data.userImg;
                var clr = data.userColor;
                if(!favicon) {
                    $("head").append("<link rel = 'icon' href = '" + image + "'>");
                    favicon = true;
                }
				var userMessage = $("#message").val();
				userMessage = userMessage.replace(/<\/?[^>]+(>|$)/g, "");
				messagesRef.push({user: name, img: image, wikiLink: link, message: userMessage, color: clr});
				$("#message").val("");

			});    		
    		}
		});

});
