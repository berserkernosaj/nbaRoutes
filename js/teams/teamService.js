var app = angular.module('nbaRoutes');

app.service('teamService', function ($http, $q) {
  this.addNewGame = function(gameObject) {
    var url = "https://api.parse.com/1/classes/" + gameObject.homeTeam;
    if (parseInt(gameObject.homeTeamScore) > parseInt(gameObject.opponentScore)) {
      gameObject.won = true;
    }
    else{
      gameObject.won = false;
    }
    return $http({
      method: "POST",
      url: url,
      data: gameObject
    })
  }

  this.getTeamData = function(team) {
          var url = 'https://api.parse.com/1/classes/' + team;
    var later = $q.defer();
      $http({
        method: "GET",
        url: url
      }).then(function(data){
        var results = data.data.results;
        var wins = 0;
        var losses = 0;
        for (var i = 0; i < results.length; i++){
          if (results[i].won) {
            wins = wins + 1;
          }
          else {
            losses = losses + 1;
          }
        }
        results.wins = wins;
        results.losses = losses;
        later.resolve(results);
      })

    return later.promise;
  }


    // service code

});
