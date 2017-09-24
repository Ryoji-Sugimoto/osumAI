import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Redirect, Link, withRouter} from 'react-router-dom'
import { Form, FormGroup, ControlLabel, InputGroup, FormControl, Panel, Col, Button, Glyphicon, Radio, ListGroup, ListGroupItem} from 'react-bootstrap'
import request from 'superagent'
import styles from './styles'
import OsumAIHeader from './headers'
import OsumAISoudanChat from './osumai_soudan_chat'

// 相談画面を定義するコンポーネント
export default class OsumAIUserAdd extends Component {
  constructor (props) {
    super(props)
    this.state = { id: '', password: '', name: '', area: [], income: '', owncar: '', family: [], isCancel: false }
  }

  render () {

    const areaIteminput = () => (
      <Panel>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            地域
          </Col>
          <Col sm={2} >
            <FormControl componentClass="select" placeholder="select">
              <option value="select">大阪府</option>
            </FormControl>
          </Col>
          <Col sm={2} >
            <FormControl componentClass="select" placeholder="select">
              <option value="select">大阪市</option>
            </FormControl>
          </Col>
          <Col sm={6} >
            <Button type="button">
              追加
            </Button>
          </Col>
        </FormGroup>
      </Panel>
    )

    const areaItem = (no, state, city) => (
      <div>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            第{no}希望：
          </Col>
          <Col sm={2}  >
            <FormControl componentClass="select" placeholder="select">
              <option value="select">大阪府</option>
            </FormControl>
          </Col>
          <Col sm={2} >
            <FormControl componentClass="select" placeholder="select">
              <option value="select">大阪市</option>
            </FormControl>
          </Col>
          <Col sm={6} >
            <Button type="button">
              削除
            </Button>
          </Col>
        </FormGroup>
      </div>
    )

    const familyItemInput = () => (
      <div>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            家族：
          </Col>
          <Col sm={2} componentClass={ControlLabel} >
            <Button type="button">
              追加
            </Button>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            続柄
          </Col>
          <Col sm={2}>
            <FormControl componentClass="select" placeholder="select">
              <option>夫</option>
              <option value="select">妻</option>
            </FormControl>
          </Col>
          <Col componentClass={ControlLabel} sm={2}>
            生年月日
          </Col>
          <Col sm={2}>
            <FormControl componentClass="input" placeholder="select">
              1991/04/01
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
            職業
          </Col>
          <Col sm={2} >
            <FormControl componentClass="select" placeholder="select">
              <option value="select">専業主婦</option>
            </FormControl>
          </Col>
          <Col componentClass={ControlLabel} sm={2}>
            地域
          </Col>
          <Col sm={2} >
            <FormControl componentClass="select" placeholder="select">
              <option value="select">大阪府</option>
            </FormControl>
          </Col>
          <Col sm={4} >
            <FormControl componentClass="select" placeholder="select">
              <option value="select">大阪市</option>
            </FormControl>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            趣味
          </Col>
          <Col sm={10}>
            <FormControl componentClass="input" placeholder="select">
              
            </FormControl>
          </Col>
        </FormGroup>

      </div>
    )

    if (this.state.isCancel) {
      this.setState({isCancel: false})
      return <Redirect to={'/'}/>
    }
    return (
      <div  style={styles.osumai_user_add}>
        <OsumAIHeader title='お住まい相談' />
        <Form>

          <Panel header={'基本情報'} bsStyle="primary">

            <FormGroup>
              <Col componentClass={ControlLabel} sm={1}>
                ログインID
              </Col>
              <Col sm={5}>
                <FormControl type="text" placeholder="ログイン時に使用するIDを入力してください。" />
              </Col>
              <Col componentClass={ControlLabel} sm={1}>
                パスワード
              </Col>
              <Col sm={5}>
                <FormControl type="password" placeholder="英数文字が使用できます。" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col componentClass={ControlLabel} sm={1}>
                お名前
              </Col>
              <Col sm={11}>
                <FormControl type="text" placeholder="お名前" />
              </Col>
            </FormGroup>

          </Panel>

          <Panel collapsible defaultExpanded header="住みたい地域" bsStyle="info">
            <ListGroup fill>
              <ListGroupItem>

                <Panel>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={1}>
                      地域
                    </Col>
                    <Col sm={2} >
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select">大阪府</option>
                      </FormControl>
                    </Col>
                    <Col sm={2} >
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select">大阪市</option>
                      </FormControl>
                    </Col>
                    <Col sm={7} >
                      <Button type="button">
                        追加
                      </Button>
                    </Col>
                  </FormGroup>
                </Panel>
                
              </ListGroupItem>
            </ListGroup>
          </Panel>

          <Panel header={'世帯年収'} bsStyle="info">
            <FormGroup controlId="formHorizontalEmail">
              <Col sm={2}>
                  <FormControl type="text" placeholder="世帯年収" />
              </Col>
              <Col componentClass={ControlLabel} sm={10}>
                万円
              </Col>
            </FormGroup>
          </Panel>

          <Panel header={'自動車所有有無'} bsStyle="info">
            <FormGroup>
              <Col sm={4}>
                <Radio name="radioGroup" inline>
                  有
                </Radio>
                {' '}
                <Radio name="radioGroup" inline>
                  無
                </Radio>
                {' '}
              </Col>
              <Col sm={8}>
              </Col>
            </FormGroup>
          </Panel>

          <Panel collapsible defaultExpanded header="家族構成" bsStyle="info">
            <ListGroup fill>
              <ListGroupItem>
                {/* {familyItemInput} */}
                <Panel>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={1}>
                      家族：
                    </Col>
                    <Col sm={11} componentClass={ControlLabel} >
                      <Button type="button">
                        追加
                      </Button>
                    </Col>
                  </FormGroup>
                  <br></br>
                  
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={1}>
                      続柄
                    </Col>
                    <Col sm={2}>
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select">妻</option>
                      </FormControl>
                    </Col>
                    <Col componentClass={ControlLabel} sm={1}>
                      生年月日
                    </Col>
                    <Col sm={8}>
                      <FormControl type="text"></FormControl>
                    </Col>
                  </FormGroup>
                  <br></br>

                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={1}>
                      職業
                    </Col>
                    <Col sm={2} >
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select">専業主婦</option>
                      </FormControl>
                    </Col>
                    <Col componentClass={ControlLabel} sm={1}>
                      地域
                    </Col>
                    <Col sm={2} >
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select">大阪府</option>
                      </FormControl>
                    </Col>
                    <Col sm={6} >
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select">大阪市</option>
                      </FormControl>
                    </Col>
                  </FormGroup>
                  <br></br>
                  <FormGroup>
                    <Col componentClass={ControlLabel} sm={1}>
                      趣味
                    </Col>
                    <Col sm={11}>
                      <FormControl  type="text" placeholder="趣味を入力してください">
                      </FormControl>
                    </Col>
                  </FormGroup>

                </Panel>

              </ListGroupItem>
            </ListGroup>
          </Panel>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="button" onClick={e => {this.setState({isCancel: true})}}>
                登録
              </Button>
              <Button type="button" onClick={e => {this.setState({isCancel: true})}}>
                キャンセル
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }

  componentDidMount() {
    console.log('OsumAIUserAdd::componentDidMount')
    // super.componentDidMount()
  }
  componentWillUnmount() {
    console.log('OsumAIUserAdd::componentWillUnmount')
    // super.componentWillUnmount()
  }
  componentWillReceiveProps(nextProps) {
    console.log('OsumAIUserAdd::componentWillReceiveProps')
    // super.componentWillReceiveProps(nextProps)
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('OsumAIUserAdd::shouldComponentUpdate')
  //   // super.shouldComponentUpdate(nextProps, nextState)
  // }
  componentWillUpdate(nextProps, nextState){
    console.log('OsumAIUserAdd::componentWillUpdate')
    // super.componentWillUpdate(nextProps, nextState)
  }
  componentDidUpdate(prevProps, prevState){
    console.log('OsumAIUserAdd::componentDidUpdate')
    // super.componentDidUpdate(prevProps, prevState)
  }  
}
