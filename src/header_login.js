import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import { Modal, Form, FormGroup, ControlLabel, InputGroup, FormControl, Col, Button, Label} from 'react-bootstrap'
import request from 'superagent'
import styles from './styles'

export default class OsumAIHeaderLogin extends Component {
    constructor (props) {
        super(props)
        this.state = { userid: '', passwd: '',  upd: '', msg: '' }
        this.state.userid = window.localStorage['sns_id']
    }
   
    // APIを呼びだし、トークンを得てlocalStorageに保存する --- (※1)
    api (command) {
        request
        .get('/api/' + command)
        .query({
            userid: this.state.userid,
            passwd: this.state.passwd
        })
        .end((err, res) => {
            if (err) {
                // @TODO エラーメッセージ表示
                return
            }
            const r = res.body
            console.log(r)
            if (r.status && r.token) {
            // 認証トークンをlocalStorageに保存
            window.localStorage['sns_id'] = this.state.userid
            window.localStorage['sns_auth_token'] = r.token
                this.setState({upd: Date()})
            return
        }
        this.setState({msg: r.msg})
      })
    }

    getInitialState() {
        return { showModal: false }
    }
    closeModal() {
        this.setState({ showModal: false })
    }
  
    logout(){
        // ローカルストレージからデータを削除
        window.localStorage['sns_id'] = ''
        window.localStorage['sns_auth_token'] = ''
        // 状態のリセット
        this.setState({userid: ''})
        this.setState({passwd: ''})
        this.setState({upd: Date()})
        this.setState({showModal : false}) 
        
        // トップに戻す
        this.props.history.push('/') //動かん
    }

    render () {

    // const getInitialState = () => (
    //     { showModal: false }
    // )

    //const close = () => this.setState({showModal : false}) 
      
    // const open = () => (
    //     this.state.showModal = true
    // )
    
    const appLogin = (state) => (
        <div>
            <Button type="button"
                bsStyle="primary"
                bsSize="large"
            >
                ユーザー新規登録
            </Button>

            <Button type="button"
                bsStyle="primary"
                bsSize="large"
                onClick={()=>this.setState({ showModal: true })}
            >
                ログイン
            </Button>

            <Modal show={this.state.showModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">ログイン</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalUsreid">
                            <Col componentClass={ControlLabel} sm={3}>
                            ログインID
                            </Col>
                            <Col sm={9}>
                            <FormControl type="userid" placeholder="ログインID" onChange={e => changed('userid', e)} />
                            </Col>
                        </FormGroup>
                    ​
                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={3}>
                            パスワード
                            </Col>
                            <Col sm={9}>
                            <FormControl type="password" placeholder="パスワード" onChange={e => changed('passwd', e)} />
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="button" 
                        onClick={
                            e => {
                                    if(this.api('login')){
                                        this.closeModal()
                                    }
                                }
                        }>
                            ログイン
                    </Button>
                    <Button type="button" 
                        onClick={e => {
                                this.closeModal()
                            }
                        }>
                            キャンセル
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

    const appLogout = (state) => (
        <div>
            <Label>{state.userid}</Label>&nbsp;
            <Button type="button" bsSize="large" bsStyle="primary" onClick={e => this.logout()}>
                ログアウト
            </Button>
        </div>
    )

    const changed = (name, e) => this.setState({[name]: e.target.value})
            if (window.localStorage['sns_auth_token'] != '') {
            return appLogout(this.state)
        }
        return appLogin(this.state)
    }
}
