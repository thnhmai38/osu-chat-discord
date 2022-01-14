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
console.log('=========================================================================================================');

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
            console.log("Loading PM")
            osu.on("PM", (message) => {
                for (let i = 0; i < pm.length; i++) {
                    client.channels.cache.get(pm[i].channel.toString()).send(`**${message.user.ircUsername}**: ${message.message}`);
                    console.log(`[PM] ${message.user.ircUsername}: ${message.message}`);
                }
            })
        } else console.log("Không có phần gửi tin nhắn từ PM osu")

        if (channelsync.length > 0) {
            console.log("Loading Channel chat")
            var channel = new Array;
            for (let i = 0; i < channelsync.length; i++) {
                if (channel.indexOf(channelsync[i].osucnn) == -1) {
                    channel.push(channelsync[i].osucnn)
                }
            }
            for (let j = 0; j < channel.length; j++) {
                osu.on(channel[j], (message) => {
                    console.log("KNOWN")
                    for (let i = 0; i < channelsync.length; i++) {
                        if (channelsync[i].osucnn === channel[j]) {
                            console.log(`${channelsync[i].osucnn}: ${message.user.ircUsername}: ${message.message}`)
                            client.channels.cache.get(channelsync[i].channel).send(`[${channelsync[i].osucnn}] ${message.user.ircUsername}: ${message.message}`);
                        }
                    }
                })
                console.log("Đã kết nối tới " + channel[j])
            }
        }
    })
})

client.login(process.env.TOKEN).then((token) => {
    client.user.setPresence({
        status: 'online',
    });
    console.log(`Đã đăng nhập vào ${client.user.tag}`)
});

process.on('uncaughtException', function (err) {
    console.error(err);
});