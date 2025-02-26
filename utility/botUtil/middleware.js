const { sendReply } = require(__dirname + "/../../lib/context"); // Import sendReply from context.js

const middleware = async (context, next) => {
    const { m, client } = context;

    // Check if the message is from a group
    if (!m.isGroup) {
        return sendReply(client, m, "This command is meant for groups"); // Use sendReply for text replies
    }

    // Check if the user is an admin
    if (!m.isAdmin) {
        return sendReply(client, m, "You need admin privileges is admins"); // Use sendReply for text replies
    }

    // Check if the bot is an admin
    if (!m.isBotAdmin) {
        return sendReply(client, m, "I need admin privileges is bot admin"); // Use sendReply for text replies
    }

    // Proceed to the next function (main handler)
    await next();
};

module.exports = middleware;
