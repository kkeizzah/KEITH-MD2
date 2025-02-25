const speed = require("performance-now");

const getContextInfo = require(__dirname + "/../../lib/context");

module.exports = async (context) => {
    const { client, m } = context;

    // Get the current timestamp and calculate Keith's speed
    const timestamp = speed();
    const Keithspeed = speed() - timestamp;

    // Prepare the quoted message
    let quotedMessage = {
        key: { 
            fromMe: false, 
            participant: `0@s.whatsapp.net`, 
            remoteJid: 'status@broadcast' 
        },
        message: {
            contactMessage: {
                displayName: `Keith`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:Keith\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
            },
        },
    };

    try {
        // Get the contextInfo object dynamically
        const contextInfo = getContextInfo(m);

        // Send the message with the speed data and context info
        await client.sendMessage(m.chat, { 
            text: `𝖐𝖊𝖎𝖙𝖍 𝖘𝖕𝖊𝖊𝖉\n${Keithspeed.toFixed(4)} m/s`, 
            contextInfo: contextInfo // Use the imported contextInfo
        }, { quoted: quotedMessage }); // Attach the quoted message
    } catch (error) {
        console.error("Error sending message:", error);
        await client.sendMessage(m.chat, { text: 'An error occurred while sending the message.' });
    }
};
