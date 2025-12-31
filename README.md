# Anonywho

An anonymity mod for **Planetary Annihilation: Titans** that hides player identities during matches.

## Features

- **Anonymous Names** - Players appear as animal aliases (e.g., "Anonymous Badger")
- **Hidden Colors** - Other players' colors are masked until the game ends
- **Secret Commander Selection** - Choose your commander without revealing it to others
- **Chat Anonymization** - Player names hidden in chat messages
- **Alert Anonymization** - System alerts (disconnects, defeats) use anonymous names
- **Team Game Support** - Works in both FFA and team formats

## Installation

1. Download the latest release
2. Extract to your PA Titans mods folder:
   - Windows: `%LOCALAPPDATA%\Uber Entertainment\Planetary Annihilation\mods\`
   - Linux: `~/.local/Uber Entertainment/Planetary Annihilation/mods/`
   - macOS: `~/Library/Application Support/Uber Entertainment/Planetary Annihilation/mods/`
3. Enable the mod in Community Mods

## Usage

Once enabled, the mod automatically:
- Assigns random animal aliases to all players
- Hides player colors in the lobby (you can still see your own)
- Anonymizes chat and system messages
- Shuffles player display order

Spectators can see real names alongside aliases.

## Compatibility

- Planetary Annihilation: Titans (required)
- Works with all factions: MLA, Legion, Exiles
- Compatible with most UI mods

## Development Setup

### VS Code Configuration

To sync the mod to your PA mods folder, add this to your **VS Code User Settings** (Ctrl+Shift+P → "Preferences: Open User Settings (JSON)"):

```json
{
  "anonywho.paModsPath": "C:\\Users\\YourName\\AppData\\Local\\Uber Entertainment\\Planetary Annihilation Titans\\mods"
}
```

Common paths:
- **Windows**: `C:\Users\YourName\AppData\Local\Uber Entertainment\Planetary Annihilation Titans\mods`
- **Linux**: `~/.local/Uber Entertainment/Planetary Annihilation Titans/mods`
- **macOS**: `~/Library/Application Support/Uber Entertainment/Planetary Annihilation Titans/mods`

### Syncing to Game

Run the **"Sync mod to PA"** task (Ctrl+Shift+B or Terminal → Run Task) to copy mod files to your PA installation.

## Credits

This mod combines and improves upon:

- **[Masquerade](https://forums.uberent.com/threads/masquerade.72838/)** by N30N
  - Random color assignment from curated palette
  - Chat anonymization
  - Faction-based commander selection

- **[Anonymous Army Mod](https://forums.planetaryannihilation.com/threads/anonymous-army-mod.73302/)** by Kamesuta (Team Fruit)
  - Animal alias naming system (74 animals)
  - Hash-based player shuffling
  - Devmode/sandbox anonymization

Special thanks to these authors for their original work!

## License

MIT License - See LICENSE file for details
