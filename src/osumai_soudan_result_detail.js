import React, {Component} from 'react'
import { ButtonToolbar, ButtonGroup, Button, Glyphicon} from 'react-bootstrap'
import request from 'superagent'
import styles from './styles'
import OsumAIHeader from './headers'

// 検索結果（詳細情報）を定義するコンポーネント
export default class OsumAISoudanResultDetail extends Component {
  constructor (props) {
    super(props)
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

    return (
      <div style={styles.osumai_result_area}>
        <div style={styles.osumai_result_container}>
          <div>
            {/*この中に張りぼてを置く？ */}
            <span>■お金に関する情報</span>
            <div>
              <img src="./okane.png" />;
            </div>
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
