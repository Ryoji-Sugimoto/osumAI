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

var request = require('superagent');

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

// 地点の施設を取得する。
app.use('/api/facilities/:station', (req, res) =>{
  console.log(req.params);
  const station = req.params.station
  const categryList = [{key: 'kekka1' , name: 'グルメ・飲食'},
                        {key: 'kekka2' , name: 'ショッピング'},
                        {key: 'kekka3' , name: 'ビジネス'},
                        {key: 'kekka4' , name: 'ペット'},
                        {key: 'kekka5' , name: 'レジャー・スポーツ'},
                        {key: 'kekka6' , name: '冠婚葬祭・イベント'},
                        {key: 'kekka7' , name: '教育・習い事'},
                        {key: 'kekka8' , name: '健康・介護'},
                        {key: 'kekka9', name: '公共機関・団体'},
                        {key: 'kekka10' , name: '歯科'},
                        {key: 'kekka11' , name: '自動車・バイク'},
                        {key: 'kekka12' , name: '趣味'},
                        {key: 'kekka13' , name: '住まい'},
                        {key: 'kekka14' , name: '美容・ファッション'},
                        {key: 'kekka15' , name: '病院・医院'},
                        {key: 'kekka16' , name: '暮らし'},
                        {key: 'kekka17' , name: '旅行・宿泊'}]
  
  var ido = '';
  var keido = '';
  var kekkaList = [];

  
  if (!station) {
    return res.json({status: false, msg: '施設情報取得エラー(地点データ無し)'})
  }

  // サーバーに施設を問い合わせる
  request
    .get("https://nodered-osumai.mybluemix.net/basyo")
    .query({titen: station})
    .end(function(err2, res2){
      if (res2.ok) {
        console.log(res2.body);

        ido = res2.body.ido;
        keido = res2.body.keido;
        
        var i=1;
        for(;;) {
          var varName = "kekka" + i;
          if(typeof res2.body[varName] === "undefined"){
            break;
          }
          var count = Number(res2.body[varName]);

          var category = categryList.find((element, index, array) => {
            if ([varName] == element.key) {
              return true;
            } else {
              return false;
            }
          })

          kekkaList.push({name: category.name, count: count})
          i++;
        }
        res.json({status: true, ido: ido, keido: keido, facilities: kekkaList})
        
      } else {
        console.log('エラーerr2：'+ err2);
        console.log('エラーres2：'+ res2);
        res.json({status: false, msg: '施設情報取得エラー'})
      }
    });
  // const testDatas = [
  //     {name:'学校', distance:'10'}, 
  //     {name:'病院', distance:'20'}, 
  //     {name:'美容室', distance:'25'}, 
  //     {name:'スーパー', distance:'50'}, 
  //     {name:'役所', distance:'100'}
  //   ]
})

module.exports = app;
