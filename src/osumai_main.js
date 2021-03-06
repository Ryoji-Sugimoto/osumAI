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
        <Jumbotron style={styles.osumai_info_container}>
          <h1>osumAIへようこそ</h1>
          {/* <p>ログインには、ログインID「1234」、パスワード「1234」を使用してください。</p> */}
        </Jumbotron>
      </div>
    )
  }

  constructor (props) {
    super(props)
  }
  componentDidMount() {
    console.log('OsumAIMain::componentDidMount')
  }
  componentWillUnmount() {
    console.log('OsumAIMain::componentWillUnmount')
  }
  componentWillReceiveProps(nextProps) {
    console.log('OsumAIMain::componentWillReceiveProps')
  }
  componentWillUpdate(nextProps, nextState){
    console.log('OsumAIMain::componentWillUpdate')
  }
  componentDidUpdate(prevProps, prevState){
    console.log('OsumAIMain::componentDidUpdate')
  }

}
