const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "fb",
  alias: ["facebook", "fb3", "fbdl"],
  desc: "Download Facebook videos",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("https://")) {
      return reply("*𝙿𝙻𝙴𝙰𝚂𝙴 𝙿𝚁𝙾𝚅𝙸𝙳𝙴 𝙰 𝚅𝙰𝙻𝙸𝙳 𝙵𝙰𝙲𝙱𝙾𝙾𝙺 𝚄𝚁𝙻...😤*");
    }

    await conn.sendMessage(from, { react: { text: '🔃', key: m.key } });

    const apiUrl = `https://lance-frank-asta.onrender.com/api/downloader?url=${encodeURIComponent(q)}`;
    const { data } = await axios.get(apiUrl);

    if (!data?.content?.status || !data?.content?.data?.result?.length) {
      throw new Error("Invalid API response or no video found.");
    }

    let videoData = data.content.data.result.find(v => v.quality === "HD") || 
                    data.content.data.result.find(v => v.quality === "SD");

    if (!videoData) {
      throw new Error("No valid video URL found.");
    }

    await conn.sendMessage(from, {
      video: { url: videoData.url },
      caption: `*♻️ 𝚀𝚄𝙴𝙴𝙽 𝚂𝙰𝙲𝙷𝙸 𝙼𝙳 𝙵𝙱 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁 🧚*\n\n*𝚅𝙸𝙳𝙴𝙾 𝚀𝚄𝙰𝙻𝙸𝚃𝚈 :${videoData.quality}*\n\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋɪɴɢ ʀᴀᴠɪ 💥`
    }, { quoted: m });

  } catch (error) {
    console.error("FB Download Error:", error);

    // Send error details to bot owner
    const ownerNumber = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    await conn.sendMessage(ownerNumber, {
      text: `⚠️ *FB Downloader Error!*\n\n📍 *Group/User:* ${from}\n💬 *Query:* ${q}\n❌ *Error:* ${error.message || error}`
    });

    // Notify the user
    reply("❌ *Error:* Unable to process the request. Please try again later.");
  }
});


cmd({
    pattern: "instagram",
    alias: ["igdl3", "reel3", "ig2", "instadl3"],
    desc: "Download Instagram reels or image posts",
    category: "downloader",
    react: "♻",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("*𝙿𝙻𝙴𝙰𝚂𝙴 𝙿𝚁𝙾𝚅𝙸𝙳𝙴 𝙰𝙽 𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝚀𝙼 𝙿𝙾𝚂𝚃 𝚊𝚗𝚍 𝚁𝙴𝙴𝙻 𝙻𝙸𝙽𝙺...😤*");
        if (!q.includes("instagram.com")) return reply("Invalid Instagram link.");

        const apiUrl = `https://delirius-apiofc.vercel.app/download/igv2?url=${q}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) {
            await react("❌"); 
            return reply("Failed to fetch Instagram media.");
        }

        const { username, fullname, caption, likes, comments, followed, download } = data.data;

        const captionText = `*♻️ 𝚀𝚄𝙴𝙴𝙽 𝚂𝙰𝙲𝙷𝙸 𝙼𝙳 𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝙰𝙼 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁🧚*` +
                            `*🧩 𝙸𝙽𝚂𝚃𝙰𝙶𝚁𝙰𝙼 𝙿𝙾𝚂𝚃 🏞️*\n\n` +
                            `*🗣️ 𝚄𝚂𝙴𝚁 :* ${fullname} (@${username})\n` +
                            `*💗 𝙻𝙸𝙺𝙴𝚂 :* ${likes}\n*📃 𝙲𝙾𝙼𝙼𝙴𝙽𝚃𝚂 :* ${comments}\n*👤 𝙵𝙾𝙻𝙻𝙾𝚆𝚁𝚂 :* ${followed}\n` +
                            `**💬 𝙲𝙰𝙿𝚃𝙸𝙾𝙽 :*\n${caption || "> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋɪɴɢ ʀᴀᴠɪ 💥"}`;

        for (const media of download) {
            if (media.type === "image") {
                await conn.sendMessage(from, {
                    image: { url: media.url },
                    caption: captionText,
                    contextInfo: { mentionedJid: [m.sender] }
                }, { quoted: mek });
            } else if (media.type === "video") {
                await conn.sendMessage(from, {
                    video: { url: media.url },
                    caption: captionText,
                    contextInfo: { mentionedJid: [m.sender] }
                }, { quoted: mek });
            }
        }

        await react("✅"); // React after successfully sending media
    } catch (e) {
        console.error("Error in Instagram downloader command:", e);
        await react("❌");
        reply(`An error occurred: ${e.message}`);
    }
});

