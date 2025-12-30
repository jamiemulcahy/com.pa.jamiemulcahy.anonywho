(function () {
    // Intercept chat messages to anonymize sender names
    var originalChatHandler = handlers.chat_message;
    handlers.chat_message = function (payload) {
        // Server messages don't have player names to anonymize
        if (payload.type !== "server" && payload.player_name) {
            // Spectators can see real names, players see "Anonymous"
            if (!model.spectatorChat()) {
                payload.player_name = "Anonymous";
            }
        }
        return originalChatHandler(payload);
    };
})();
