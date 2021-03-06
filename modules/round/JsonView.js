var async = require('async');
var { gameJson } = require('../game/JsonView');

module.exports = function JsonView(
  getSocketStatus) {

  var commonPlayerJson = (g, p, user) => ({
    side: p.side
  });
  
  this.playerJson = (pov, apiVersion, playerUser) =>
  async.parallel({
    socket: (cb) => getSocketStatus(pov.gameId).then(cb.bind(null, null))
  }).then(({socket}) =>
    ({
      game: gameJson(pov.game),
      player: {...commonPlayerJson(pov.game, pov.player, playerUser), ... {
        id: pov.playerId,
        version: socket.version
      }},
      url: {
        socket: `/${pov.fullId}/socket/v${apiVersion}`,
        round: `/${pov.fullId}`
      }
    }));
};
