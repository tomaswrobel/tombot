import packageJSON from "./package.json" with {type: "json"};
import Bot from "./src/bot.js";

console.log("Starting bot...");
new Bot().on("ready", client => {
    console.log(`${client.user.username} v${packageJSON.version} ready!`);
});