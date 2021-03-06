// データベースに関する処理をまとめたもの
const path = require('path')
const NeDB = require('nedb')

// データベースに接続する --- (※1)
const userDB = new NeDB({
  filename: path.join(__dirname, 'user.db'),
  autoload: true
})

// ハッシュ値(sha512)を取得 --- (※2)
function getHash (pw) {
  const salt = '::EVuCM0QwfI48Krpr'
  const crypto = require('crypto')
  const hashsum = crypto.createHash('sha512')
  hashsum.update(pw + salt)
  return hashsum.digest('hex')
}
// 認証用のトークンを生成 
function getAuthToken (userid) {
  const time = (new Date()).getTime()
  return getHash(`${userid}:${time}`)
}

// 以下APIで利用するDBの操作メソッド 
// ユーザの検索
function getUser (userid, callback) {
  userDB.findOne({userid}, (err, user) => {
    if (err || user === null) return callback(null)
    callback(user)
  })
}
// ユーザの新規追加 
function addUser (userid, passwd, username, callback) {
  console.log('addUser()：userid: ' + userid + ' passwd: ' + passwd + ' username: ' + username);
  const hash = getHash(passwd)
  const token = getAuthToken(userid)
  const regDoc = {userid, username, hash, token, friends: {}}
  userDB.insert(regDoc, (err, newdoc) => {
    if (err) return callback(null)
    callback(token)
  })
}
// ログインの試行
function login (userid, passwd, callback) {
  const hash = getHash(passwd)
  const token = getAuthToken(userid)
  // ユーザ情報を取得
  getUser(userid, (user) => {
    console.log('login()：userid: ' + userid + ' hash: ' + hash + ' user.hash: ' + user.hash);
    if (!user || user.hash !== hash) {
      return callback(new Error('認証エラー'), null)
    }
    const username = user.username
    // 認証トークンを更新
    user.token = token
    updateUser(user, (err) => {
      if (err) return callback(err, null)
      callback(null, token, username)
    })
  })
}
// 認証トークンの確認 
function checkToken (userid, token, callback) {
  // ユーザ情報を取得
  getUser(userid, (user) => {
    if (!user || user.token !== token) {
      return callback(new Error('認証に失敗'), null)
    }
    callback(null, user)
  })
}
// ユーザ情報を更新
function updateUser (user, callback) {
  userDB.update({userid: user.userid}, user, {}, (err, n) => {
    if (err) return callback(err, null)
    callback(null)
  })
}
module.exports = {
  userDB, getUser, addUser, login, checkToken, updateUser
}
