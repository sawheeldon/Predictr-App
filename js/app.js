// error function

//function to take team name and go to wikipedia

var wikiTeamSearch = function (data) {
    var searchTeam = $("#team-name").val();
    var dynamicURL = "https://en.wikipedia.org/w/api.php?action=parse&page=" + searchTeam + " F.C. " + "&format=json&callback=?";
    $.ajax({
            url: dynamicURL,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: 'jsonp',
            success: function (data, jqXHR) {
                console.log(data);
            },
        })
        .done(function showResult(data) {
            //console.log("success");
            var html = "";
            $.each(data, function (index, value) {
                html += '<p>' + value.displaytitle + '</p>';
                console.log(value.displaytitle);
            });
            $('#wikiTeamTitle').html(html);
        })
        .fail(function (jqXHR, error) { //this waits for the ajax to return with an error promise object
            var errorElem = showError(error);
            $('#wikiTeamTitle').append(errorElem);
        })
        .always(function () {
            console.log("complete");
        });
};

// team sections function

var wikiTeamSections = function (data) {
    var searchTeam = $("#team-name").val();
    var dynamicURL = "https://en.wikipedia.org/w/api.php?action=parse&page=" + searchTeam + " F.C. " + "&format=json&callback=?";
    $.ajax({
            url: dynamicURL,
            type: 'GET',
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: 'jsonp',
            success: function (data, jqXHR) {
                console.log(data);
            },
        })
        .done(function showResult(data) {
            //console.log("success");
            var html = "";
            $.each(data, function (index, value, object) {
                html += '<p>' + value.sections + '</p>';
                console.log(value.sections);
            });
            $('wikiSections').html(html);
        })
        .fail(function (jqXHR, error) { //this waits for the ajax to return with an error promise object
            var errorElem = showError(error);
            $('#wikiTeamTitle').append(errorElem);
        })
        .always(function () {
            console.log("complete");
        });
};

//team image function


//function to go and get team name and find fixtures from google

//function to get videos

var videoSearch = function (data) {
    //alert(query);
    var getResult = $("#team-name" + "Football Club").val();

    var html = "";

    $.getJSON("https://www.googleapis.com/youtube/v3/search", {
            part: "snippet",
            maxResults: 10,
            key: "AIzaSyAWblRjcTmS4TactzoaSQz-vhAQeXXb7as",
            q: getResult,
            type: "video"
        },
        function (data) {
            console.log(data);
            if (data.pageInfo.totalResults == 0) {
                $('#videoResult').html("Sorry there are no videos for your club, please try another one.");
            }
            displaySearchResults(data.items);
        });
    var displaySearchResults = function (videoArray) {
        var buildTheHtmlOutput = "";

        $.each(videoArray, function (videoArrayKey, videoArrayValue) {
            buildTheHtmlOutput += "<li>";
            buildTheHtmlOutput += "<p>" + videoArrayValue.snippet.title + "</p>"
            buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videoArrayValue.id.videoId + "' target='_blank'>";
            buildTheHtmlOutput += "<img src='" + videoArrayValue.snippet.thumbnails.high.url + "'height=80px width=80px/>";
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


$(function () {

    hideTabs();

    $('#submit').on("click", function (e) {
        e.preventDefault();
        wikiTeamSearch();
        wikiTeamSections();
        videoSearch();
        showTabs();
    });

});
