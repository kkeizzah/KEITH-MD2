const speed = require("performance-now");

function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loading(m, client) {
  const lod = [
    "⬛⬛⬜⬜⬜⬜⬛⬛꧁20%꧂",
    "⬛⬛⬛⬛⬜⬜⬜⬜꧁40%꧂",
    "⬜⬜⬛⬛⬛⬛⬜⬜꧁60%꧂",
    "⬜⬜⬜⬜⬛⬛⬛⬛꧁80%꧂",
    "⬛⬛⬜⬜⬜⬜⬛⬛꧁100%꧂",
    "*L҉O҉A҉D҉I҉N҉G҉ D҉O҉N҉E҉ ᵗʱᵃᵑᵏᵧₒᵤ ⚔️🗡️*"
  ];

  let { key } = await client.sendMessage(m.chat, { text: 'Loading Please Wait' });

  // Run the loading animation without blocking the main code
  for (let i = 0; i < lod.length; i++) {
    await client.sendMessage(m.chat, { text: lod[i], edit: key });
    await delay(500); // Adjust the speed of the animation here
  }
}

module.exports = async (context) => {
  const { client, m } = context;

  // Immediately send the ping message before the loading animation
  const timestamp = speed();
  const Keithspeed = speed() - timestamp;

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
