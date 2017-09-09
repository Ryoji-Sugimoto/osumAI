import React, {Component} from 'react'
import { Tab, Tabs} from 'react-bootstrap'
import request from 'superagent'
import styles from './styles'
import OsumAIHeader from './headers'
import OsumAISoudanResultLifeStyle from './osumai_soudan_result_lifestyle'

// 相談画面を定義するコンポーネント
export default class OsumAISoudan extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <OsumAIHeader title='お住まい相談' />
        <div>
					<Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
						<Tab eventKey={1} title="検索条件">
							<h2>工事中（検索条件）</h2>
						</Tab>
						<Tab eventKey={2} title="ライフスタイル">
							<OsumAISoudanResultLifeStyle/>
						</Tab>
						<Tab eventKey={3} title="詳細情報">
						<h2>工事中（詳細情報）</h2>
						</Tab>
					</Tabs>
        </div>
      </div>
    )
  }
}
