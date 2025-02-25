// context.js
/*module.exports = {
    // Function to generate contextInfo
    getContextInfo: (m) => {
        return {
            mentionedJid: [m.sender], // Mention the sender
            forwardingScore: 999, // Indicates the message is forwarded
            isForwarded: true, // Marks the message as forwarded
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363266249040649@newsletter', // Newsletter ID
                newsletterName: 'Keith Support', // Newsletter name
                serverMessageId: 143 // Server message ID
            }
        };
    },

    // Function to send a reply with contextInfo
    sendReply: async (client, m, text) => {
        const contextInfo = module.exports.getContextInfo(m); // Generate contextInfo
        await client.sendMessage(m.chat, { 
            text: text, 
            contextInfo: contextInfo // Attach contextInfo
        }, { quoted: m }); // Quote the original message
    }
};*/
// context.js
module.exports = {
    // Function to generate contextInfo
    getContextInfo: (m) => {
        return {
            mentionedJid: [m.sender], // Mention the sender
            forwardingScore: 999, // Indicates the message is forwarded
            isForwarded: true, // Marks the message as forwarded
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363266249040649@newsletter', // Newsletter ID
                newsletterName: 'Keith Support', // Newsletter name
                serverMessageId: 143 // Server message ID
            }
        };
    },

    // Function to send a reply with contextInfo
    sendReply: async (client, m, text) => {
        const contextInfo = module.exports.getContextInfo(m); // Generate contextInfo
        await client.sendMessage(m.chat, { 
            text: text, 
            contextInfo: contextInfo // Attach contextInfo
        }, { quoted: m }); // Quote the original message
    },

    // Function to send a media message with contextInfo
    sendMediaMessage: async (client, m, options) => {
        const contextInfo = module.exports.getContextInfo(m); // Generate contextInfo
        await client.sendMessage(m.chat, { 
            ...options, 
            contextInfo: contextInfo // Attach contextInfo
        }, { quoted: m }); // Quote the original message
    }
};
