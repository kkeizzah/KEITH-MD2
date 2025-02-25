const speed = require("performance-now");

function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loading(m, client) {
  const lod = [
    "💜",
    "♥️",
    "💖",
    "🖤",
    "💙",
    "💚"
  ];

  // Send the initial loading message
  let { key } = await client.sendMessage(m.chat, { text: 'Loading Please Wait' });

  // Run the loading animation
  for (let i = 0; i < lod.length; i++) {
    await client.sendMessage(m.chat, { text: lod[i], edit: key });
    await delay(500); // Adjust the speed of the animation here
  }

  // Delete the loading message after the animation is complete
  await client.deleteMessage(m.chat, key);
}

module.exports = async (context) => {
  const { client, m } = context;

  // Measure the speed
  const timestamp = speed();
  const Keithspeed = speed() - timestamp;

  // Prepare the quoted message
  let fgg = {
    key: { fromMe: false, participant: `0@s.whatsapp.net`, remoteJid: 'status@broadcast' },
    message: {
      contactMessage: {
        displayName: `Keith`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:Keith\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  };

  // Send the ping message immediately
  await client.sendMessage(m.chat, { text: `${Keithspeed.toFixed(4)} m/s..` }, { quoted: fgg });

  // Start loading animation after sending the ping
  await loading(m, client);

  try {
    // If there are any errors, catch and log them
  } catch (error) {
    console.error("Error sending message:", error);
    m.reply('An error occurred while sending the message.');
  }
};
