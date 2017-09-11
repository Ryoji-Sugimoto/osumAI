import React, {Component} from 'react'
import request from 'superagent'
import styles from './styles'
import OsumAIHeader from './headers'
import OsumAISoudanChatAsk from './osumai_soudan_chat_ask'
import OsumAISoudanChatAnswer from './osumai_soudan_chat_answer'

// 相談画面を定義するコンポーネント
export default class OsumAISoudanChat extends Component {
  constructor (props) {
    super(props)
    this.state = { conversation: [] }
  }
  addAsk (ask) {
    this.state.conversation.push({type: 'ask', ask: ask, answer: ''})

  }
  addAnswer (answer) {
  	this.state.conversation.push({type: 'answer', ask: '', answer: answer})
  }
  render () {
    // 
    const conversation = this.state.conversation.map(e => {
      if (e.type === 'ask') {
        return (<OsumAISoudanChatAsk ask={e.ask}/> )
      } else if (e.type === 'answer') {
        return (<OsumAISoudanChatAnswer answer={e.answer}/>)
      }
    })
    return (
      <div style={styles.osumai_chat_area} className='chat_container'>{conversation}</div>
    )
  }
}
