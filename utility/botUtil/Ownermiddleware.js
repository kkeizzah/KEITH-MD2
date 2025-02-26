const { sendReply } = require(__dirname + "/../../lib/context"); // Import sendReply from context.js

const Ownermiddleware = async (context, next) => {
    const { m, isOwner, client } = context;

    // Check if the user is the owner
    if (!isOwner) {
        return sendReply(client, m, "You need owner privileges to execute this command."); // Use sendReply for text replies
    }

    // Proceed to the next function (main handler)
    await next();
};

module.exports = Ownermiddleware;
