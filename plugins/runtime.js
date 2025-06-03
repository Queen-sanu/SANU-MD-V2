const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "uptime",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `╭─ *☘ 𝚀𝚄𝙴𝙴𝙽 𝚂𝙰𝙲𝙷𝙸-𝙼𝙳 ☘ ៚*
┃✯╭──❥
┃✯│ *⏳ ᴜᴘᴛɪᴍᴇ :* ${runtime(process.uptime())} 
┃✯│ *📊 ʀᴀᴍ ᴜꜱᴀɢᴇ :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
┃✯│ *🛠️ ʜᴏꜱᴛ ɴᴀᴍᴇ :* ${os.hostname()}
┃✯│ *📡 ᴠᴇʀꜱɪᴏɴ :* 01.0.0 ʙᴇᴛᴀ
┃✯│ *🧑‍💻 ᴏᴡɴᴇʀ :* *ᴋɪɴɢ ʀᴀᴠɪ 💥*
┃✬╰──❥
╰────────────៚

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋɪɴɢ ʀᴀᴠɪ 💥`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/ixoyvp.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363286758767913@newsletter',
                    newsletterName: '🕊️⃝ 𝓚 ɪɴɢ ʀᴀᴠɪ-ᴛᴇᴄʜ⟷💥',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
