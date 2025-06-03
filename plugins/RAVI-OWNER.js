const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "ravi",
    alias: ["status", "aa", "queen"],
    desc: "Check uptime and system status",
    category: "main",
    react: "👑",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `*හෙලොවු මම ක්‍රියාත්මකව සිටිමිꪶ මාව ස්වයංක්‍රියද බැලු ඔබට ස්තිතියි...💗*

*ඔබට මගෙන් කුමන දෙයක්ද අවශ්‍යද ඔබට තවත් විස්තර දැන ගැනිම සදහා පහත කමාන්ඩ් බාවිතා කරන්න ඔබට සුබ දවසක්  𝐈 𝐀ᴍ  𝐐ᴜᴇᴇɴ  𝐒ᴀᴄʜɪ  𝐌ᴅ  𝐖ʜᴀᴛꜱᴀᴘᴘ  𝐁ᴏᴛ...🧚‍♀️💗*

*⎙─➤ .ᴍᴇɴᴜ*
*⎙─➤ .ᴀʟɪᴠᴇ*
*⎙─➤ .ᴘɪɴɢ*
*⎙─➤ .ꜱʏꜱᴛᴇᴍ*


> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋɪɴɢ ʀᴀᴠɪ 💥`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/ki3roi.jpg` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1,
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
