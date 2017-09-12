'use strict';

// Watsonの準備。
var watson = require('watson-developer-cloud');

// RaRのモデルを生成する。
var retrieveAndRank = watson.retrieve_and_rank({
  username: '935723f5-e1f1-489d-b5fe-97290e82eb7d',
  password: 'ZFOws10o2661',
  version: 'v1'
});

module.exports = {
  "retrieveAndRank": retrieveAndRank
};
