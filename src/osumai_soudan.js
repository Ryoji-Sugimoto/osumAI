import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Redirect, Link, withRouter} from 'react-router-dom'
import { Form, FormGroup, ControlLabel, InputGroup, FormControl, Col, Button, Glyphicon} from 'react-bootstrap'
import request from 'superagent'
import styles from './styles'
import OsumAIHeader from './headers'
import OsumAISoudanChat from './osumai_soudan_chat'

// 相談画面を定義するコンポーネント
export default class OsumAISoudan extends Component {
  constructor (props) {
    super(props)
    this.state = { timelines: [], ask: '', station: '' }
  }
  postProc () {

    if (this.state.ask=='') {
			return
		}

		// dummy Q
		this.refs.chat.addAsk(this.state.ask)

		// Watsonに尋ねて解答をもらう
    this.ask('/chat/ask/conversation', this.state.ask)
  }

  keyProc(e){
    if (e.keyCode == 13){
      e.preventDefault()
      this.postProc()
    }
  }
  keyProc2(e){
    if (e.keyCode == 13){
      e.preventDefault()
    }
  }

  // Watsonに尋ねる
  ask(url, text) {
  // ajaxでconversationにリクエストを投げる。
  request.get(url)
    .query({
      "text": text
    })
    .end((err, res) => {
      if (err) {
        this.refs.chat.addAnswer("ajax通信が失敗しました。")
      } else {
        // watsonの回答を画面に表示させる。
        this.refs.chat.addAnswer(res.body.message)
        this.setState({ask: ''})
        if (res.body.callRaRFlg) {
          // RaRの呼び出しフラグがtrueの場合、RaRを呼び出す。
          this.ask('/chat/ask/rank', res.body.needsLifeStyleArray);
        }
      }
    })
}

  render () {
    if (this.state.station) {
      <Redirect to={this.state.station}/>
      this.setState({station: ''})
    }
    return (
      <div>
        <OsumAIHeader title='お住まい相談' />
        <Form style={styles.osumai_soudan_input}>
          <FormGroup>
            <InputGroup>
              <FormControl type="text" value={this.state.ask}
                  onKeyDown={e => this.keyProc(e)}
                  onKeyPress={e => this.keyProc2(e)}
                  onKeyUp={e => this.keyProc2(e)}
                  onChange={e => this.setState({ask: e.target.value})}
                  ref='askinput'/>
              <InputGroup.Addon onClick={e => this.postProc()}><Glyphicon glyph="send" title="送信"/></InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </Form>
        <OsumAISoudanChat ref='chat'/>
      </div>
    )
  }

  componentWillMount(){
    if (window.localStorage['conversation'] == '') {
      this.ask('/chat/ask/conversation', 'conversation_start')
    }  
  }

  componentDidMount() {
    let input = ReactDOM.findDOMNode(this.refs.askinput)
    input && input.focus()
  }

  componentDidUpdate(){
    let input = ReactDOM.findDOMNode(this.refs.askinput)
    input && input.focus()
  }
}
