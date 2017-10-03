'use strict';

const express = require('express');
const router = express.Router();
const log4js = require('log4js')
log4js.configure('./logs/log4js.config.json');
var logger = log4js.getLogger('chat');

// queryString
const qs = require('qs');

// conversationのモデルを取得。
const conversation = require('../utils/watson/conversation');

// RaRのモデルを取得。
const retrieve = require('../utils/watson/rar');

// rankerIdを取得する。
var rankerId = '';
retrieve.retrieveAndRank.listRankers({
    "sort": "created"
  },
  function(err, response) {
    if (err)
      logger.error('error: ', err);
    else
      var rankers = response["rankers"];

    rankers = rankers.sort(function(a, b) {
      return (a.created < b.created ? 1 : -1);
    });

    rankerId = rankers[0].ranker_id;
    console.log('rankerId : ' + rankerId);
  });

//const rankerId = '7ff711x34-rank-2134';

// solrClientを生成する。
const solrClient = retrieve.retrieveAndRank.createSolrClient({
  cluster_id: 'scda051d7a_9e12_411d_9792_4088e8f3d237',
  collection_name: 'review_dummy'
});

// RaR呼び出しフラグ
var callRaRFlg = false;

// conversationのコンテキスト
var context = {};

// ライフスタイルに対する要望
var needsLifeStyleArray = [];

// 場所検索フラグ
var placeFlg = false;

// ユーザーから入力された場所
var place = '';

const
  // RaRの回答結果表示数
  displayRaR = 3,
  // 改行
  br = '</br>',
  // いいねボタン
  lileButton = '<button type="button" class="btn btn-default navbar-btn"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true">';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("");
});

// conversationから回答を取得する。
router.get('/ask/conversation', (req, res) => {
  // ユーザーからの質問を取得する。
  var question = req.query.text;
  console.log('question : ' + question);
  if (question == "conversation_start") {
    // contextの初期化
    context = {};
    needsLifeStyleArray=[];
  }

  conversation.conversationModel.message({
    input: {
      text: question
    },
    workspace_id: '81146d8d-c6c5-4523-b43a-7aa33db163c6',
    context: context
  }, function(err, response) {
    console.log('conversationの呼び出し');
    if (err) {
      logger.error(err);
    } else {
      // conversationから回答を受け取る
      var conAnswer = response;
      logger.debug('Conversation : ' + JSON.stringify(response));

      // conversationから受け取ったcontextの値を書き換える。
      context = conAnswer["context"];

      // conversationから受け取ったcontextの値を取得する。
      callRaRFlg = context.callRetrieveAndRank;
      placeFlg = context.placeFlg;
      place = context.place;
      var needsLifeStyle = '';
      var value = context.needs_of_lifeStyle.value;
      var entity = context.needs_of_lifeStyle.entity;

      // ユーザーの要望を取得する。
      if (entity != null && entity != '') {
        needsLifeStyle = entity;
      } else {
        needsLifeStyle = value;
      }

      // conversationからの回答を取得する。
      var message = conAnswer["output"].text[0];

      if (needsLifeStyle != '' && needsLifeStyleArray.indexOf(needsLifeStyle) == -1) {
        // ライフスタイルの要望が""でない、かつ 過去に同じ要望がない場合、リストに格納。
        needsLifeStyleArray.push(needsLifeStyle);
      }

      // クライアントに値を送信する。
      res.send({
        message: message,
        callRaRFlg: callRaRFlg,
        needsLifeStyleArray: needsLifeStyleArray,
        placeFlg: placeFlg,
        place: place
      });
    }
  });
});

// RaRから回答を取得する。
router.get('/ask/rank', (req, res) => {
  if (callRaRFlg) {
    // callRaRFlgを初期化する。
    callRaRFlg = false;
    // ユーザーからの質問を取得する。
    var questionParam = req.query.text;
    // 質問
    var question = "";
    // RaRの回答
    var rarAnswer = '';
    // RaRに投げる検索クエリー
    var query = '';

    if (placeFlg) {
      // 特定の場所について検索する場合

      // 特定の場所を検索する検索条件を生成する。
      question = 'title:' + place;

    } else {
      // ライフスタイルについての要望について検索する場合

      // ライフスタイルについての要望を検索する検索条件を生成する。
      if (Array.isArray(questionParam)) {
        // 要望が複数個ある場合
        for (var i = 0; i < questionParam.length; i++) {
          if (i == 0) {
            question = questionParam[i];
          } else {
            question = question + 'AND' + questionParam[i];
          }
        }
      } else {
        // 要望が単数の場合
        question = questionParam;
      }
    }

    // RaRに投げる検索クエリーを生成する。
    query = qs.stringify({
      q: question,
      ranker_id: rankerId,
      fl: 'title,body,ranker.confidence'
    });

    logger.debug('RaRへのクエリー : ' + JSON.stringify(query));

    solrClient.get('fcselect', query, function(err, searchResponse) {
      // RaRに尋ねる。
      console.log('RetrieveAndRankの呼び出し');
      if (err) {
        logger.error('Error searching for documents: ' + err);
      } else {
        logger.debug('RaR : ' + JSON.stringify(searchResponse.response.docs));

        var message = [];
        // var message = '';
        var messageList = searchResponse.response;

        for (var i = 0; i < displayRaR; i++) {
          // var doc = messageList.docs[i];
          // if (doc != null) {
          //   // message = message + doc.title + br + doc.body + br + br;
          // }
          message.push(messageList.docs[i]);
        }

        // if(placeFlg){
        //   message = place + 'について、以下のような情報があります。' + br + br + message;
        // } else {
        //   message = '以下はどうでしょうか?' + br + br + message;
        // }

        // クライアントに値を送信する。
        res.send({
          message: message,
          place: place,
          placeFlg: placeFlg,
          callRaRFlg: false
        });
      }
    });
  }
});

module.exports = router;
