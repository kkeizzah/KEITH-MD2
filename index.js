const {
  default: KeithConnect,
  useMultiFileAuthState,
  DisconnectReason,
  makeInMemoryStore,
  downloadContentFromMessage,
  jidDecode,
  proto,
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const FileType = require("file-type");
const { exec } = require("child_process");
const chalk = require("chalk");
const express = require("express");
const { DateTime } = require("luxon");
const util = require("util");
const speed = require("performance-now");

const {
  smsg, formatp, tanggal, formatDate, getTime, sleep, clockString,
  fetchJson, getBuffer, jsonformat, generateProfilePicture, parseMention,
  getRandom, fetchBuffer,
} = require("./lib/botFunctions.js");

const { TelegraPh, UploadFileUgu } = require("./lib/toUrl");
const uploadtoimgur = require("./lib/Imgur");
const ytmp3 = require("./lib/ytmp3");
const path = require("path");
const { commands, totalCommands } = require("./commandHandler");

const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require("./lib/exif");
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });

const authenticationn = require("./auth.js");
const daddy = "254748387615@s.whatsapp.net";

const {
  autoview, autoread, botname, autobio, mode, prefix, presence,
  mycode, author, packname, dev, gcpresence, antionce, antitag, antidelete, autolike,
} = require("./settings");

const groupEvents = require("./groupEvents.js");

authenticationn();

const app = express();
const port = process.env.PORT || 10000;

