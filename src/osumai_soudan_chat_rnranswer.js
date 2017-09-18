import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import {Row} from 'react-bootstrap'
import styles from './styles'

// 相談画面を定義するコンポーネント
export default class OsumAISoudanChatRnRAnswer extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    // 
    const formatRnRAnswer = this.props.answer.map(e => {
      return (<span><Link to={"/result/" + e.title} >{e.title}</Link><br></br>{e.body}<br></br><br></br></span>)
    })
    
    return (
      <Row>
      	<div className="col-xs-12">
          <p className="balloon-left">
            <span>以下はどうでしょうか?</span>
            <br></br><br></br>
              {formatRnRAnswer}
          </p>
      	</div>
      </Row>
    )
  }
  componentDidUpdate() {
    var obj = ReactDOM.findDOMNode(this)
    if(!obj) {
      obj.scrollIntoView(false)
    }
  }
}
