const { cmd, commands } = require('../command');
const yts = require('yt-search');
const yt = require('@vreden/youtube_scraper');

// -------- Song Download --------
cmd({
    pattern: 'song',
    desc: 'Download songs',
    react: "🎶",
    category: 'download',
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply('Please enter a query or a URL!');

        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

        let desc = `🎼 KAVIYA MD SONG DOWNLOADER . .⚙️

🎼 TITLE - ${data.title}

🎼 VIEWS - ${data.views}

🎼 DESCRIPTION - ${data.description}

🎼 TIME - ${data.timestamp}

🎼 AGO - ${data.ago}

Reply This Message With Option

1 || Audio With Normal Format
2 || Audio With Document Format
3 || Audio As Voice Note (PTT)

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ 𝐊𝐀𝐕𝐈𝐘𝐀💚 `;

        const vv = await conn.sendMessage(from, { image: { url: data.thumbnail }, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                let down = await yt.download_audio(url);
                let downloadUrl = down.url;

                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, { 
                            audio: { url: downloadUrl }, 
                            caption: '> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ 𝐊𝐀𝐕𝐈𝐘𝐀💚 ', 
                            mimetype: 'audio/mpeg' 
                        }, { quoted: mek });
                        break;

                    case '2':
                        await conn.sendMessage(from, { 
                            document: { url: downloadUrl }, 
                            caption: '> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴍʀ 𝐊𝐀𝐕𝐈𝐘𝐀💚 ', 
                            mimetype: 'audio/mpeg', 
                            fileName: data.title + ".mp3" 
                        }, { quoted: mek });
                        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
                        break;

                    case '3': 
                        await conn.sendMessage(from, { 
                            audio: { url: downloadUrl }, 
                            mimetype: 'audio/ogg; codecs=opus', 
                            ptt: true
                        }, { quoted: mek });
                        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
                        break;

                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('An error occurred while processing your request.');
    }
});
