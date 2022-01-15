const Discord = require("discord.js");
const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES"]
});
require("dotenv").config();
const config = require("./config.json")
const channelsync = config.channel;
const pm = config.pm;
const Banchojs = require("bancho.js");
const osu = new Banchojs.BanchoClient({
    username: process.env.NAME,
    password: process.env.IRC,
});

client.on("error", console.error);

client.on('ready', () => {
    client.user.setActivity(`osu!`, {
        type: "PLAYING"
    })
    console.log(`${client.user.tag} đã sẵn sàng`);

    osu.connect().then(() => {
        console.log("Đã kết nối tới osu!Bancho (" + process.env.NAME + ")");
        console.log('=========================================================================================================');
        if (pm.length > 0) {
            osu.on("PM", (message) => {
                console.log(`[PM] ${message.user.ircUsername}: ${message.message}`);
                let msg;
                if (message.message.indexOf(`ACTION`) === 0) {
                    msg = `***${message.user.ircUsername}**` + message.message.replace(`ACTION`, ``).slice(0, -1);
                } else msg = `**${message.user.ircUsername}**: ${message.message}`
                for (let i = 0; i < pm.length; i++) {
                    client.channels.cache.get(pm[i].channel).send(msg);
                }
            })
            console.log("Đã kết nối tới PM chat")
        } else console.log("No PM chat Sync detected")

        if (channelsync.length > 0) {
            let channels = new Array;

            // Filter out duplicate channel from config file (why tho??)
            for (let channel of channelsync) {
                if (channels.indexOf(channel.osucnn) === -1) {
                    channels.push(channel.osucnn)
                }
            }

            for (let channel of channels) {
                let channelInstance = osu.getChannel(channel);

                channelInstance.join().then(() => {
                    channelInstance.on("message", (message) => {
                        for (let i = 0; i < channelsync.length; i++) {
                            if (channelsync[i].osucnn === channel) {
                                console.log(`[${channel}] ${message.user.ircUsername}: ${message.message}`)
                                let msg;
                                if (message.message.indexOf(`ACTION`) === 0) {
                                    msg = `***${message.user.ircUsername}**` + message.message.replace(`ACTION`, ``).slice(0, -1);
                                } else msg = `**${message.user.ircUsername}**: ${message.message}`
                                client.channels.cache.get(channelsync[i].channel).send(msg);

                                break;
                            }
                        }
                    })

                    console.log("Đã kết nối tới " + channel)
                })
            }
        } else console.log("No Channel chat Sync detected");
        console.log('=========================================================================================================');
    })
})
console.log('=========================================================================================================');

client.login(process.env.TOKEN).then((token) => {
    client.user.setPresence({
        status: 'online',
    });
    console.log(`Đã đăng nhập vào ${client.user.tag}`)
});

process.on('uncaughtException', function (err) {
    console.error(err);
});