const { DateTime } = require('luxon');
const fs = require('fs');

module.exports = async (context) => {
    const { client, m, totalCommands, mode, botname, prefix } = context;

    try {
        const categories = [
            { name: 'AI', emoji: '」' },
            { name: 'General', emoji: '」' },
            { name: 'Media', emoji: '」' },
            { name: 'Search', emoji: '」' },
            { name: 'Editting', emoji: '」' },
            { name: 'Groups', emoji: '」' },
            { name: 'Fun', emoji: '」' },
            { name: 'Owner', emoji: '」' },
            { name: 'Logo', emoji: '」' },
            { name: 'Coding', emoji: '」' },
            { name: 'Stalk', emoji: '」' }
        ];

        // Get greeting based on the time of day
        const getGreeting = () => {
            const currentHour = DateTime.now().setZone('Africa/Nairobi').hour;

            if (currentHour >= 5 && currentHour < 12) {
                return 'Good morning 🌄';
            } else if (currentHour >= 12 && currentHour < 18) {
                return 'Good afternoon ☀️';
            } else if (currentHour >= 18 && currentHour < 22) {
                return 'Good evening 🌆';
            } else {
                return 'Good night 😴';
            }
        };

        // Get current time in Nairobi
        const getCurrentTimeInNairobi = () => {
            return DateTime.now().setZone('Africa/Nairobi').toLocaleString(DateTime.TIME_SIMPLE);
        };

        let menuText = `╰►Hey, ${getGreeting()},\n\n`;

        // General information about the bot and user
        menuText += `╭━━━  ⟮  ${botname} ⟯━━━━━━┈⊷\n`;
        menuText += `┃✵╭──────────────\n`; 
        menuText += `┃✵│ ᴄᴏᴍᴍᴀɴᴅᴇʀ: ${m.pushName}\n`; 
        menuText += `┃✵│ ᴛᴏᴛᴀʟ ᴘʟᴜɢɪɴs: ${totalCommands}\n`;
        menuText += '┃✵│ ᴛɪᴍᴇ: ' + getCurrentTimeInNairobi() + '\n';
        menuText += `┃✵│ ᴘʀᴇғɪx: ${prefix}\n`;
        menuText += `┃✵│ ᴍᴏᴅᴇ: ${mode}\n`;
        menuText += '┃✵│ ʟɪʙʀᴀʀʏ: Baileys\n';
        menuText += '┃✵╰──────────────\n';
        menuText += '╰━━━━━━━━━━━━━━━━━━┈⊷\n';

        menuText += '━━━━━━━━━━━━━━━━━━━━\n';
        menuText += '*┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃𒊹┃:*\n\n';

        // Function to convert text to fancy uppercase font
        const toFancyUppercaseFont = (text) => {
            const fonts = {
                'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
                'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
            };
            return text.split('').map(char => fonts[char] || char).join('');
        };

        // Function to convert text to fancy lowercase font
        const toFancyLowercaseFont = (text) => {
            const fonts = {
                'a':'𝚊','b':'𝚋','c':'𝚌','d':'𝚍','e':'𝚎','f':'𝚏','g':'𝚐','h':'𝚑','i':'𝚒','j':'𝚓','k':'𝚔','l':'𝚕','m':'𝚖','n':'𝚗','o':'𝚘','p':'𝚙','q':'𝚚','r':'𝚛','s':'𝚜','t':'𝚝','u':'𝚞','v':'𝚟','w':'𝚠','x':'𝚡','y':'𝚢','z':'𝚣'
            };
            return text.split('').map(char => fonts[char] || char).join('');
        };

        // Loop through categories and commands
        for (const category of categories) {
            const commandFiles = fs.readdirSync(`./Cmds/${category.name}`).filter((file) => file.endsWith('.js'));

            const fancyCategory = toFancyUppercaseFont(category.name.toUpperCase());

            menuText += ` ╭─────「 ${fancyCategory} ${category.emoji}───┈⊷ \n`;
            for (const file of commandFiles) {
                const commandName = file.replace('.js', '');
                const fancyCommandName = toFancyLowercaseFont(commandName);
                menuText += ` ││◦➛  ${fancyCommandName}\n`;
            }

            menuText += ' ╰──────────────┈⊷ \n';
        }

        // Send the generated menu to the user
        try {
            await client.sendMessage(m.chat, {
                text: menuText,
                contextInfo: {
                    mentionedJid: [m.sender], // Mention the sender (use m.sender for a valid user reference)
                    externalAdReply: {
                        title: "🌟 𝐊𝐄𝐈𝐓𝐇-𝐌𝐃 ✨",
                        body: "𝐫𝐞𝐠𝐚𝐫𝐝𝐬 𝐊𝐞𝐢𝐭𝐡𝐤𝐞𝐢𝐳𝐳𝐚𝐡",
                        thumbnailUrl: "https://i.imgur.com/v9gJCSD.jpeg",
                        sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            });
        } catch (error) {
            console.error("Error sending message:", error);
            m.reply('An error occurred while sending the menu.');
        }

    } catch (error) {
        console.error("Error:", error);
        m.reply('An unexpected error occurred while generating the menu.');
    }
};
module.exports.description = "Interact with ChatGPT and get a response from the AI.";
module.exports.aliases = ["list", "help", "pannel"];
module.exports.reaction = "⚔️"; 
