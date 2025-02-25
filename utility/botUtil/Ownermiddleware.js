

const Ownermiddleware = async (context, next) => {
    const { m, isOwner } = context;

    if (!isOwner) {
        return m.reply("You need owner privileges to execute this command.");
    }

    await next();
};

module.exports = Ownermiddleware;
