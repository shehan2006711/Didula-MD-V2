
const { getGroupAdmins } = require('../lib/functions');

const viewOnceCommand = {
    pattern: 'vv2',
    react: '💀',
    desc: 'To ViewOnceMessage',
    category: 'convert',
    use: '.vv',
    filename: __filename,
};

module.exports = {
    command: viewOnceCommand,
    function: async (conn, mek, m, options) => {
        const {
            from,
            quoted,
            reply,
            isGroup,
        } = options;

        try {
            let quotedMessage = quoted ? quoted.message : null;

            if (!quotedMessage) {
                return reply('Please reply to a View Once message.');
            }

            const viewOnceMessage = quotedMessage.viewOnceMessageV2 || quotedMessage.viewOnceMessage;

            if (viewOnceMessage) {
                let mediaPath;
                let caption;

                if (viewOnceMessage.message.imageMessage) {
                    caption = viewOnceMessage.message.imageMessage.caption || 'Image';
                    mediaPath = await conn.downloadMediaMessage(viewOnceMessage.message.imageMessage);
                    await conn.sendMessage(from, { image: { url: mediaPath }, caption });
                } else if (viewOnceMessage.message.videoMessage) {
                    caption = viewOnceMessage.message.videoMessage.caption || 'Video';
                    mediaPath = await conn.downloadMediaMessage(viewOnceMessage.message.videoMessage);
                    await conn.sendMessage(from, { video: { url: mediaPath }, caption });
                } else {
                    return reply('Unsupported View Once message type.');
                }
            } else {
                return reply('This is not a View Once message.');
            }
        } catch (error) {
            console.error(error);
            reply('Error processing the View Once message.');
        }
    }
};
