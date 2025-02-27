/*
module.exports = async (context) => {
  const { client, m } = context;

  // Define the message content
  let p = `
Hi, I am an automated system (WhatsApp bot) created by Giddy Tennor. I am here to help you eliminate all your WhatsApp enemies.

My info:
 ▢ Bot Name: Silencer Crasher
 ▢ Status: Public
 ▢ Username: @${m.sender.split('@')[0]}
 ▢ Version: One
  `;

  // Define the image URL
  let imagePath = 'https://files.catbox.moe/2gegza.jpg';

  // Define the buttons
  const buttons = [
    {
      buttonId: ".owner",
      buttonText: { displayText: "𝗖𝗿𝗲𝗮𝘁𝗼𝗿" },
    },
    {
      buttonId: ".allmenu",
      buttonText: { displayText: "𝗙𝘂𝗹𝗹𝗺𝗲𝗻𝘂" },
    },
    {
      buttonId: ".sc",
      buttonText: { displayText: "𝗦𝗰𝗿𝗶𝗽𝘁" },
    },
  ];

  // Define the flow actions
  const flowActions = [
    {
      buttonId: "action",
      buttonText: { displayText: "Options" },
      type: 4,
      nativeFlowInfo: {
        name: "single_select",
        paramsJson: JSON.stringify({
          title: "MENU",
          sections: [
            {
              title: "Select The Menu",
              highlight_label: "",
              rows: [
                {
                  header: "Keith",
                  title: "md",
                  description: "𝐩𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 keith",
                  id: ".allmenu",
                },
                {
                  header: "𝐓𝐇𝐄 𝐓𝐄𝐀𝐌",
                  title: "𝗔𝗣𝗣𝗥𝗘𝗖𝗜𝗔𝗧𝗜𝗢𝗡",
                  description: "𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐆𝐢𝐝𝐝𝐲 𝐓𝐞𝐧𝐧𝐨𝐫",
                  id: ".tqto",
                },
              ],
            },
          ],
        }),
      },
      viewOnce: true,
    },
  ];

  // Define the button message
  const buttonMessage = {
    image: { url: imagePath },
    caption: p,
    footer: "© 𝗚𝗶𝗱𝗱𝘆 - 𝗧𝗲𝗻𝗻𝗼𝗿\n",
    headerType: 1,
    buttons: buttons,
    viewOnce: true,
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363357312070270@newsletter',
        newsletterName: '𝐒𝐈𝐋𝐄𝐍𝐂𝐄𝐑 𝐂𝐑𝐀𝐒𝐇𝐄𝐑',
      },
      externalAdReply: {
        title: "𝐒𝐈𝐋𝐄𝐍𝐂𝐄𝐑 𝐂𝐑𝐀𝐒𝐇𝐄𝐑 𝐕𝟏",
        body: "𝐒𝐢𝐥𝐞𝐧𝐜𝐞𝐫 𝐗",
        thumbnailUrl: `https://i.ibb.co/4gtvHh43/926730e26f20a018.jpg`,
        sourceUrl: "t.me/tennormodzcoder",
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  };

  // Add flow actions to the button message
  buttonMessage.buttons.push(...flowActions);

  // Send the message
  await client.sendMessage(m.key.remoteJid, buttonMessage);
};
*/