async function startKeith() {
  const { saveCreds, state } = await useMultiFileAuthState("session");
  const client = KeithConnect({
    logger: pino({ level: "silent" }),
    printQRInTerminal: true,
    version: [2, 3000, 1015901307],
    browser: ["KEITH-MD", "Safari", "3.0"],
    fireInitQueries: false,
    shouldSyncHistoryMessage: true,
    downloadHistory: true,
    syncFullHistory: true,
    generateHighQualityLinkPreview: true,
    markOnlineOnConnect: true,
    keepAliveIntervalMs: 30000,
    auth: state,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id);
        return msg.message || undefined;
      }
      return { conversation: "HERE" };
    },
  });

  store.bind(client.ev);

  if (autobio === "true") {
    setInterval(() => {
      const date = new Date();
      client.updateProfileStatus(
        `${botname} is active 24/7\n\n${date.toLocaleString("en-US", { timeZone: "Africa/Nairobi" })} It's a ${date.toLocaleString("en-US", { weekday: "long", timeZone: "Africa/Nairobi" })}.`
      );
    }, 10 * 1000);
  }

  client.ev.on("messages.upsert", async (chatUpdate) => {
    try {
      const mek = chatUpdate.messages[0];
      if (!mek.message) return;
      mek.message = mek.message.ephemeralMessage?.message || mek.message;

      if (autoview === "true" && autolike === "true" && mek.key?.remoteJid === "status@broadcast") {
        await client.sendMessage(mek.key.remoteJid, { react: { key: mek.key, text: "💎" } });
      }

      if (autoview === "true" && mek.key?.remoteJid === "status@broadcast") {
        await client.readMessages([mek.key]);
      } else if (autoread === "true" && mek.key?.remoteJid.endsWith("@s.whatsapp.net")) {
        await client.readMessages([mek.key]);
      }

      if (mek.key?.remoteJid.endsWith("@s.whatsapp.net")) {
        const presenceType = presence === "online" ? "available" : presence === "typing" ? "composing" : presence === "recording" ? "recording" : "unavailable";
        await client.sendPresenceUpdate(presenceType, mek.key.remoteJid);
      }

      if (!client.public && !mek.key.fromMe && chatUpdate.type === "notify") return;

      const m = smsg(client, mek, store);

      // Command Handler Logic
      const body = m.mtype === "conversation" ? m.message.conversation :
                   m.mtype === "imageMessage" ? m.message.imageMessage.caption :
                   m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text : "";

      const cmd = body.startsWith(prefix);
      const args = body.trim().split(/ +/).slice(1);
      const pushname = m.pushName || "No Name";
      const botNumber = await client.decodeJid(client.user.id);
      const itsMe = m.sender === botNumber;
      const text = args.join(" ");
      const isOwner = dev.split(",").map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender);
     
    const forbiddenLinkPattern = /https?:\/\/[^\s]+/;

// Check if the message contains any forbidden link, group settings allow link removal, and user is not admin
if (body && forbiddenLinkPattern.test(body) && m.isGroup && antilink === 'true' && !Owner && isBotAdmin && !isAdmin) {
    if (itsMe) return;  // Skip if the message is from the bot

    const kid = m.sender;

    // Notify the user that they are not allowed to send links
    await client.sendMessage(m.chat, {
        text: `🚫Antilink detected🚫\n\n@${kid.split("@")[0]}, do not send links!`,
        contextInfo: { mentionedJid: [kid] }
    }, { quoted: m });

    // Delete the offending message
    await client.sendMessage(m.chat, {
        delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: kid
        }
    });

    if (!isBotAdmin) {
        await client.sendMessage(m.chat, {
            text: `Please promote me to an admin to remove @${kid.split("@")[0]} for sharing link.`,
        });
    } else {
        await client.groupParticipantsUpdate(m.chat, [kid], 'remove');
    }
}

 
      
    if (cmd && mode === "private" && !itsMe && !isOwner && m.sender !== daddy) return;

    const command = cmd ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : null;
    if (command) {
      const commandObj = commands[command];
      if (commandObj) {
        await commandObj.execute({ client, m, text, args, isOwner, pushname, botNumber, itsMe, store });
      }
    }
  } catch (err) {
    console.error(err);
  }
});

      

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  });

  process.on("Something went wrong", (err) => {
    console.error("Caught exception:", err);
  });

  client.decodeJid = (jid) => {
    if (!jid) return jid;
    if (/:\d+@/gi.test(jid)) {
      const decode = jidDecode(jid) || {};
      return (decode.user && decode.server && decode.user + "@" + decode.server) || jid;
    }
    return jid;
  };

  client.getName = async (jid) => {
    const id = client.decodeJid(jid);
    if (id.endsWith("@g.us")) {
      const group = store.contacts[id] || (await client.groupMetadata(id)) || {};
      return group.name || group.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international");
    }
    const contact = store.contacts[id] || {};
    return contact.name || contact.subject || contact.verifiedName || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international");
  };

  client.public = true;
  client.serializeM = (m) => smsg(client, m, store);

  client.ev.on("group-participants.update", (m) => groupEvents(client, m));

  client.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      const reasons = {
        [DisconnectReason.badSession]: "Bad Session File, Please Delete Session and Scan Again",
        [DisconnectReason.connectionClosed]: "Connection closed, reconnecting...",
        [DisconnectReason.connectionLost]: "Connection Lost from Server, reconnecting...",
        [DisconnectReason.connectionReplaced]: "Connection Replaced, Another New Session Opened, Please Restart Bot",
        [DisconnectReason.loggedOut]: "Device Logged Out, Please Delete File creds.json and Scan Again",
        [DisconnectReason.restartRequired]: "Restart Required, Restarting...",
        [DisconnectReason.timedOut]: "Connection TimedOut, Reconnecting...",
      };
      console.log(reasons[reason] || `Unknown DisconnectReason: ${reason}`);
      if (reason === DisconnectReason.badSession || reason === DisconnectReason.connectionReplaced || reason === DisconnectReason.loggedOut) {
        process.exit();
      } else {
        startKeith();
      }
    } else if (connection === "open") {
      await client.groupAcceptInvite("DvXonepPp1XBPOYIBziTl1");
      console.log(`✅ Connection successful\nLoaded ${totalCommands} commands.\nBot is active.`);

      const getGreeting = () => {
        const currentHour = DateTime.now().setZone("Africa/Nairobi").hour;
        if (currentHour >= 5 && currentHour < 12) return "Good morning 🌄";
        if (currentHour >= 12 && currentHour < 18) return "Good afternoon ☀️";
        if (currentHour >= 18 && currentHour < 22) return "Good evening 🌆";
        return "Good night 😴";
      };

      const message = `Holla, ${getGreeting()},\n\n╭═══『𝐊𝐞𝐢𝐭𝐡 𝐌𝐝 𝐢𝐬 𝐜𝐨𝐧𝐧𝐞𝐜𝐭𝐞𝐝』══⊷ \n` +
        `║ ʙᴏᴛ ɴᴀᴍᴇ ${botname}\n` +
        `║ ᴍᴏᴅᴇ ${mode}\n` +
        `║ ᴘʀᴇғɪx [  ${prefix} ]\n` +
        `║ ᴛᴏᴛᴀʟ ᴘʟᴜɢɪɴs ${totalCommands}\n` +
        `║ ᴛɪᴍᴇ ${DateTime.now().setZone("Africa/Nairobi").toLocaleString(DateTime.TIME_SIMPLE)}\n` +
        `║ ʟɪʙʀᴀʀʏ Baileys\n` +
        `╰═════════════════⊷`;

      await client.sendMessage(client.user.id, { text: message });
    }
  });

  client.ev.on("creds.update", saveCreds);

  client.sendText = (jid, text, quoted = "", options) => client.sendMessage(jid, { text, ...options }, { quoted });

  client.downloadMediaMessage = async (message) => {
    const mime = (message.msg || message).mimetype || "";
    const messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
  };

  client.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    const quoted = message.msg || message;
    const mime = (message.msg || message).mimetype || "";
    const messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    const type = await FileType.fromBuffer(buffer);
    const trueFileName = attachExtension ? `${filename}.${type.ext}` : filename;
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  };
}

app.use(express.static("public"));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));

startKeith();

module.exports = startKeith;

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
