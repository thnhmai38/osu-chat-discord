//Setup Client
require("dotenv").config();
const Discord = require("discord.js");
const Mustache = require('mustache');
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const Banchojs = require("bancho.js");
const osu = new Banchojs.BanchoClient({
    username: process.env.NAME,
    password: process.env.IRC,
});
Mustache.escape = (value) => {return value}; //For Escape HTML Char Code

//Save Configuration
const config = require("./config/channel.json")
const channelConfiguration = config.channel;
const pmConfiguration = config.pm;
const language = require("./config/language.json");

//? Sub-Function
function rawProcessing(message, osuChannel) {
    if (!osuChannel) osuChannel="PM";
    let isAction=false;
    if (message.message.indexOf(`ACTION`) === 0) isAction=true;
    return {
        isAction: isAction,
        data: {
            user: message.user.ircUsername,
            content: (isAction ? message.message.replace(`ACTION`, ``).slice(0, -1) : message.message),
            channel: osuChannel
        }
    };
}

//? Main-Function
async function pm() {
    osu.on("PM", (message) => {
        let msg = rawProcessing(message);
        console.log(Mustache.render(msg.isAction ? language.log.pm.action : language.log.pm.normal, msg.data));
        for (const discordChannel of pmConfiguration.channels) 
            client.channels.cache.get(discordChannel).send(
                Mustache.render(msg.isAction ? language.message.pm.action : language.message.pm.normal, msg.data)
            ).catch((err) => {
                console.error(Mustache.render(language.discordUnableMessage, {channel: discordChannel, err: err}));
            });;
    })
    console.log(language.pmEnabled)
}
async function channel() {
    for (const osuChannel in channelConfiguration.channels) {
        let channelInstance = osu.getChannel(osuChannel);
        try {
            await channelInstance.join().then(() => {
                console.log(Mustache.render(language.osuChannelConnected, {channel: osuChannel}))
            });
        } 
        catch {
            console.log(Mustache.render(language.osuChannelUnable, {channel: osuChannel}));
            continue;
        }

        channelInstance.on("message", (message) => {
            for (const discordChannel of channelConfiguration.channels[osuChannel])
            {
                let msg = rawProcessing(message, osuChannel)
                console.log(Mustache.render(msg.isAction ? language.log.channel.action : language.log.channel.normal, msg.data));
                client.channels.cache.get(discordChannel).send(
                    Mustache.render(msg.isAction ? language.message.channel.action : language.message.channel.normal, msg.data)
                ).catch((err) => {
                    console.error(Mustache.render(language.discordUnableMessage, {channel: discordChannel, err: err}));
                });
            }
        })
    }
}


//Main Process
client.on("error", console.error);
client.on('ready', async () => {
    try {
        await osu.connect().then(() => {
            console.log(Mustache.render(language.onConnected, {name: process.env.NAME}));
        })
    } catch {
        console.error(Mustache.render(language.osuChannelUnable, {err: err}))
    }
   
    console.log(language.line);
        if (pmConfiguration.enabled)  await pm(); else console.log(language.pmDisabled)
        if (channelConfiguration.enabled) await channel(); else console.log(language.channelDisabled);
    console.log(language.line);

    client.user.setActivity(`osu!`, {type: "PLAYING"})
    console.log(Mustache.render(language.onReady, {name: client.user.tag}));
})

client.login(process.env.TOKEN).then(() => {
    client.user.setPresence({status: 'online',});
    console.log(Mustache.render(language.onLogged, {name: client.user.tag}));
});

process.on('uncaughtException', (err) => console.error(err));