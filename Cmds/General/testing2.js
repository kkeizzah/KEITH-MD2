
module.exports = async (context) => {
  const { client, m } = context;

  // Define the message content
  let p = `
Hi, I am an automated system (WhatsApp bot) . I am here to help you eliminate all your WhatsApp enemies.

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
      buttonId: ".support",
      buttonText: { displayText: "support" },
    },
    {
      buttonId: ".repo",
      buttonText: { displayText: "repo" },
    },
    {
      buttonId: ".ping",
      buttonText: { displayText: "speed" },
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
                  description: "regards keith",
                  id: ".menu",
                },
                {
                  header: "KEITH MD",
                  title: "Appreciation",
                  description: "regards to the owner",
                  id: ".speed",
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
    footer: "© keith\n",
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
        title: "Keith testing ",
        body: "keith",
        thumbnailUrl: `https://files.catbox.moe/12t71b.jpg`,
        sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
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
