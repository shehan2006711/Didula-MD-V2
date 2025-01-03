
const {
  cmd,
  commands
} = require("../command");

cmd({
  'pattern': 'vv',
  'alias': ['vo', "viewonce"],
  'react': '✨',
  'desc': "Read ViewOnce messages",
  'category': "download",
  'filename': __filename
}, async (_0x596f5d, _0x12dce5, _0x13dcca, {
  from: _0x3b2c6c,
  quoted: _0x20898b,
  reply: _0x597c0c
}) => {
  try {
    const viewOnceMessage = _0x12dce5.msg.contextInfo?.["quotedMessage"]?.['viewOnceMessageV2'] || _0x20898b;

    if (!viewOnceMessage) {
      return _0x597c0c("Please reply to a ViewOnce message");
    }

    let mediaMessage;
    if (viewOnceMessage.message.imageMessage) {
      mediaMessage = viewOnceMessage.message.imageMessage;
    } else if (viewOnceMessage.message.videoMessage) {
      mediaMessage = viewOnceMessage.message.videoMessage;
    } else {
      return _0x597c0c("This is not a ViewOnce message");
    }

    const caption = mediaMessage.caption || '';
    const mediaUrl = await _0x596f5d.downloadAndSaveMediaMessage(mediaMessage);

    if (mediaMessage.imageMessage) {
      return _0x596f5d.sendMessage(_0x12dce5.chat, {
        'image': {
          'url': mediaUrl
        },
        'caption': caption
      });
    } else if (mediaMessage.videoMessage) {
      return _0x596f5d.sendMessage(_0x12dce5.chat, {
        'video': {
          'url': mediaUrl
        },
        'caption': caption
      });
    }
  } catch (error) {
    console.error("Error processing ViewOnce message:", error);
    return _0x597c0c("An error occurred while processing your request.");
  }
});
