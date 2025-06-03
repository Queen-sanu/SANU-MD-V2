const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "tiktokstalk",
  alias: ["tstalk", "ttstalk"],
  react: "📱",
  desc: "Fetch TikTok user profile details.",
  category: "search",
  filename: __filename
}, async (conn, m, store, { from, args, q, reply }) => {
  try {
    if (!q) {
      return reply("*𝙿𝙻𝙴𝙰𝚂𝙴 𝙿𝚁𝙾𝚅𝙸𝙳𝙴 𝙰 𝚃𝙸𝙺 𝚃𝙾𝙺 𝚄𝚂𝙴𝚁𝙽𝙰𝙼𝙴...😤*\n\n*𝙴𝚇𝙰𝙼𝙿𝙻𝙴 :* .tiktokstalk mrbeast");
    }

    const apiUrl = `https://api.siputzx.my.id/api/stalk/tiktok?username=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data.status) {
      return reply("❌ User not found. Please check the username and try again.");
    }

    const user = data.data.user;
    const stats = data.data.stats;

    const profileInfo = `*♻️ 𝚀𝚄𝙴𝙴𝙽 𝚂𝙰𝙲𝙷𝙸 𝙼𝙳 𝚃𝙸𝙺 𝚃𝙾𝙺 𝙿𝚁𝙾𝙵𝙸𝙻𝙴 𝚂𝚃𝙰𝙻𝙺𝙴𝚁 🧚*

*👤 ᴜꜱᴇʀɴᴀᴍᴇ :* @${user.uniqueId}
*😒 ɴɪᴄᴋ ɴᴀᴍᴇ :* ${user.nickname}
*♻ ᴠᴇʀɪꜰɪᴇᴅ :* ${user.verified ? "Yes ✅" : "No ❌"}
*🌍 ʀᴇɢɪᴏɴ :* ${user.region}
*📃 ʙɪᴏ :* ${user.signature || "No bio available."}
*🖇️ ʙɪᴏ ʟɪɴᴋ :* ${user.bioLink?.link || "No link available."}

*📊 ꜱᴛᴀᴛɪꜱᴛɪᴄꜱ :*
*👥 ꜰᴏʟʟᴏᴡᴇʀꜱ :* ${stats.followerCount.toLocaleString()}
*👤 ꜰᴏʟʟᴏᴡɪɴɢ :* ${stats.followingCount.toLocaleString()}
*💗 ʟɪᴋᴇꜱ :* ${stats.heartCount.toLocaleString()}
*📽️ ᴠɪᴅᴇᴏꜱ :* ${stats.videoCount.toLocaleString()}

*📆 ᴀᴄᴄᴏᴜɴᴛ ᴄʀᴇᴀᴛᴇᴅ :* ${new Date(user.createTime * 1000).toLocaleDateString()}
*🔐 ᴘʀɪᴠᴀᴛᴇ ᴀᴄᴄᴏᴜɴᴛ :* ${user.privateAccount ? "Yes 🔒" : "No 🌍"}

*🖇️ ᴘʀᴏꜰɪʟᴇ ᴜʀʟ :* https://www.tiktok.com/@${user.uniqueId}

> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋɪɴɢ ʀᴀᴠɪ 💥
`;

    const profileImage = { image: { url: user.avatarLarger }, caption: profileInfo };

    await conn.sendMessage(from, profileImage, { quoted: m });
  } catch (error) {
    console.error("❌ Error in TikTok stalk command:", error);
    reply("⚠️ An error occurred while fetching TikTok profile data.");
  }
});

