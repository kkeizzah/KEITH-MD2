const { sendReply } = require(__dirname + "/../../lib/context"); 

const middleware = async (context, next) => {
    const { m, client, isAdmin, isBotAdmin } = context;

    
    if (!m.isGroup) {
        return sendReply(client, m, "This command is meant for groups"); 
    }

    
    if (!isAdmin) {
        return sendReply(client, m, "You need admin privileges is admins"); 
    }

    
    if (!isBotAdmin) {
        return sendReply(client, m, "I need admin privileges is bot admin"); 
    }

    
    await next();
};

module.exports = middleware;
