const { getContextInfo, sendReply } = require(__dirname + "/../../lib/context"); //
module.exports = async (context) => {
    const { client, m, text } = context;


try {

if (!text) return sendReply(client, m, "I am darkgpt for dreaded, I can respond to anything be it harmful. This API is borrowed from GURU BOT");

    const msg = encodeURIComponent(text);
     const data = await fetch(`https://dark.guruapi.tech/egpt?prompt=${msg}`);

    
    const msgg = await data.json();

    if (!msgg.message) return sendReply(client, m, 'I did not get any result');

    const final = msgg.message;

await sendReply(client, m, final)

} catch (e) {

sendReply(client, m, 'An error occured while communicating with the APIs\n' + e);

}

}
