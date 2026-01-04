(function () {
    // Player name to ID mapping, built from player data
    var playerNameToId = {};

    // Build mapping from playerData structure (parallel arrays: names[], ids[])
    function buildMappingFromPlayerData(playerData) {
        if (playerData && playerData.names && playerData.ids) {
            playerNameToId = {};
            for (var i = 0; i < playerData.names.length; i++) {
                playerNameToId[playerData.names[i]] = playerData.ids[i];
            }
        }
    }

    // Query parent for player data to build name-to-id mapping
    function refreshPlayerMapping() {
        api.Panel.query(api.Panel.parentId, 'panel.invoke', ['playerData']).then(function (playerData) {
            buildMappingFromPlayerData(playerData);
        });
    }

    // Refresh mapping on setup and periodically
    $(document).ready(function () {
        refreshPlayerMapping();
        // Refresh periodically in case players join/leave
        setInterval(refreshPlayerMapping, 5000);
    });

    // Handle player data updates from parent (format: { playerData: { names: [], ids: [] } })
    handlers.player_data = function (payload) {
        if (payload && payload.playerData) {
            buildMappingFromPlayerData(payload.playerData);
        } else {
            buildMappingFromPlayerData(payload);
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
