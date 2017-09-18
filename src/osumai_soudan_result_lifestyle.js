import React, {Component} from 'react'
import { ButtonToolbar, ButtonGroup, Button, Glyphicon} from 'react-bootstrap'
import request from 'superagent'
import styles from './styles'
import OsumAIHeader from './headers'

// 検索結果（ライフスタイル）を定義するコンポーネント
export default class OsumAISoudanResultLifeStyle extends Component {
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
        	<span>入力頂いた情報から、あなたにとって最適な場所は</span>
        	<div style={styles.result_address}></div>
        	<span>となりました。</span>
          {iine()}
        </div>
        {/*メリット・デメリット */}
        <div style={styles.osumai_result_container}>
          <div>
              {/*この中に張りぼてを置く？ */}
              <span>■家族へのメリット・デメリット</span>
              <div>
                <img src="./hukakati.png" />;
              </div>
            </div>
          {iine()}
        </div>
      </div>
    )
  }
}
