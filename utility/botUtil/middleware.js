const { sendReply } = require(__dirname + "/../../lib/context");

const middleware = async (context, next) => {
    const { m, client } = context;
    
    // Ensure that the message is from a group
    if (!m.isGroup) {
        return sendReply(client, m, "This command is meant for groups.");
    }

    // Get the participants who are admins (either 'admin' or 'superadmin')
    const groupAdmins = m.chat.groupMetadata.participants
        .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
        .map(p => p.id);

    const botNumber = client.user.jid;

    // Check if the bot is an admin in the group
    const isBotAdmin = groupAdmins.includes(botNumber);

    // Check if the sender is an admin in the group
    const isSenderAdmin = groupAdmins.includes(m.sender);

    // Check if the sender has admin privileges
    if (!isSenderAdmin) {
        return sendReply(client, m, "You need admin privileges to use this command.");
    }

    // Check if the bot has admin privileges
    if (!isBotAdmin) {
        return sendReply(client, m, "I need admin privileges to execute this command.");
    }

    // Proceed with the next middleware or command handler
    await next();
};

module.exports = middleware;
