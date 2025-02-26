const events = process.env.EVENTS || 'false';
const botname = process.env.BOTNAME || 'KEITH-MD';
const { sendReply, sendMediaMessage } = require(__dirname + "/../../lib/context"); // Import functions from context.js

const Events = async (client, keizzah) => {
    const Myself = await client.decodeJid(client.user.id);

    try {
        let metadata = await client.groupMetadata(keizzah.id);
        let participants = keizzah.participants;
        let desc = metadata.desc || "No Description";
        let groupMembersCount = metadata.participants.length; // Get the total number of group members

        for (let num of participants) {
            let dpuser;

            try {
                dpuser = await client.profilePictureUrl(num, "image");
            } catch {
                dpuser = "https://i.imgur.com/iEWHnOH.jpeg";
            }

            if (keizzah.action === "add") {
                let userName = num;

                let Welcometext = `Hey @${userName.split("@")[0]} 👋\n\nWelcome to ${metadata.subject}.\n\nYou are now ${groupMembersCount} members in this group.\n\nPlease read the group description to avoid being removed:\n${desc}\n\n*Regards keithkeizzah*.\n\nPowered by ${botname}.`;
                if (events === 'true') {
                    await sendMediaMessage(client, keizzah, {
                        image: { url: dpuser },
                        caption: Welcometext,
                        mentions: [num],
                    });
                }
            } else if (keizzah.action === "remove") {
                let userName2 = num;

                let Lefttext = `Goodbye to @${userName2.split("@")[0]}! You will be remembered. We are now ${groupMembersCount} members in this group.`;
                if (events === 'true') {
                    await sendMediaMessage(client, keizzah, {
                        image: { url: dpuser },
                        caption: Lefttext,
                        mentions: [num],
                    });
                }
            } else if (keizzah.action === "demote" && events === 'true') {
                await sendReply(client, keizzah, `@${(keizzah.author).split("@")[0]}, has demoted @${(keizzah.participants[0]).split("@")[0]} from admin 👀`, {
                    mentions: [keizzah.author, keizzah.participants[0]]
                });
            } else if (keizzah.action === "promote" && events === 'true') {
                await sendReply(client, keizzah, `@${(keizzah.author).split("@")[0]} has promoted @${(keizzah.participants[0]).split("@")[0]} to admin. 👀`, {
                    mentions: [keizzah.author, keizzah.participants[0]]
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = Events;
