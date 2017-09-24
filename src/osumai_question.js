import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import { Jumbotron} from 'react-bootstrap'
import styles from './styles'
import OsumAIHeader from './headers'

// アンケート登録画面を定義したコンポーネント
export default class OsumAIQuestion extends Component {
  render () {
    return (
      <div>
        <OsumAIHeader title='アンケート登録画面'/>
        <div style={styles.osumai_question_container}>
            <h1>アンケート入力にご協力お願いします。</h1>
        </div>
        <div style={styles.osumai_question_container}>
            <p>■1.当システムの、使い勝手、提案結果に対する評価について気づいた点を入力してください。 </p>
          <div>
          <input type="text" style={styles.osumai_text}/>
          </div>
        </div>
        <div style={styles.osumai_submit}>
          <input type="submit" value="登録"/>
        </div>
      </div>
    )
  }
}
