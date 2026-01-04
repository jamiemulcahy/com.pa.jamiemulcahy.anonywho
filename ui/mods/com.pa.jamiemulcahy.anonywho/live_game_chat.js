(function () {
    // Player name to ID mapping, built from player data
    var playerNameToId = {};

    // Query parent for player data to build name-to-id mapping
    function refreshPlayerMapping() {
        api.Panel.query(api.Panel.parentId, 'panel.invoke', ['playerData']).then(function (playerData) {
            if (playerData && playerData.players) {
                playerNameToId = {};
                _.forEach(playerData.players, function (player) {
                    if (player.name) {
                        playerNameToId[player.name] = player.id;
                    }
                });
            }
        });
    }

    // Refresh mapping on setup and periodically
    $(document).ready(function () {
        refreshPlayerMapping();
        // Refresh periodically in case players join/leave
        setInterval(refreshPlayerMapping, 5000);
    });

    // Handle player data updates from parent
    handlers.player_data = function (payload) {
        if (payload && payload.players) {
            playerNameToId = {};
            _.forEach(payload.players, function (player) {
                if (player.name) {
                    playerNameToId[player.name] = player.id;
                }
            });
        }
    };

    // Get anonymized name for a player
    function getAnonymizedName(playerName) {
        var playerId = playerNameToId[playerName];
        if (playerId !== undefined) {
            return "Anonymous " + anonywho.getAnimalAlias(playerId);
        }
        // Fallback if player not found in mapping
        return "Anonymous";
    }

    // Intercept chat messages to anonymize sender names
    var originalChatHandler = handlers.chat_message;
    handlers.chat_message = function (payload) {
        // Anonymize player name for non-spectators
        // This covers both regular chat and server messages (disconnect/reconnect)
        // Server messages embed player_name into the message via loc()
        if (payload.player_name && !model.spectatorChat()) {
            payload.player_name = getAnonymizedName(payload.player_name);
        }
        return originalChatHandler(payload);
    };
})();
