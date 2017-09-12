import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Row} from 'react-bootstrap'
import styles from './styles'

// 相談画面を定義するコンポーネント
export default class OsumAISoudanChatAsk extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    //
    return (
      <Row>
      	<div className="col-xs-12">
      		<p className="balloon-right">{this.props.ask}</p>
      	</div>
      </Row>
    )
  }
  componentDidUpdate() {
    var obj = ReactDOM.findDOMNode(this)
    if(!obj) {
      obj.scrollIntoView(true)
    }
  }
}
