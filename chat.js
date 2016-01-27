$(document).ready(function(){
	var firebaseRef = new Firebase("https://tommyleejones.firebaseio.com/");
	var messagesRef = firebaseRef.child("messages");

		messagesRef.on("child_added", function(snapshot, previousNeighborId) {
		var data = snapshot.val();
		$("#bottom").before("<div class='container'><div class='col-md-4 chatName'><h3><a target='_blank' href='" + data.wikiLink + "'><img src = '" + data.img + "' height = 50px/>" + data.user + "</a></div><div class='col-md-8 chatMessage'><h3>" + data.message + "</h3></div></div><br />");
	});
		$("#chat").click(function(){
			var userAuth = firebaseRef.getAuth();
			var userRef = firebaseRef.child(userAuth.uid);
			var usersname = userRef.child("/userName");
			userRef.orderByChild("userName").on("value", function(snapshot){
				var data = snapshot.val();
				var name = data.userName;
				var link = data.userLink;
                var image = data.userImg;
				var userMessage = $("#message").val();
				userMessage = userMessage.replace(/<\/?[^>]+(>|$)/g, "");
				messagesRef.push({user: name, img: image, wikiLink: link, message: userMessage});
				$("#message").val("");

			});

		});

		$("#message").keydown(function(e) {
    		if (e.keyCode == 13) {
			var userAuth = firebaseRef.getAuth();
			var userRef = firebaseRef.child(userAuth.uid);
			var usersname = userRef.child("/userName");
			userRef.orderByChild("userName").on("value", function(snapshot){
			var data = snapshot.val();
			var name = data.userName;
			var link = data.userLink;
            var image = data.userImg;
			var userMessage = $("#message").val();
			userMessage = userMessage.replace(/<\/?[^>]+(>|$)/g, "");
			messagesRef.push({user: name, img: image, wikiLink: link, message: userMessage});
			$("#message").val("");

			});     		
    		}
		});

});
