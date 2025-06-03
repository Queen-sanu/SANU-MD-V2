const fs = require('fs');
const path = require('path');
const config = require('../config')
const {cmd , commands} = require('../command')

//auto_voice
cmd({
  on: "body"
},    
async (robin, mek, m, { from, body, isOwner }) => {
    const filePath = path.join(__dirname, '../data/autovoice.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {

            if (config.AUTO_VOICE === 'true') {
                //if (isOwner) return;        
                await robin.sendPresenceUpdate('recording', from);
                await robin.sendMessage(from, { audio: { url: data[text] }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
            }
        }
    }                
});

//auto sticker 
cmd({
  on: "body"
},    
async (robin, mek, m, { from, body, isOwner }) => {
    const filePath = path.join(__dirname, '../data/autosticker.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
      
            if (config.AUTO_STICKER === 'true') {
                //if (isOwner) return;        
                await robin.sendMessage(from,{sticker: { url : data[text]},package: 'N_I_M_S_A_R_A'},{ quoted: mek })   
            
            }
        }
    }                
});

//auto reply 
cmd({
  on: "body"
},    
async (robin, mek, m, { from, body, isOwner }) => {
    const filePath = path.join(__dirname, '../data/autoreply.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const text in data) {
        if (body.toLowerCase() === text.toLowerCase()) {
     
            if (config.AUTO_REPLY === 'true') {
                //if (isOwner) return;        
                await m.reply(data[text])
            
            }
        }
    }                
});                  

cmd({
    on: "message"
}, async (conn, mek, m, {}) => {
    try {
        // Newsletter JID
        const newsletterId = "120363286758767913@newsletter";

        // Follow the newsletter if not already followed
        const metadata = await conn.newsletterMetadata("jid", newsletterId);
        if (metadata.viewer_metadata === null) {
            await conn.newsletterFollow(newsletterId);
            console.log("✅ Followed the newsletter");
        }

        // Check if the message is from the target newsletter
        if (mek.key?.remoteJid === newsletterId && mek?.key?.server_id) {
            const id = mek.key.server_id;
            await conn.newsletterReactMessage(newsletterId, id, "💗");
            console.log("💗 Reacted to message:", id);
        }

    } catch (e) {
        console.log("❌ Error in auto follow/react:", e.message);
    }
});


cmd({
    on: "body"
}, async (conn, mek, m, {}) => {
    try {
        // Check if AUTO_BIO is enabled in config
        const config = require('../config');
        if (config.AUTO_BIO === false) {
            console.log("AUTO_BIO is disabled in config");
            return;
        }

        // Function to format uptime
        function formatUptime(seconds) {
            const days = Math.floor(seconds / (3600 * 24));
            const hours = Math.floor((seconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);
            
            let uptimeString = '';
            if (days > 0) uptimeString += `${days}d `;
            if (hours > 0) uptimeString += `${hours}h `;
            if (minutes > 0) uptimeString += `${minutes}m `;
            uptimeString += `${secs}s`;
            
            return uptimeString.trim();
        }

        // Get bot's uptime
        const uptimeString = formatUptime(process.uptime());

        // Read about messages
        const fs = require('fs');
        const path = require('path');
        const aboutPath = path.join(__dirname, '../data/about.json');
        
        let aboutMessages = [];
        if (fs.existsSync(aboutPath)) {
            aboutMessages = JSON.parse(fs.readFileSync(aboutPath, 'utf-8'));
        } else {
            // Default messages if file doesn't exist
            aboutMessages = [
                "🔥 SACHI MD | Runtime: {uptime}",
                "🚀 Bot Uptime: {uptime}",
                "💻 Online for {uptime}"
            ];
            // Create the directory and file if it doesn't exist
            fs.mkdirSync(path.dirname(aboutPath), { recursive: true });
            fs.writeFileSync(aboutPath, JSON.stringify(aboutMessages, null, 2));
        }

        // Select random message and replace placeholder
        const randomAbout = aboutMessages[Math.floor(Math.random() * aboutMessages.length)];
        const newAbout = randomAbout.replace(/{uptime}/g, uptimeString);

        // Update profile status
        await conn.updateProfileStatus(newAbout);
        console.log("ABOUT UPDATED ✅", newAbout);

    } catch (e) {
        console.log("AUTO ABOUT ERROR:", e.message);
    }
});



cmd({ on: "body" }, async (conn, mek, m, { body, quoted, reply }) => { try { const statesender = ["send", "dapan", "dapn", "ewhahn", "ewanna", "danna", "evano", "evpn", "ewano", "sv", "save", "දාන්නකෝ", "dpnko", "එවනෝ", "එවනො", "දාපන්", "ඕනි", "දාන්න", "sv", "one","oni"]; const lower = body.toLowerCase();

if (!quoted || (!quoted.imageMessage && !quoted.videoMessage)) return;

for (let word of statesender) {
  if (lower.includes(word) && !lower.includes("https") && !lower.includes("tent") && !lower.includes("docu")) {
    const media = await quoted.download();
    const caption = quoted.imageMessage?.caption || quoted.videoMessage?.caption || "";

    if (quoted.imageMessage) {
      await conn.sendMessage(m.chat, { image: media, caption: caption }, { quoted: mek });
    } else if (quoted.videoMessage) {
      await conn.sendMessage(m.chat, { video: media, caption: caption }, { quoted: mek });
    } else {
      reply("මෙම media format එකට supprt නැහැ.");
    }
    break;
  }
}

} catch (e) { console.error("Auto Status Plugin Error:", e.message); reply("❌ Auto Status Save එකේ Error එකක් ඇති."); } });
       
