// Footbal table creator and data made by Roi Sadika
// the app using the api from 'www.footbal-data.com' and parse info for the user

var footbalTableBody = $('#standing tbody');
var leagueTitle = $('#compt');


function getData(league){
    $.ajax({
        headers: { 'X-Auth-Token': 'put_here_the_api_token' }, 
        url: `http://api.football-data.org/v1/competitions/${league}/leagueTable`, 
        dataType: 'json',
        type: 'GET',
    }).done(function (response) {
        footbalHtmlTableCreator(response);
        }).fail(function () {
            console.error('Error...');
        });   
}


function footbalHtmlTableCreator(response) {

    var sortedRawTeamList = response.standing.sort(rankCompare);
    var htmlString = '';

    sortedRawTeamList.forEach( function(item, i) {
        htmlString += '<tr>';
        htmlString += `    
                        <td><strong>${i + 1}</strong> | <img src="${item.crestURI}" alt="${item.teamName}" onerror="this.onerror=null;this.src='https://image.flaticon.com/icons/svg/53/53283.svg';"></td>    
                        <td>${item.teamName}</td>
                        <td>${item.playedGames}</td>
                        <td>${item.wins}</td>
                        <td>${item.draws}</td>
                        <td>${item.losses}</td>
                        <td>${item.goals}-${item.goalsAgainst} (${item.goalDifference})</td>
                        <td>${item.points}</td>
                    </tr>
            `;
    });
    leagueTitle.text(response.leagueCaption); 
    footbalTableBody.html(htmlString); 
}

// rankCompare function is by the priority 
// first by points, if equal by goal difference, if also equal by goals count:
 
function rankCompare(x, y) {
    if (x.points !== y.points) {
        return y.points - x.points;
    } else {
        if (x.goalDifference !== y.goalDifference) {
            return y.goalDifference - x.goalDifference;
        } else {
            return y.goal - x.goal;
        }
    }
}


// Change the table by selecting other league with fade effects.

function leagueSelect() {
    var x = document.getElementById("league-selector").value;
    footbalTableBody.fadeOut('slow', function () {
        getData(x);
    });
    footbalTableBody.fadeIn(3000);
}



getData(456);
