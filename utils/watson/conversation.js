'use strict';

// Watsonの準備。
const watson = require('watson-developer-cloud');

const conversationModel = watson.conversation({
  username: '81e7d7e3-0a7d-4d17-9a72-d7d4b91940bd',
  password: 'qMcsY3i1Frvp',
  version: 'v1',
  version_date: '2017-05-26'
});

module.exports = {
  "conversationModel": conversationModel
};
