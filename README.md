<h1 align="center">
  osu-chat-discord
</h1>

<p align="center">
    <a href="https://lgtm.com/projects/g/thanhgaming5550/osu-chat-discord/alerts/"><img alt="Total alerts" src="https://img.shields.io/lgtm/alerts/g/thanhgaming5550/osu-chat-discord.svg?logo=lgtm&logoWidth=18"/></a>
    <a href="https://lgtm.com/projects/g/thanhgaming5550/osu-chat-discord/context:javascript"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/thanhgaming5550/osu-chat-discord.svg?logo=lgtm&logoWidth=18"/></a>
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/thanhgaming5550/osu-chat-discord">
    <img alt="GitHub" src="https://img.shields.io/github/license/thanhgaming5550/osu-chat-discord">
    <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/thanhgaming5550/osu-chat-discord">
</p>

## Requirements:
* [Node.js](https://nodejs.org/) >=16.6.0
* npm (bundled with Node.js)


## Usage:

1. Run `git clone https://github.com/thanhgaming5550/osu-chat-discord.git` or manually download and extract the repository. Navigate into that directory.

2. Run `npm install`

3. Create a `.env` file and write the following contents:
```env
TOKEN= #Your Discord Bot Token
NAME= #osu username (IRC)
IRC= #IRC Password
```
*In order to obtain IRC keys, please visit [this website](https://osu.ppy.sh/p/irc)*

4. In `config.json`, configure as follows:
```cfg
{
    "channel" : [ #Follow osu chat channels
        {  #Delete the curly braces {} if not in use
            "channel":"ID_Channel_To_Send",
            "osucnn":"osu_channel_name (containing #)"
        }#,....
    ], 
    "pm": [  #Follow PM chat (PM chat of those who connect via IRC)
        { #Delete the curly braces {} if not in use
            "channel": "ID_Channel_To_Send"
        }#,....
    ]
}
```

5. Run `node index.js`

## Extension:
- You can customize the display of message outputs on Discord according to your preferences by customizing it (for chat channels) on line 60 (for messages like /np, /me, etc.) [here](https://github.com/thanhgaming5550/osu-chat-discord/blob/5de753be2677b09b8b21af2f220b8b7ceb55ef8a/index.js#L60) and line 61 (for regular messages) [here](https://github.com/thanhgaming5550/osu-chat-discord/blob/5de753be2677b09b8b21af2f220b8b7ceb55ef8a/index.js#L61).

  **Where the variables are:** ```message.user.ircUsername``` is the sender's name, ```message.message.replace(`�ACTION`, ``).slice(0, -1)``` is the message content after processing **ACTION** (only for messages like /np, /me, etc.), ```message.message``` is the original message content, ```channel``` is the name of the channel where the message was sent on osu!Bancho.
  
  *Similarly for PM Chat, line 31 (for messages like /np, /me, etc.) [here](https://github.com/thanhgaming5550/osu-chat-discord/blob/5de753be2677b09b8b21af2f220b8b7ceb55ef8a/index.js#L31) and line 32 (for regular messages) [here](https://github.com/thanhgaming5550/osu-chat-discord/blob/5de753be2677b09b8b21af2f220b8b7ceb55ef8a/index.js#L32).
