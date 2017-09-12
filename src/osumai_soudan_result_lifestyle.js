import React, {Component} from 'react'
import request from 'superagent'
import styles from './styles'
import OsumAIHeader from './headers'

// 検索結果（ライフスタイル）を定義するコンポーネント
export default class OsumAISoudanResultLifeStyle extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div style={styles.osumai_result_area}>
        <div style={styles.osumai_result_container}>
        	<span>入力頂いた情報から、あなたにとって最適な場所は</span>
        	<span></span>
        	<span>となりました。</span>
        </div>
        <div>
			    //メリット・デメリット
        </div>
      </div>
    )
  }
}
