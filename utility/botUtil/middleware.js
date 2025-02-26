const { sendReply, sendMediaMessage } = require(__dirname + "/../../lib/context"); //.

const middleware = async (context, next) => {
    const { m, isBotAdmin, client, isAdmin, participants, botNumber } = context;

    // Get group admins if the message is from a group
    const groupAdmin = m.isGroup ? getGroupAdmins(participants) : [];
    const isBotAdmin = m.isGroup ? groupAdmin.includes(botNumber) : false;

    // Check if the message is from a group
    if (!m.isGroup) {
        return sendReply(client, m, "This command is meant for groups"); // Use sendReply for text replies
    }

    // Check if the user is an admin
    if (!isAdmin) {
        return sendReply(client, m, "You need admin privileges"); // Use sendReply for text replies
    }

    // Check if the bot is an admin
    if (!isBotAdmin) {
        return sendReply(client, m, "I need admin privileges"); // Use sendReply for text replies
    }

    // Proceed to the next function (main handler)
    await next();
};

module.exports = middleware;
