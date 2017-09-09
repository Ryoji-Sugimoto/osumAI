import React, {Component} from 'react'
import { Form, FormGroup, ControlLabel, InputGroup, FormControl, Col, Button} from 'react-bootstrap'
import request from 'superagent'
import styles from './styles'
import OsumAIHeader from './headers'
import OsumAISoudanChat from './osumai_soudan_chat'

// 相談画面を定義するコンポーネント
export default class OsumAISoudan extends Component {
  constructor (props) {
    super(props)
    this.state = { timelines: [], ask: '' }
  }
  post () {
		// dummy Q
		this.refs.chat.addAsk(this.state.ask)
		
		// dummy A
    this.refs.chat.addAnswer('答えです。')
    
    // Watsonに尋ねて解答をもらう

    this.setState({ask: ''})

  }
  render () {
    return (
      <div>
        <OsumAIHeader title='お住まい相談' />
        <Form>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" value={this.state.ask} onChange={e => this.setState({ask: e.target.value})}/>
            <InputGroup.Addon onClick={e => this.post()}>送信</InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        </Form>
        <div style={styles.clearbath}/>
        <OsumAISoudanChat ref='chat'/>
      </div>
    )
  }
}
