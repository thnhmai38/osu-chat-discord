<h1 align="center">
  osu-chat-discord
</h1><p align="center">Fetch messages from osu!Bancho Chat and send it to Discord channel</p>

<p align="center">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/thanhgaming5550/osu-chat-discord">
    <img alt="GitHub" src="https://img.shields.io/github/license/thanhgaming5550/osu-chat-discord">
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/thanhgaming5550/osu-chat-discord">
</p>

## Requirements:
* [Node.js](https://nodejs.org/) >=16.6.0 (*with npm*)

## Usage:

1. Run `git clone https://github.com/thanhgaming5550/osu-chat-discord.git` or manually download and extract the repository.

2. Run `npm install`

3. Create a `.env` file and write the following contents:
```env
TOKEN= #Your Discord Bot Token
NAME= #osu username (IRC)
IRC= #IRC Password
```
*In order to obtain IRC keys, please visit [this website](https://osu.ppy.sh/p/irc)*

4. In `config/channel.json`, configure as follows:
```cfg
{
    "channel": { 
        "enabled": true, #Look for messages on channels
        "channels": { #Send to what Discord Channel
            "#name_of_Osu_channel": ["DiscordChannelID1", "DiscordChannelID2"],
            ...
        }
    },
    "pm": { 
        "enabled": true, #Look for PM (of those who connect via IRC)
        "channels": ["DiscordChannelID3", "DiscordChannelID4",...],  #Send to what Discord Channel
        ...
    } 
}

```

5. Run `node index.js`

## Customization:
You can customizate the output in `config/language.json`