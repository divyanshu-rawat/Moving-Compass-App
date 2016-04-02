
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $city = $("#city").val();
    var $street = $("#street").val();
    var $address = $street + ',' + $city;
    //Removed Street View Request!!
    //var $streetURL = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location="+ $address + "&key=AIzaSyC9qm5DPHuib0W51BzzxTQQ213Z-S1VE7s";
    var nytimes_url = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + $city + "&sort=newest&api-key=68bec738e7fe8c08b0e254b12f4de74a:15:74774592";
    var wikimedia_url = "http://en.wikipedia.org/w/api.php?action=opensearch&search="+ $city +"&format=json";
    // clear out old data before new request
    $("#element").append("<h3> so you want to live in "+$address +"</h3>");
    $wikiElem.text("");
    $nytElem.text("");
    //$("body").append(" <img class='bgimg' src="+ $streetURL +"> ");
    // load streetview

    // YOUR CODE GOES HERE!
    $.getJSON(nytimes_url,function(data){
      $("#nytimes-header").text("New York Times Articles About " + $city );
      var i=0;
      while(true)
      {
        var nyt_url = (data["response"].docs[i].web_url);
        var headline = (data.response.docs[i].headline.main);
        var article = (data.response.docs[i].lead_paragraph);
        $("#nytimes-articles").append("<li class='article'><a href=" + nyt_url + ">" + headline + "</a> <p>" + article + "</p></li>");
        i++;
      }
    }).error(function(e){
        $("#nytimes-header").text("New York Times Articles could not be Loaded!");
      });
      // Using YQL and JSONP

      $.ajax(wikimedia_url,{
        //url: wikimedia_url,.
        dataType:"jsonp", //indicating that it is a jsonp request.
        // Tell jQuery we're expecting JSONP

        //A function to be called if the request succeeds.
        // The function gets passed three arguments: The data returned from the server
        success: function( response ) {
         // server response
         for(i=0;i<response[1].length;i++)
         {
           var heading = response[1][i];
           var link = response[3][i];
           $("#wikipedia-links").append("<li><a href="+ link +">"+ heading +"</a></li>");
          }
      }
});

    return false;
};

$('#form-container').submit(loadData);
