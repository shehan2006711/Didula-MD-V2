const {
  fetchJson
} = require('../lib/functions')
const config = require('../config')
const {
  cmd,
  commands
} = require('../command')
const yts = require('yt-search')

cmd( {
  pattern: "song",
  react: "🎵",
  desc: "Download songs",
  category: "download",
  filename: __filename
},
  async (conn, mek, m, {
    from, q, reply
  }) => {
    try {
      if (!q) return reply('⛔please give a song title')
      const search = await yts(q);
      const data = search.videos[0];
      const url = data.url;
      const formatViews = views => views >= 1_000_000_000 ? `${(views / 1_000_000_000).toFixed(1)}B`: views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M`: views >= 1_000 ? `${(views / 1_000).toFixed(1)}K`: views.toString();
      let desc = `
 *🎶Didula MD V2 💚 SONG🎵*
 🤠 *Title:* ${data.title}
 👤 *chenel:* ${data.author.name}
 📝 *Description:* ${data.description}
⏰ *Time:* ${data.timestamp}
⏱️ *Ago:* ${data.ago}
👁 *Views:* ${formatViews(data.views)}

🔢 reply numbers
 *1* audio🎶
 *2* documents 📂
> Didula MD V2 💚 `;
      const or = await conn.sendMessage(from, {
        image: {
          url: data.thumbnail
        }, caption: desc
      }, {
        quoted: mek
      });

      const data1 = await fetchJson(`https://apitest1-f7dcf17bd59b.herokuapp.com/download/ytmp3?url=${url}`)
      //========

      conn.ev.on('messages.upsert', async (msgUpdate) => {
        const msg = msgUpdate.messages[0];
        if (!msg.message || !msg.message.extendedTextMessage) return;

        const selectedOption = msg.message.extendedTextMessage.text.trim();

        if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === or.key.id) {
          switch (selectedOption) {
            case '1':
              await conn.sendMessage(from, {
                audio: {
                  url: data1.result.dl_link
                }, mimetype: "audio/mpeg"
              }, {
                quoted: mek
              });
              await conn.sendMessage(from, {
                react: {
                  text: '✔️', key: mek.key
                }})
              break
            case '2':
              await conn.sendMessage(from, {
                document: {
                  url: data1.result.dl_link
                }, mimetype: "audio/mpeg", fileName: `${data.title}.mp3`, caption: "> Didula MD V2 💚 "
              }, {
                quoted: mek
              });
              await conn.sendMessage(from, {
                react: {
                  text: '✔️', key: mek.key
                }})
              break
            default:
              reply("Invalid option. Please select a valid option🔴");
            }
          }
        })

      } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
      }
    });

  //video ===================

  cmd( {
    pattern: "video",
    react: "📽️",
    desc: "Download songs",
    category: "download",
    filename: __filename
  },
    async (conn, mek, m, {
      from,
      q,
      reply
    }) => {
      try {
        if (!q) return reply('⛔please give a video title')
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;
        const formatViews = views => views >= 1_000_000_000 ? `${(views / 1_000_000_000).toFixed(1)}B`: views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M`: views >= 1_000 ? `${(views / 1_000).toFixed(1)}K`: views.toString();
        let dec = `
*📽️Didula MD V2 💚🎞️*
🤠 *Title:* ${data.title}
👤 *chenel:* ${data.author.name}
📝 *Description:* ${data.description}
⏰ *Time:* ${data.timestamp}
⏱️ *Ago:* ${data.ago}
👁 *Views:* ${formatViews(data.views)}

🔢 reply numbers
*1* video📽️
*2* documents 📂
> Didula MD V2 💚 `;

        const or = await conn.sendMessage(from, {
          image: {
            url: data.thumbnail
          }, caption: dec
        }, {
          quoted: mek
        });
        const data1 = await fetchJson(`https://api.giftedtech.my.id/api/download/dlmp4?apikey=gifted&url=${url}`)


        conn.ev.on('messages.upsert', async (msgUpdate) => {
          const msg = msgUpdate.messages[0];
          if (!msg.message || !msg.message.extendedTextMessage) return;

          const selectedOption = msg.message.extendedTextMessage.text.trim();

          if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === or.key.id) {
            switch (selectedOption) {
            case '1':
              await conn.sendMessage(from, {
                audio: {
                  url: data1.result.download_url
                }, mimetype: "video/mp4"
              }, {
                quoted: mek
              });
              await conn.sendMessage(from, {
                react: {
                  text: '✔️', key: mek.key
                }})
              break
            case '2':
              await conn.sendMessage(from, {
                document: {
                  url: data1.result.download_url
                }, mimetype: "video/mp4", fileName: `${data.title}.mp4`, caption: "> Didula MD V2 💚 "
              }, {
                quoted: mek
              });
              await conn.sendMessage(from, {
                react: {
                  text: '✔️', key: mek.key
                }})
              break
            default:
              reply("Invalid option. Please select a valid option🔴");
            }
          }
        })
      } catch (e) {
        console.log(e);
        reply(`Error: ${e}`);
      }
    });