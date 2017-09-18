// --------------------------------------------------------
// SNSサーバ
// --------------------------------------------------------
// データベースに接続 --- (※1)
const db = require('./server/database')
// chat
const chat = require('./server/chat')
// favicon
const favicon = require('serve-favicon')
// log用モジュール
const log4js = require('log4js');
log4js.configure(__dirname + '/logs/log4js.config.json');
var logger = log4js.getLogger('app');

// WEBサーバを起動 --- (※2)
const express = require('express')
const app = express()
// Bluemix環境とローカル環境でポート番号を振り分ける。
const portNo = process.env.PORT || 3001
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})

// APIの定義
// ユーザ追加用のAPI - ユーザを追加する --- (※3)
app.get('/api/adduser', (req, res) => {
  const userid = req.query.userid
  const passwd = req.query.passwd
  if (userid === '' || passwd === '') {
    return res.json({status: false, msg: 'パラメータが空'})
  }
  // 既存ユーザのチェック
  db.getUser(userid, (user) => {
    if (user) { // 既にユーザがいる
      return res.json({status: false, msg: '既にユーザがいます'})
    }
    // 新規追加
    db.addUser(userid, passwd, (token) => {
      if (!token) {
        res.json({status: false, msg: 'DBのエラー'})
      }
      res.json({status: true, token})
    })
  })
})
// ユーザログイン用のAPI - ログインするとトークンを返す --- (※4)
app.get('/api/login', (req, res) => {
  const userid = req.query.userid
  const passwd = req.query.passwd
  db.login(userid, passwd, (err, token) => {
    if (err) {
      res.json({status: false, msg: '認証エラー'})
      return
    }
    // ログイン成功したらトークンを返す
    res.json({status: true, token})
  })
})
// ユーザ情報を取得 --- (※8)
app.get('/api/get_user', (req, res) => {
  const userid = req.query.userid
  db.getUser(userid, (user) => {
    if (!user) return res.json({status: false})
    res.json({status: true, friends: user.friends})
  })
})

app.use('/chat', chat);
app.use(favicon(__dirname + '/public/favicon.ico'));
// log4jsの設定
app.use(log4js.connectLogger(logger, { level: 'auto' }));

// 静的ファイルを自動的に返すようルーティングする --- (※10)
app.use('/public', express.static('./public'))
app.use('/login', express.static('./public'))
app.use('/users', express.static('./public'))
// app.use('/timeline', express.static('./public'))
app.use('/', express.static('./public'))

module.exports = app;
