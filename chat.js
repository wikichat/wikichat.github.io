$(document).ready(function(){
	var firebaseRef = new Firebase("https://tommyleejones.firebaseio.com/");
	var messagesRef = firebaseRef.child("messages");

		messagesRef.on("child_added", function(snapshot, previousNeighborId) {
		var data = snapshot.val();
		$("#bottom").before("<div class='container'><div class='col-md-4'><h3>" + data.user + "</div><div class='col-md-8 chatMessage'><h3>" + data.message + "</h3></div></div><br />");
	});
		$("#chat").click(function(){
			var userAuth = firebaseRef.getAuth();
			console.log(userAuth.uid);
			var userRef = firebaseRef.child(userAuth.uid);
			var usersname = userRef.child("/userName");
			var usersName = userRef.orderByKey().on("child_added", function(snapshot) {
				data = snapshot.val();

			var userMessage = $("#message").val();
			userMessage = userMessage.replace(/<\/?[^>]+(>|$)/g, "");
			messagesRef.push({user: data, message: userMessage});
			$("#message").val("");
			});
		});

		$("#message").keydown(function(e) {
    		if (e.keyCode == 13) {
	 			var userAuth = firebaseRef.getAuth();
				console.log(userAuth.uid);
				var userRef = firebaseRef.child(userAuth.uid);
				var usersname = userRef.child("/userName");
				var usersName = userRef.orderByKey().on("child_added", function(snapshot) {
					data = snapshot.val();

				var userMessage = $("#message").val();
				userMessage = userMessage.replace(/<\/?[^>]+(>|$)/g, "");
				messagesRef.push({user: data, message: userMessage});
				$("#message").val("");
				});       		
    		}
		});

});
