# Anonywho - Implementation Plan

## Phase 1: Core Foundation

### 1.1 Project Setup
- [x] Create mod folder structure (`ui/mods/anonywho/`)
- [x] Create `modinfo.json` with scene declarations
- [x] Define shared utilities (animal list, shuffle function, hash function)

### 1.2 Name Anonymization
- [x] Implement animal alias assignment system (from AAM)
- [x] Hook `live_game_players.js` to replace player names
- [x] Hook `live_game_devmode.js` to anonymize sandbox viewer
- [x] Preserve real names for spectators and self

## Phase 2: Information Leak Fixes

### 2.1 Chat Anonymization
- [x] Hook `live_game_chat.js` to replace sender names
- [x] Ensure team chat still works correctly
- [x] Test with various chat message types

### 2.2 Alert Anonymization
- [x] Hook `live_game_unit_alert.js` for defeat messages
- [x] Identify and hook system alerts (disconnect/reconnect)
- [x] Test all alert scenarios

### 2.3 Cinematic Anonymization
- [x] Hook `new_game_cinematic.js` to hide names during intro
- [x] Shuffle player/team display order
- [x] Hide colors during cinematic

## Phase 3: Lobby Features

### 3.1 Color Handling
- [x] Hook `new_game.js` for lobby color randomization
- [x] Decided: random assignment from 10-color palette (Masquerade style)
- [x] Player sees their own randomized color (same as others see)
- [ ] Test color assignment persistence

### 3.2 Commander Selection
- [x] Research commander selection data flow
- [x] Implement hidden commander in lobby (wrap slot.commander())
- [x] All factions work - players pick freely, others see placeholder
- [x] Real commanders revealed at game start (cinematic)

## Phase 4: Polish

### 4.1 Player Order Shuffling
- [ ] Implement consistent hash-based ordering
- [ ] Shuffle within teams
- [ ] Shuffle team order (player's team always first)

### 4.2 Edge Cases
- [ ] Test with AI players
- [ ] Test with shared armies
- [ ] Test spectator mode thoroughly
- [ ] Test replay compatibility

### 4.3 Compatibility
- [ ] Test with Legion Expansion
- [ ] Test with common UI mods
- [x] Disable conflicting features (Favourite Colour mod)

## Technical Notes

### Files to Create
```
anonywho/
  modinfo.json
  ui/
    mods/
      anonywho/
        shared.js           # Common utilities
        new_game.js         # Lobby hooks
        new_game_cinematic.js
        live_game_players.js
        live_game_chat.js
        live_game_unit_alert.js
        live_game_devmode.js
```

### Key Patterns from Reference Mods

**Wrapping Observables (AAM style):**
```javascript
var originalValue = model.players;
model.players = ko.computed(function() {
    var players = originalValue();
    // Transform players...
    return players;
});
```

**Wrapping Handlers (Masquerade style):**
```javascript
var originalHandler = handlers.state;
handlers.state = function(payload) {
    // Modify payload...
    return originalHandler(payload);
};
```

**DOM Replacement (Masquerade style):**
```javascript
$(".selector").replaceWith('<!-- ko if: condition -->...');
```

### Testing Checklist
- [ ] Local 1v1 game
- [ ] FFA with 3+ players
- [ ] Team game (2v2 or larger)
- [ ] Game with spectators
- [ ] Game with AI players
- [ ] Replay viewing
- [ ] Non-headless server (headless can break lobby mods)
