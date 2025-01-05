const {
  downloadContentFromMessage
} = require('@whiskeysockets/baileys')

cmd({
    pattern: "vv",
    react: "👀",
    alias: ["rvo"],
    dontAddCommandList: true,
    use: '.vv',
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try {
const quot = m.msg.contextInfo.quotedMessage.viewOnceMessageV2;
if(quot)
{
if(quot.message.imageMessage) 
{ console.log("Quot Entered") 
   let cap = quot.message.imageMessage.caption;
   let anu = await conn.downloadAndSaveMediaMessage(quot.message.imageMessage)
   return conn.sendMessage(m.chat,{image:{url : anu},caption : cap })
}
if(quot.message.videoMessage) 
{
   let cap = quot.message.videoMessage.caption;
   let anu = await conn.downloadAndSaveMediaMessage(quot.message.videoMessage)
   return conn.sendMessage(m.chat,{video:{url : anu},caption : cap })
}
 
}
       
} catch(e) {  console.log("error" , e ) }     

       
if(!m.quoted) return m.reply("```Uh Please Reply A ViewOnce Message```")           
if(m.quoted.mtype === "viewOnceMessage")
{ console.log("ViewOnce Entered") 
 if(m.quoted.message.imageMessage )
{ 
  let cap = m.quoted.message.imageMessage.caption;
  let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.imageMessage)
  conn.sendMessage(m.chat,{image:{url : anu},caption : cap })
}
else if(m.quoted.message.videoMessage )
{
  let cap = m.quoted.message.videoMessage.caption;
  let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.videoMessage)
  conn.sendMessage(m.chat,{video:{url : anu},caption : cap })
}

}
else return m.reply("```This is Not A ViewOnce Message```")
})