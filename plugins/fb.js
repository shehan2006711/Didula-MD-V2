const config = require("../config");
const getFbVideoInfo = require("fb-downloader-scrapper");
const {
  cmd,
  commands
} = require("../command");
cmd({
  'pattern': 'fb',
  'alias': ["facebook"],
  'use': ".fb < tiktok url >",
  'react': '🎥',
  'desc': "Download videos from facebook",
  'category': "download",
  'filename': __filename
}, async (_0x247d3b, _0x5a37b5, _0x5cc07e, {
  from: _0xef6ef,
  prefix: _0x54591d,
  q: _0x3d6a9a,
  reply: _0xe3bc7d
}) => {
  if (!_0x3d6a9a || !_0x3d6a9a.includes("facebook.com")) {
    return await _0xe3bc7d("*Please enter a valid facebook url!*");
  }
  const _0x132cc1 = _0x3d6a9a.replace(/\?mibextid=[^&]*/, '');
  getFbVideoInfo(_0x132cc1).then(_0x1ab838 => {
    const _0x3af4c2 = [{
      'buttonId': _0x54591d + "downfb " + _0x1ab838.sd,
      'buttonText': {
        'displayText': "SD Quality"
      },
      'type': 0x1
    }, {
      'buttonId': _0x54591d + "downfb " + _0x1ab838.hd,
      'buttonText': {
        'displayText': "HD Quality"
      },
      'type': 0x1
    }];
    const _0x50cbd2 = {
      'caption': "*Didula MD V2 💚 FB DOWNLODER 💚*",
      'footer': config.FOOTER,
      'buttons': _0x3af4c2,
      'headerType': 0x1
    };
    return _0x247d3b.buttonMessage(_0xef6ef, _0x50cbd2, _0x5cc07e);
  })["catch"](_0xfae704 => {
    console.log(_0xfae704);
  });
});
cmd({
  'pattern': "downfb",
  'react': '🎥',
  'dontAddCommandList': true,
  'filename': __filename
}, async (_0x2111ef, _0x199a8d, _0x54284a, {
  from: _0x52872f,
  q: _0xab6d59,
  reply: _0x141ac8
}) => {
  try {
    if (!_0xab6d59) {
      return await _0x141ac8("*Not Found!*");
    }
    await _0x2111ef.sendMessage(_0x52872f, {
      'video': {
        'url': _0xab6d59
      }
    }, {
      'quoted': _0x199a8d
    });
    await _0x2111ef.sendMessage(_0x52872f, {
      'react': {
        'text': '✔️',
        'key': _0x199a8d.key
      }
    });
  } catch (_0x21aa46) {
    _0x141ac8("*Error !!*");
    console.log(_0x21aa46);
  }
});