module.exports = async (context) => {
  const { client, m, prefix } = context; // Destructure 'm' and 'prefix' properly

  // Define the message content
  let p = `

  @${m.sender.split('@')[0]}
 Testing...
  `;

  // Define the image URL
  let imagePath = 'https://files.catbox.moe/2gegza.jpg';

  // Define the buttons
  const buttons = [
    {
      buttonId: `${prefix}support`, // Corrected buttonId with proper interpolation
      buttonText: { displayText: "Support" },
    },
    {
      buttonId: `${prefix}repo`, // Corrected buttonId with proper interpolation
      buttonText: { displayText: "Repo" },
    },
    {
      buttonId: `${prefix}ping`, // Corrected buttonId with proper interpolation
      buttonText: { displayText: "Speed" },
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
                  title: "MD",
                  description: "Regards Keith",
                  id: `${prefix}menu`, // Corrected buttonId with proper interpolation
                },
                {
                  header: "KEITH MD",
                  title: "Appreciation",
                  description: "Regards to the owner",
                  id: `${prefix}speed`, // Corrected buttonId with proper interpolation
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
    footer: "© Keith\n",
    headerType: 1,
    buttons: buttons,
    viewOnce: true,
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363266249040649@newsletter',
        newsletterName: 'Keith Support',
      },
      externalAdReply: {
        title: "Keith Testing",
        body: "Keith",
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
