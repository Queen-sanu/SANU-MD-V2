const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

function convertToBool(text, fault = "true") {
  return text === fault ? true : false;
}
module.exports = {
  SESSION_ID: process.env.SESSION_ID || "ndVyFBrA#8Puhfn6mcbmsoxjWeJsfBZRGuVBqqamQTPVbEYQsQQU",
  OWNER_NUM: process.env.OWNER_NUM || "94757660788",
  PREFIX: process.env.PREFIX || ".",
  
  AUTO_BIO: process.env.AUTO_BIO || "false",
  ALIVE_IMG: process.env.ALIVE_IMG || "https://files.catbox.moe/m8xtvw.jpeg",
  ALIVE_MSG: process.env.ALIVE_MSG || "Hello , I am alive now!!\n\n*🤡 Made by Nimsara 🤡*\n\n*watsapp channel link* - https://whatsapp.com/channel/0029Vb0bsRuFnSz4XAQ2yT0r",
  
AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN || "true",
// make true or false status auto seen
AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
// make true if you want auto reply on status 
AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "false",
// make true if you want auto reply on status 
AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || "*SEEN YOUR STATUS BY SACHI-MD 🤍*",
  MODE: process.env.MODE || "public",

  
  AUTO_RECORDING: process.env.AUTO_RECORDING || "false",
  AUTO_VOICE: process.env.AUTO_VOICE || "true",
  AUTO_STICKER: process.env.AUTO_STICKER || "false",
  AUTO_REPLY: process.env.AUTO_REPLY || "true",
};
