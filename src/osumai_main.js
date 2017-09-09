import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import { Jumbotron} from 'react-bootstrap'
import styles from './styles'
import OsumAIHeader from './headers'

// メイン画面を定義したコンポーネント
export default class OsumAIMain extends Component {
  render () {
    return (
      <div>
        <OsumAIHeader title='メイン画面'/>
        <Jumbotron>
          <h1>OsumAIへようこそ</h1>
          <p></p>
        </Jumbotron>
      </div>
    )
  }
}
