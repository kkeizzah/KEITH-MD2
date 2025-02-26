
const { sendReply } = require(__dirname + "/../../lib/context");


const middleware = async (context, next) => {
    const { m, client } = context;

    const groupAdmin = m.isGroup ? m.chat.groupMetadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id) : [];
    const botNumber = client.user.jid;

    const isBotAdmins = m.isGroup ? groupAdmin.includes(botNumber) : false;
    const isAdmins = m.isGroup ? groupAdmin.includes(m.sender) : false;

   
    if (!m.isGroup) {
        return sendReply(client, m, "This command is meant for groups");
    }

    
    if (!isAdmins) {
        return sendReply(client, m, "You need admin privileges to use this command");
    }

    
    if (!isBotAdmins) {
        return sendReply(client, m, "I need admin privileges to execute this command");
    }

   
    await next();
};

module.exports = middleware;
