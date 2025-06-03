const { cmd, commands } = require("../command");
const yts = require("yt-search");
const { ytmp3 } = require("@vreden/youtube_scraper");

cmd(
  {
    pattern: "song",
    react: "🎵",
    desc: "Download Song",
    category: "download",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("*search song name* ❔");

      // Search for the video
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;

      // Song metadata description
      let desc = `*🧚 𝚀𝚄𝙴𝙴𝙽 𝚂𝙰𝙲𝙷𝙸 𝙼𝙳 𝚂𝙾𝙽𝙶 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁 🧚*


*🧚 ᴛɪᴛʟᴇ* : ${data.title}

*🧩 ᴅᴇꜱᴄʀɪᴘᴛɪᴏɴ* : ${data.description}

*🕖 ᴛɪᴍᴇ* : ${data.timestamp}

*🧸 ᴀɢᴏ* : ${data.ago}

*📃 ᴠɪᴇᴡꜱ* : ${data.views}

*🖇️ ᴜʀʟ* : ${data.url}


🪀 *ᴡʜᴀᴛꜱᴀᴘᴘ ᴄʜᴀɴɴᴇʟ ʟɪɴᴋ ➪* https://whatsapp.com/channel/0029Vb3U9MU1yT24NtpQoM3S


> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋɪɴɢ ʀᴀᴠɪ 💥`;

      // Send metadata thumbnail message with contextInfo
      await robin.sendMessage(
        from,
        {
          image: { url: data.thumbnail },
          caption: desc,
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterName: "🕊️⃝ 𝓚 ɪɴɢ ʀᴀᴠɪ-ᴛᴇᴄʜ⟷💥",
              newsletterJid: "120363286758767913@newsletter",
            },
          },
        },
        { quoted: mek }
      );

      // Download the audio using @vreden/youtube_scraper
      const quality = "128"; // Default quality
      const songData = await ytmp3(url, quality);

      // Validate song duration (limit: 30 minutes)
      let durationParts = data.timestamp.split(":").map(Number);
      let totalSeconds =
        durationParts.length === 3
          ? durationParts[0] * 3600 + durationParts[1] * 60 + durationParts[2]
          : durationParts[0] * 60 + durationParts[1];

      if (totalSeconds > 1800) {
        return reply("⏱️ audio limit is 30 minutes");
      }

      // Send audio file
      await robin.sendMessage(
        from,
        {
          audio: { url: songData.download.url },
          mimetype: "audio/mpeg",
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterName: "🕊️⃝ 𝓚 ɪɴɢ ʀᴀᴠɪ-ᴛᴇᴄʜ⟷💥",
              newsletterJid: "120363286758767913@newsletter",
            },
            externalAdReply: {
              title: "*🧚 𝚀ᴜᴇᴇɴ ꜱᴀᴄʜɪ-ᴍᴅ 🧚*",
              body: "ᴀ 𝚀ᴜᴇᴇɴ ꜱᴀᴄʜɪ ᴍᴅ ᴡᴀ ʙᴏᴛ ʙᴇꜱᴇᴅ",
              sourceUrl: "https://youtube.com/@ravimodz?si=xzaH3uAOM2B4psdI",
              thumbnailUrl: "https://files.catbox.moe/wophvk.jpg",
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: mek }
      );

      // Send as a document (optional)
      await robin.sendMessage(
        from,
        {
          document: { url: songData.download.url },
          mimetype: "audio/mpeg",
          fileName: `${data.title}.mp3`,
          caption: "> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋɪɴɢ ʀᴀᴠɪ 💥",
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterName: "🕊️⃝ 𝓚 ɪɴɢ ʀᴀᴠɪ-ᴛᴇᴄʜ⟷💥",
              newsletterJid: "120363286758767913@newsletter",
            },
            externalAdReply: {
              title: "*🧚 𝚀ᴜᴇᴇɴ ꜱᴀᴄʜɪ-ᴍᴅ 🧚*",
              body: "ᴀ 𝚀ᴜᴇᴇɴ ꜱᴀᴄʜɪ ᴍᴅ ᴡᴀ ʙᴏᴛ ʙᴇꜱᴇᴅ",
              sourceUrl: "https://youtube.com/@ravimodz?si=xzaH3uAOM2B4psdI",
              thumbnailUrl: "https://files.catbox.moe/wophvk.jpg",
              mediaType: 1,
              renderLargerThumbnail: true,
            },
          },
        },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
      reply(`❌ Error: ${e.message}`);
    }
  }
);
