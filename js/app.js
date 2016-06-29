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
            $.each(data, function (index, value) {
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

//function to show wiki team information


//function to go and get team name and find fixtures

//function to hide all the tabs

//function to show all the tabs when search is complete

$(function () {

    $('#submit').on("click", function (e) {
        e.preventDefault();
        wikiTeamSearch();
        wikiTeamSections();
    });

});
