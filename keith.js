const { generateWAMessageFromContent, proto, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const speed = require("performance-now");
const { smsg, formatp, tanggal, formatDate, getTime, sleep, clockString, fetchJson, getBuffer, jsonformat, generateProfilePicture, parseMention, getRandom, fetchBuffer } = require('./lib/botFunctions.js');
const { exec } = require("child_process");
const { TelegraPh, UploadFileUgu } = require("./lib/toUrl");
const uploadtoimgur = require('./lib/Imgur');
const ytmp3 = require('./lib/ytmp3');
const path = require('path');
const { commands } = require('./commandHandler');
const { presence, autoread, botname, mode, prefix, mycode, author, packname, dev, gcpresence, antionce, antitag, antidelete } = require('./settings');

const daddy = "254114018035@s.whatsapp.net";

module.exports = Keith = async (client, m, chatUpdate, store) => {
  try {
    const body = m.mtype === "conversation" ? m.message.conversation :
                 m.mtype === "imageMessage" ? m.message.imageMessage.caption :
                 m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text : "";

    const Tag = m.mtype === "extendedTextMessage" && m.message.extendedTextMessage.contextInfo ?
                m.message.extendedTextMessage.contextInfo.mentionedJid : [];

    const quotedMessage = m.message.extendedTextMessage?.contextInfo?.quotedMessage;
    const budy = typeof m.text === "string" ? m.text : "";
    const timestamp = speed();
    const Keithspeed = speed() - timestamp;

    const cmd = body.startsWith(prefix);
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await client.decodeJid(client.user.id);
    const itsMe = m.sender === botNumber;
    const text = args.join(" ");
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);

    const getGroupAdmins = (participants) => {
      return participants.filter(p => p.admin === "superadmin" || p.admin === "admin").map(p => p.id);
    };

    const quoted = m.quoted || m;
    const mime = (quoted.msg || quoted).mimetype || "";
    const qmsg = quoted.msg || quoted;

    const DevKeith = dev.split(",").map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
    const isOwner = DevKeith.includes(m.sender);

    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(() => {}) : null;
    const groupName = m.isGroup && groupMetadata ? groupMetadata.subject : "";
    const participants = m.isGroup && groupMetadata ? groupMetadata.participants : [];
    const groupAdmin = m.isGroup ? getGroupAdmins(participants) : [];
    const isBotAdmin = m.isGroup ? groupAdmin.includes(botNumber) : false;
    const isAdmin = m.isGroup ? groupAdmin.includes(m.sender) : false;
    const isGroup = m.chat?.endsWith("@g.us");

    const context = {
      client, m, text, isOwner, chatUpdate, store, isBotAdmin, isAdmin, isGroup, participants,
      pushname, body, budy, args, mime, qmsg, quotedMessage, botNumber, itsMe,
      packname, author, generateProfilePicture, groupMetadata, Keithspeed, mycode,
      fetchJson, exec, getRandom, UploadFileUgu, TelegraPh, prefix, cmd, botname, mode, gcpresence, antitag, antidelete, antionce, fetchBuffer, uploadtoimgur, ytmp3, getGroupAdmins, Tag
    };

    if (cmd && mode === 'private' && !itsMe && !isOwner && m.sender !== daddy) {
      return;
    }

    if (await blocked_users(client, m, cmd)) {
      await m.reply("You are blocked from using bot commands.");
      return;
    }

    const command = cmd ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : null;

    if (command && commands[command]) {
      await commands[command](context);
    }

  } catch (err) {
    console.error(util.format(err));
  }

  process.on('uncaughtException', (err) => {
    const e = String(err);
    if (!e.includes("conflict") && !e.includes("not-authorized") && !e.includes("Socket connection timeout") &&
        !e.includes("rate-overlimit") && !e.includes("Connection Closed") && !e.includes("Timed Out") && !e.includes("Value not found")) {
      console.error('Caught exception: ', err);
    }
  });
};
