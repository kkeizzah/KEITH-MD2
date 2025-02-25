const { getContextInfo, sendReply } = require(__dirname + "/../../lib/context"); //
const { botname } = require(__dirname + "/../../settings");
module.exports = async (context) => {

const { client, m, text } = context;



try {
let cap = `Screenshot by ${botname}`

if (!text) return sendReply(client, m, "Provide a website link to screenshot.")

const image = `https://image.thum.io/get/fullpage/${text}`

await client.sendMessage(m.chat, { image: { url: image }, caption: cap}, {quoted: m });


} catch (error) {

sendReply(client, m, "An error occured.")

}

}
