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
			var link = $("#name").attr("href");
            var img = $("#avatar").attr("src");
            var color = randomColor({
            	luminosity: 'light', hue:'blue'
            });
			userRef.set({userName: username, userLink: link, userImg: img, userColor: color});
		    console.log("Authenticated successfully with payload:", authData);
		    window.location.assign("chat.html");
		  }
		}, { remember: "sessionOnly"});
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
                        //console.log(data.query.random[0].title);
                        //console.log(data.query.random[0]);
                        var randomPage = data.query.random[0];
                        $("#usname").html="";
                    $.ajax({
                            type: "GET",
                            url : "http://en.wikipedia.org/w/api.php?action=query&format=json&generator=images&titles=" + randomPage.title + "&prop=imageinfo&iiprop=url&callback=?",
                            contentType: "application/json; charset=utf-8",
                            async: false,
                            dataType: "json",
                            success: function(data, textStatus, jqXHR) {    
                                var imgUrl;
                                if(data.query === undefined) {
                                    imgUrl = "Speedwagon(male).png";
                                }
                                else {
                                    if(data.query.pages === undefined) {
                                        imgUrl = "Speedwagon(male).png";
                                    }
                                    else {
                                        for(var i in data.query.pages) {
                                            imgUrl = data.query.pages[i].imageinfo[0].url;
                                            break;
                                        }
                                    }
                                }
                                $("#usname").html("<a href = 'http://en.wikipedia.org/wiki/?curid=" + randomPage.id + "' target='_blank' id='name'><img src = '" + imgUrl + "' width=50px id='avatar'/>" + randomPage.title + "</a>");
                            },
                            error: function(errorMessage) {
                    
                            }
                        });
                        //$("#usname").html("<a href = 'http://en.wikipedia.org/wiki/?curid=" + data.query.random[0].id + "' target='_blank' id='name'>" + data.query.random[0].title + "</a>");
                        //var htmlstring = "You are <a href = 'http://en.wikipedia.org/wiki/?curid=" + data.query.random[0].id + "'>" +data.query.random[0].title + "</a>";
                        //$('#article').html(htmlstring);
                    },
                    error: function (errorMessage) {
                    }
                });
            }
