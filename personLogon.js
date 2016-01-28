$(document).ready(function() {
	randomBoring();
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
		    window.location.assign("personChat.html");
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
        console.log("Do you like waiting? Is that it?");
		randomBoring();
	});
});
//Put your code to get only people her in place of this. Leave function named random all or remember to change the above onclick to new function name
//You shouldn't have to change anything else besides the js here
            //grab only random person articles
        function randomBoring() {
            if($("#usname").val() === "") {
                var imgUrl;
                $.ajax({
                    type: "GET",
                    url: "http://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=1&callback=?",
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    dataType: "json",
                    success: function(data, textStatus, jqXHR) {
                        var randomPage = data.query.random[0];
                        $.ajax({
                            type: "GET",
                            url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=categories&pageid=" + data.query.random[0].id + "&callback=?",
                            contentType: "application/json; charset=utf-8",
                            async: false,
                            dataType: "json",
                            success: function(data, textStatus, jqXHR) {
                                var ready = false;
                                for(var i in data.parse.categories) {
                                    //console.log(data.parse.categories[i]);
                                    for(var j in data.parse.categories[i]) {
                                        //console.log(data.parse.categories[i][j]);
                                        var c = data.parse.categories[i][j].indexOf("characters");
                                        var b = data.parse.categories[i][j].indexOf("births");
                                        var p = data.parse.categories[i][j].indexOf("people");
                                        ready = false;
                                        if(c === -1 && b === -1 && p === -1) {
                                            ready = true;
                                            //console.log("bad");
                                        }
                                        else if(p > -1 || b > -1 || c > -1) {
                                            ready = false;
                                            //console.log("good");
                                            $("#usname").html("<a href='http://en.wikipedia.org/wiki/?curid=" + randomPage.id + "' id='name' target='_blank'>" + randomPage.title + "</a>");
                                            addPic(randomPage);
                                            return;
                                        }
                                    }
                                }
                                
                                if(ready === true) {
                                    $("#usname").html("Please wait, this may take some time");
                                    console.log("This waiting is your price to pay for being boring");
                                    randomBoring();
                                }
                            },
                            error: function(errorMessage) {
                            
                            }
                        });
                    },
                    error: function(errorMessage) {
                        
                    }
                });
            }
        };
function addPic(randomPage) {
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
            $("#usname").prepend("<img src = '" + imgUrl + "' width=50px id='avatar'/>");
        },
        error: function(errorMessage) {
                    
        }
    });
}