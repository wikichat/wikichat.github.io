$(document).ready(function() {
	randomAll();
	var firebaseRef = new Firebase("https://tommyleejones.firebaseio.com/");
		  $("#username").val("");
		  $("#password").val("");
		  $("#usname").val("");
		  $("#uspass").val("");
	$("#login").click(function(){
		var username = $("#name").text();
		//var userpass = $("#uspass").val();
		firebaseRef.authAnonymously(function(error, authData) {
		if (error) {
			$("#failLog").text("Login Was Not Successfull, please try again");
		} else {
			var user = firebaseRef.getAuth();
			var userRef = firebaseRef.child(user.uid);
			userRef.set({userName: username});
		    console.log("Authenticated successfully with payload:", authData);
		    window.location.assign("chat.html");
		  }
		}, { rmember: "sessionOnly"});
		/*
		firebaseRef.authWithPassword({
			email: username, password: userpass, remember: "sessionOnly"
		},  function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			    $("#failLog").text("Login Was Not Successfull, please try again");
			  } else {
			    //console.log("Authenticated successfully with payload:", authData);
			    window.location.assign("index.html");
			  }
			}, {
				remember: "sessionOnly"
			}); 
*/
	});

	$("#new").click(function(){
		randomAll();
	});
});

//grab any random article title (so you could end up with a coat of arms or some unkown artist's discography)
            function randomAll() {
                $.ajax({
                    type: "GET",
                    url: "http://en.wikipedia.org/w/api.php?action=query&list=random&format=json&rnnamespace=0&rnlimit=1&callback=?",
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    dataType: "json",
                    success: function (data, textStatus, jqXHR) {
                        console.log(data.query.random[0].title);
                        console.log(data.query.random[0]);
                        $("#usname").html="";
                        $("#usname").html("<a href = 'http://en.wikipedia.org/wiki/?curid=" + data.query.random[0].id + "' target='_blank' id='name'>" + data.query.random[0].title + "</a>");
                        //var htmlstring = "You are <a href = 'http://en.wikipedia.org/wiki/?curid=" + data.query.random[0].id + "'>" +data.query.random[0].title + "</a>";
                        //$('#article').html(htmlstring);
                    },
                    error: function (errorMessage) {
                    }
                });
            }
