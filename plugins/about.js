const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "about",
    alias: ["hiruwa","whois"], 
    react: "💬",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let about = `*🧸 𝚀𝚄𝙴𝙴𝙽 𝚂𝙰𝙲𝙷𝙸-𝙼𝙳 🧸*

*╭─────❒*
*┃* *👋 нєℓℓσ ${pushname}*
*╰───────────❒*

╭─ * 𝚀ᴜᴇᴇɴ ꜱᴀᴄʜɪ-ᴍᴅ ᴀʙᴏᴜᴛ ៚*
┃✬╭────❥
┃✬│  *⛬ ᴡᴇʟᴄᴏᴍᴇ ᴛʜᴇ ᴍʏ ᴀʙᴏᴜᴛ* 
┃✬│  *⛬ ʙᴏᴛ ɴᴀᴍᴇ : 𝚀ᴜᴇᴇɴ ꜱᴀᴄʜɪ-ᴍᴅ*  
┃✬│  *⛬ ᴏᴡɴᴇʀ : ᴋɪɴɢ ʀᴀᴠɪ*
┃✬│  *⛬ ᴀɢᴇ : 20 ʏᴇᴀʀ* 
┃✬│  *⛬ ᴄɪᴛʏ : ᴋᴏʟᴏᴍʙᴏ*  
┃✬│  *⛬ ᴀ sɪᴍᴘʟᴇ ᴡʜᴀᴛsᴀᴘᴘ ᴅᴇᴠᴇʟᴘᴏʀ*  
┃✬╰────────❥
╰───────────────────────៚
*╭─────❒*
*┃* *𝚂𝙿𝙴𝙲𝙸𝙰𝙻 𝚃𝙷𝙰𝙽𝙺𝚂 𝙵𝙾𝚁*
*╰───────────❒*

╭── *💗 ᴛʜᴀɴᴋꜱ ᴛᴏ ᴍʏ ꜰʀɪᴇɴᴅᴅ 💗៚*
┃✬╭────❥
┃✬│  *🧑‍💻 ʀᴇᴀʟ ᴅᴇxᴛᴇʀꪶ* 
┃✬│  *🧑‍💻 ʀᴇᴀʟ ᴄʏʙᴇʀ ᴅᴇxᴛᴇʀꪶ*  
┃✬│  *🧑‍💻 ᴋɪɴɢ ᴅᴏʀᴀꪶ*  
┃✬│  *🧑‍💻 ᴄʏʙᴇʀ ʟɪᴏɴꪶ*
┃✬╰────────❥
╰───────────────────────៚


> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋɪɴɢ ʀᴀᴠɪ 💥`

await conn.sendMessage(from,{image:{url:`https://files.catbox.moe/cutcfk.jpg`},caption:about,
                             contextInfo: {
    mentionedJid: [m.sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363286758767913@newsletter',
      newsletterName: '🕊️⃝ 𝓚 ɪɴɢ ʀᴀᴠɪ-ᴛᴇᴄʜ⟷💥',
      serverMessageId: 999
    }
  }
}, { quoted: mek });
} catch (e) {
console.log(e)
reply(`${e}`)
}
})
