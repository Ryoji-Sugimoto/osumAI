import React, {Component} from 'react'
import {Row} from 'react-bootstrap'
import styles from './styles'

// 相談画面を定義するコンポーネント
export default class OsumAISoudanChatAnswer extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    // 
    return (
      <Row>
      	<div className="col-xs-11">
      		<p className="balloon-left">{this.props.answer}</p>
      	</div>
      </Row>
    )
  }
}
