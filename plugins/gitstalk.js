const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "githubstalk",
    desc: "Fetch detailed GitHub user profile including profile picture.",
    category: "menu",
    react: "🖥️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const username = args[0];
        if (!username) {
            return reply("Please provide a GitHub username.");
        }
        const apiUrl = `https://api.github.com/users/${username}`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        let userInfo = `╭─ *𝚀𝚄𝙴𝙴𝙽 𝚂𝙰𝙲𝙷𝙸-𝙼𝙳 ɢɪᴛʜᴜʙꜱᴛᴀʟᴋ ៚*
┃✯╭──❥
┃✯│ *👤 ᴜꜱᴇʀɴᴀᴍᴇ :* ${data.name || data.login}
┃✯│ *🖇️ ɢɪᴛʜᴜʙ ᴜʀʟ :* (${data.html_url})
┃✯│ *📃 ʙɪᴏ :* ${data.bio || 'Not available'}
┃✯│ *🌍 ʟᴏᴄᴀᴛɪᴏɴ :* ${data.location || 'Unknown'}
┃✯│ *📊 ᴘᴜʙʟɪᴄ ʀᴇᴘᴏꜱ :* ${data.public_repos}
┃✯│ *👥 ꜰᴏʟʟᴏᴡᴇʀꜱ :* ${data.followers} | Following: ${data.following}
┃✯│ *📆 ᴄʀᴇᴀᴛᴇᴅ ᴀᴛ :* ${new Date(data.created_at).toDateString()}
┃✯│ *🧩 ᴘᴜʙʟɪᴄ ɢɪꜱᴛꜱ :* ${data.public_gists}
┃✬╰──❥
╰────────────៚

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋɪɴɢ ʀᴀᴠɪ 💥
`;
          const sentMsg = await conn.sendMessage(from,{image:{url: data.avatar_url },caption: userInfo },{quoted:mek })
    } catch (e) {
        console.log(e);
        reply(`error: ${e.response ? e.response.data.message : e.message}`);
    }
});

// > © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋɪɴɢ ʀᴀᴠɪ 
