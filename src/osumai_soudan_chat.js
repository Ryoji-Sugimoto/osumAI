import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import request from 'superagent'
import styles from './styles'
import OsumAIHeader from './headers'
import OsumAISoudanChatAsk from './osumai_soudan_chat_ask'
import OsumAISoudanChatAnswer from './osumai_soudan_chat_answer'
import OsumAISoudanChatRnRAnswer from './osumai_soudan_chat_rnranswer'

// 相談画面を定義するコンポーネント
export default class OsumAISoudanChat extends Component {
  constructor (props) {
    super(props)
    if(window.localStorage['conversation'] == ''){
      this.state = { conversation: [] }
    } else {
      this.state = { conversation: JSON.parse(window.localStorage['conversation']) }
    }
  }
  restConversation() {
    window.localStorage['conversation'] = ''
    this.setState({conversation: []})
  }
  addAsk (ask) {
    this.state.conversation.push({type: 'ask', ask: ask, answer: ''})

  }
  addAnswer (answer) {
    if(!Array.isArray(answer)){
      this.state.conversation.push({type: 'answer', ask: '', answer: answer})
    } else {
      this.state.conversation.push({type: 'rnranswer', ask: '', answer: answer})
    }
    window.localStorage['conversation'] = JSON.stringify(this.state.conversation)
  }

  render () {
    // 
    const conversation = this.state.conversation.map(e => {
      if (e.type === 'ask') {
        return (<OsumAISoudanChatAsk ask={e.ask}/> )
      } else if (e.type === 'answer') {
        return (<OsumAISoudanChatAnswer answer={e.answer}/>)
      } else if (e.type === 'rnranswer') {
        return (<OsumAISoudanChatRnRAnswer answer={e.answer}/>)
      }
    })
    return (
      <div style={styles.osumai_chat_area} className='chat_container' ref="conversationList">{conversation}</div>
    )
  }
  scrollToBottom() {
    const { conversationList } = this.refs;
    const scrollHeight = conversationList.scrollHeight;
    const height = conversationList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(conversationList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
}
