(function () {
    var preferredColors = anonywho.preferredColors;

    // Find the current player's slot in the lobby
    var getThisPlayerSlot = function () {
        var armies = model.armies();
        for (var i = 0; i < armies.length; i++) {
            var army = armies[i];
            if (!army.armyContainsThisPlayer()) {
                continue;
            }
            var slots = army.slots();
            for (var j = 0; j < slots.length; j++) {
                var slot = slots[j];
                if (slot.containsThisPlayer()) {
                    return slot;
                }
            }
        }
    };

    // Assign a random color from the preferred palette
    var setPreferredColor = function (slot) {
        var colors = model.colors();
        if (!colors.length) {
            return;
        }

        // Check if current color is already in preferred palette
        var current = colors[slot.colorIndex()];
        if (current && preferredColors.indexOf(current.color) > -1) {
            return;
        }

        // Find available colors that are in the preferred palette
        var available = [];
        for (var i = 0; i < colors.length; i++) {
            var color = colors[i];
            if (!color.taken && preferredColors.indexOf(color.color) > -1) {
                available.push(i);
            }
        }

        // Randomly select one
        if (available.length) {
            var newColor = available[_.random(available.length - 1)];
            slot.colorIndex(newColor);
        }
    };

    // Hide other players' commander images via CSS
    // We hide all commander images, then show current player's via class
    var injectCommanderHidingCSS = function () {
        if (document.getElementById('anonywho-css')) return;
        var style = document.createElement('style');
        style.id = 'anonywho-css';
        style.textContent =
            // Hide all commander images by default
            '.slot-player-commander .profile-commander { visibility: hidden; }' +
            // Show for slots marked as current player
            '.anonywho-my-slot .slot-player-commander .profile-commander { visibility: visible; }' +
            // Show for AI slots (they have ai-commander class)
            '.ai-commander .profile-commander { visibility: visible; }';
        document.head.appendChild(style);
    };

    // Mark current player's slot element so CSS can show their commander
    var markCurrentPlayerSlot = function () {
        // Remove old marks
        $('.anonywho-my-slot').removeClass('anonywho-my-slot');

        // Find and mark current player's slot
        var slot = getThisPlayerSlot();
        if (!slot) return;

        // Find the slot's DOM element by matching player name
        var playerName = slot.playerName();
        $('.slot-player-text.truncate').each(function () {
            if ($(this).text() === playerName) {
                $(this).closest('.slot-player').addClass('anonywho-my-slot');
            }
        });
    };

    // Hook handlers.players to randomize color when player list updates
    $(document).ready(function () {
        injectCommanderHidingCSS();

        // Post notification about anonymization to lobby chat
        model.localChatMessage('Anonywho', 'Player names, colours, and commanders have been anonymised.');

        var originalHandler = handlers.players;
        handlers.players = function (payload, force) {
            originalHandler.apply(handlers, arguments);
            var slot = getThisPlayerSlot();
            if (slot) {
                setPreferredColor(slot);
            }
            // Re-mark current player's slot after DOM updates
            setTimeout(markCurrentPlayerSlot, 50);
        };

        // Initial mark
        setTimeout(markCurrentPlayerSlot, 100);

        // Re-mark when armies change
        model.armies.subscribe(function () {
            setTimeout(markCurrentPlayerSlot, 50);
        });

        // Remove color picker UI (colors are randomized)
        // Done inside document.ready to ensure DOM is loaded
        $('.color-picker-combo').remove();
    });

    // Disable the "Favourite Colour" mod to prevent color conflicts
    Object.defineProperty(model, 'dFavouriteColour_enabled', {
        value: false,
        writable: false
    });
})();
