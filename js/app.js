// error function

//news api

/*var news = function (data) {
    var searchTeam = $("#team-name").val() + " football club ";
    var dynamicURLMicro = "https://bingapis.azure-api.net/api/v5/news/search?q=european+football";

    $.ajax({
            _type: "News",
            readLink: dynamicURLMicro,
            totalEstimatedMatches: 1680000,
            key: "d8e91c36a55040dc9bfbfe1759c3a39a",
        })
        .done(function showResult(data) {
            console.log(data);
        })
}*/
//make capital

//Version one on load *******


/*google.load("feeds", "1");

function initialize() {
    var searchTeam = $("#team-name").val();
    var feed = new google.feeds.Feed("http://talksport.com/rss/football/" + searchTeam + "/feed");
    feed.load(function (result) {
        //console.log(result);
        if (!result.error) {
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                //console.log(entry);
                $('#news').text(entry.title);
            }
        };
    });
};
google.setOnLoadCallback(initialize);

*/

//Version two on call in theory *******

/*google.load("feeds", "1");

function OnLoad() {
    // Query for football team news
    var searchTeam = $("#team-name").val();
    var query = 'site:http://talksport.com/rss/football/' + searchTeam + '/feed';
    google.feeds.findFeeds(query, findDone);
};

function findDone(result) {
    // Make sure we didn't get an error.
    if (!result.error) {
        // Get content div
        var content = document.getElementById('content');
        var html = '';
        // Loop through the results and print out the title of the feed and link to
        // the url.
        for (var i = 0; i < result.entries.length; i++) {
            var entry = result.entries[i];
            console.log(result);
            html += '<p><a href="http://talksport.com/rss/football/feed" + entry.url + ">' + entry.title + '</a></p>';
            $('#news').text(entry.title);
        }
    }
};

google.setOnLoadCallback(OnLoad);
*/

/*function OnLoad() {
    // Query for football team news
    console.log("success");
    var searchTeam = $("#team-name").val();
    var query = ('site:http://talksport.com/rss/football/' + searchTeam + '/feed');
    google.feeds.findFeeds(query, findDone);
};

function findDone(result) {
    console.log(google.feeds.findFeeds(query, findDone));
    // Make sure we didn't get an error.
    if (!result.error) {
        // Get content div
        var content = document.getElementById('content');
        var html = '';
        // Loop through the results and print out the title of the feed and link to
        // the url.
        for (var i = 0; i < result.entries.length; i++) {
            var entry = result.entries[i];
            console.log(result);
            html += '<p><a href="http://talksport.com/rss/football/feed" + entry.url + ">' + entry.title + '</a></p>';
            $('#content').text(entry.title);
        }
    }
};
*/


var toTitleCase = function (str) {
    // "/\w\S*/g" is a regular expression (http://www.regular-expressions.info/) which searches for all words in a phrase ignoring the spaces
    return str.replace(/\w\S*/g, function (txt) {
        //only the first letter in the word make Upper case and all the other letters apart from the first one ("substr(1)") to lower case
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

//function to take team name and go to wikipedia

var wikiTeamSearch = function (data) {
    var searchTeam = toTitleCase($("#team-name").val() + " football club ");
    var dynamicURL = "https://en.wikipedia.org/w/api.php?action=parse&page=" + searchTeam + "&format=json&callback=?";
    $.ajax({
            url: dynamicURL,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: 'jsonp'
        })
        .done(function showResult(data) {
            console.log(data);
            if (data.error) {
                //alert("no result");
                $('.errorMessage').text("Sorry no team history found on your club.");
            } else {
                var html = "";
                $.each(data, function (index, value) {
                    if (value.displaytitle) {
                        html += '<p>' + value.displaytitle + '</p>';
                    }
                    //console.log(value);
                });
                //console.log(html);
                if (html != "") {
                    $('#wikiTeamTitle').html(html);
                }
            }
        })
        .fail(function (jqXHR, error) { //this waits for the ajax to return with an error promise object
            var errorElem = showError(error);
            //$('.errorMessage').append(errorElem);
        })
        .always(function () {
            //console.log("complete");
        });
};

// team sections function

var wikiTeamSections = function (data) {
    var searchTeam = $("#team-name").val();
    var dynamicURL = "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=" + searchTeam + " F.C. " + "&callback=?";
    $.ajax({
            url: dynamicURL,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: 'jsonp'
        })
        /*.done(function showResult(data) {
            //console.log("success");
            var html = "";
            $.each(data, function (index, value) {
                html += '<p>' + value.text + '</p>';
                //console.log(value.sections[1]);
            });
            $('#wikiSections').html(html);
        })*/
        .done(function (data, textStatus, jqXHR) {

            var markup = data.parse.text["*"];
            var blurb = $('<div></div>').html(markup);

            // remove links as they will not work
            blurb.find('a').each(function () {
                $(this).replaceWith($(this).html());
            });

            // remove any references
            blurb.find('sup').remove();

            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();
            $('#wikiSections').html($(blurb).find('p'));
        })
        .fail(function (jqXHR, error) { //this waits for the ajax to return with an error promise object
            var errorElem = showError(error);
            //$('.errorMessage').append(errorElem);
        })
        .always(function () {
            //console.log("complete");
        });
};


//function to get videos

var videoSearch = function (data) {
    //alert(query);
    var getResult = $("#team-name").val() + " football ";

    var html = "";

    $.getJSON("https://www.googleapis.com/youtube/v3/search", {
            part: "snippet",
            maxResults: 10,
            key: "AIzaSyAWblRjcTmS4TactzoaSQz-vhAQeXXb7as",
            q: getResult,
            type: "video"
        },
        function (data) {
            //console.log(data);
            if (data.pageInfo.totalResults == 0) {
                $('.errorMessage').html("Sorry there are no videos for your club, please try another one.");
            }
            displaySearchResults(data.items);
        });
    var displaySearchResults = function (videoArray) {
        var buildTheHtmlOutput = "";

        $.each(videoArray, function (videoArrayKey, videoArrayValue) {
            buildTheHtmlOutput += "<li>";
            buildTheHtmlOutput += "<p>" + videoArrayValue.snippet.title + "</p>"
            buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videoArrayValue.id.videoId + "' target='_blank'>";
            buildTheHtmlOutput += "<img src='" + videoArrayValue.snippet.thumbnails.high.url + "' width='100%'/>";
            buildTheHtmlOutput += "</a>";
            buildTheHtmlOutput += "</li>";

        });
        $(".video-container ul").html(buildTheHtmlOutput);
    };
};


//function to hide all the tabs

var hideTabs = function () {
    $('.tab-container').hide();
};

//function to show all the tabs when search is complete

var showTabs = function () {
    $('.tab-container').show();
};

google.load("feeds", "1");

$(function () {

    hideTabs();

    $('#submit').on("click", function (e) {
        e.preventDefault();


        wikiTeamSearch();
        wikiTeamSections();
        videoSearch();
        showTabs();
        //google.setOnLoadCallback(OnLoad);
        //google.setOnLoadCallback(initialize);
    });

});
