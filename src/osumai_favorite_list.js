import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import { Panel, Table, ListGroup, ListGroupItem } from 'react-bootstrap'
import styles from './styles'
import OsumAIHeader from './headers'

// メイン画面を定義したコンポーネント
export default class OsumAIFavoriteList extends Component {
  render () {
    return (
      <div>
        <OsumAIHeader title='お気に入り一覧画面'/>
        <Panel header="お気に入り一覧" bsStyle="primary">
            <Table striped bordered condensed hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>タイトル</th>
                    <th>地点</th>
                    <th>登録日</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>お気に入りの結果</td>
                    <td>北浜駅(大阪市中央区)</td>
                    <td>2017/09/29</td>
                </tr>
                </tbody>
            </Table>
        </Panel>
      </div>
    )
  }

  constructor (props) {
    super(props)
  }
  componentDidMount() {
    console.log('OsumAIFavoriteList::componentDidMount')
  }
  componentWillUnmount() {
    console.log('OsumAIFavoriteList::componentWillUnmount')
  }
  componentWillReceiveProps(nextProps) {
    console.log('OsumAIFavoriteList::componentWillReceiveProps')
  }
  componentWillUpdate(nextProps, nextState){
    console.log('OsumAIFavoriteList::componentWillUpdate')
  }
  componentDidUpdate(prevProps, prevState){
    console.log('OsumAIFavoriteList::componentDidUpdate')
  }

}
