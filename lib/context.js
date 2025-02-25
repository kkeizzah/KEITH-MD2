// context.js
module.exports = (m) => {
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
};
