import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route, Switch, Link
} from 'react-router-dom'
import OsumAIMain from './osumai_main'
import OsumAISoudan from './osumai_soudan'
import OsumAISoudanResult from './osumai_soudan_result'

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
        <Route path='/favorite' component={OsumAISoudanResult} />
        <Route component={OsumAIMain} />
      </Switch>
    </div>
  </Router>
)

window.localStorage['sns_id'] = ''
window.localStorage['sns_auth_token'] = ''

// DOMにメインコンポーネントを書き込む
ReactDOM.render(
  <OsumAIApp />,
  document.getElementById('root'));
