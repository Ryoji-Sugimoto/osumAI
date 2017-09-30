import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route, Switch, Link
} from 'react-router-dom'
import OsumAIMain from './osumai_main'
import OsumAISoudan from './osumai_soudan'
import OsumAIUserAdd from './osumai_user_add'
import OsumAISoudanResult from './osumai_soudan_result'
import OsumAIQuestion from './osumai_question'
import OsumAIFavoriteList from './osumai_favorite_list'

function loggedIn() {
  if (!token) {
    return false
  } else {
    return true
  }
}

const OsumAIApp = () => (
  <Router>
    <div>
      <Switch>
        <Route path='/main' component={OsumAIMain} />
        <Route path='/chat' component={OsumAISoudan} />
        <Route path='/useradd' component={OsumAIUserAdd} />
        <Route path='/favorite' component={OsumAIFavoriteList} />
        <Route path='/result/:station' component={OsumAISoudanResult} />
        <Route path='/survey' component={OsumAIQuestion} />
        <Route component={OsumAIMain} />
      </Switch>
    </div>
  </Router>
)

window.localStorage['login_id'] = ''
window.localStorage['login_name'] = ''
window.localStorage['login_auth_token'] = ''

// DOMにメインコンポーネントを書き込む
ReactDOM.render(
  <OsumAIApp />,
  document.getElementById('root'));
