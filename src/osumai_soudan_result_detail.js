import React, {Component} from 'react'
import { ButtonToolbar, ButtonGroup, Button, Glyphicon} from 'react-bootstrap'
import request from 'superagent'
import styles from './styles'
import OsumAIHeader from './headers'

// 検索結果（詳細情報）を定義するコンポーネント
export default class OsumAISoudanResultDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {facilities: []}
    this.api(this.props.station)
  }

  api (station) {
    request
    .get('/api/facilities/' + station)
    .end((err, res) => {
        const r = res.body
        if (err || !r.status) {
            // @TODO エラーメッセージ表示
            this.setState({msg: r.msg})
            alert(this.state.msg)
            return
        }
        console.log(r)
        if (r.status) {
            this.setState({facilities: r.facilities})
            return
            // return r.facilities
          }
    })
  }

render () {

    // いいねボタンの張りぼて
    const iine = () => (
      <div>
        <ButtonToolbar>
          <ButtonGroup>
            <Button><Glyphicon glyph="thumbs-up" /></Button>
            <Button><Glyphicon glyph="thumbs-down" /></Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    )

    const facilities = this.state.facilities.map(e => {
      return(
        <li>{e.name}　：　 {e.count}件</li>  
        // <li>{e.name}</li>  
      )
    })

    return (
      <div style={styles.osumai_result_area}>
        <div style={styles.osumai_result_container}>
          <div>地域にある施設
            <ul>
              {/* 施設情報 */}
              {/* {this.facilitiesList()} */}
              {facilities}
            </ul>
          </div>
          {iine()}
        </div>
        <div style={styles.osumai_result_container}>
          <div>
            {/*この中に張りぼてを置く？ */}
          </div>
          {iine()}
        </div>
      </div>
    )
  }
}
