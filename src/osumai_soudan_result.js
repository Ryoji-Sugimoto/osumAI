import React, {Component} from 'react'
import { Tab, Tabs} from 'react-bootstrap'
import request from 'superagent'
import styles from './styles'
import OsumAIHeader from './headers'
import OsumAISoudanResultLifeStyle from './osumai_soudan_result_lifestyle'
import OsumAISoudanResultDetail from './osumai_soudan_result_detail'

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
							<OsumAISoudanResultLifeStyle station={this.props.match.params.station}/>
						</Tab>
						<Tab eventKey={3} title="詳細情報">
						  <OsumAISoudanResultDetail station={this.props.match.params.station}/>
						</Tab>
					</Tabs>
        </div>
      </div>
    )
  }
}
