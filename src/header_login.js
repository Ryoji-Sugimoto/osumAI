import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Redirect, Link, withRouter} from 'react-router-dom'
import {Navbar, Nav, NavItem, Modal, Alert, Form, FormGroup, ControlLabel, InputGroup, FormControl, Col, Button, Label, Glyphicon} from 'react-bootstrap'
import request from 'superagent'
import styles from './styles'

export default class OsumAIHeaderLogin extends Component {
    constructor (props) {
        super(props)
        console.log('OsumAIHeaderLogin::constructor')
        console.log('OsumAIHeaderLogin::setState(jump:)')
        this.state = { userid: '', passwd: '',  upd: '', msg: '', jump: '' }
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
            const r = res.body
            if (err || !r.status) {
                // @TODO エラーメッセージ表示
                this.setState({msg: r.msg})
                alert(this.state.msg)
                return
            }
            console.log(r)
            if (r.status && r.token) {
                // 認証トークンをlocalStorageに保存
                window.localStorage['sns_id'] = this.state.userid
                window.localStorage['sns_auth_token'] = r.token
                window.localStorage['conversation'] = ''
                this.setState({upd: Date()})
                // トップに戻す
                console.log('OsumAIHeaderLogin::setState(jump:/chat)')
                this.setState({jump: '/chat'})
                return
            }
        })
    }

    getInitialState() {
        return { showModal: false }
    }
    closeModal() {
        this.setState({ showModal: false, isAutoFocus: true, isEnforceFocus: true })
    }
    logout(){
        // ローカルストレージからデータを削除
        window.localStorage['sns_id'] = ''
        window.localStorage['sns_auth_token'] = ''
        window.localStorage['conversation'] = ''
        // 状態のリセット
        this.setState({userid: ''})
        this.setState({passwd: ''})
        this.setState({upd: Date()})
        this.setState({showModal : false})

        // トップに戻す
        // window.location.href = '/'
        console.log('OsumAIHeaderLogin::setState(jump:/)')
        this.setState({jump: '/'})
    }
    keyProc(e){
        if (e.keyCode == 13){
          e.preventDefault()
            if(this.api('login')){
                this.closeModal()
            }
        }
    }
    keyProc2(e){
        if (e.keyCode == 13){
            e.preventDefault()
        }
    }

    render () {

        const appLogin = (state) => (
            <Navbar>
                <Nav pullRight>
                    <Button type="button"
                        bsStyle="primary"
                        bsSize="large"
                        onClick={()=>this.setState({ jump: "/useradd" })}
                    >ユーザー新規登録
                    </Button>

                    <Button type="button"
                        bsStyle="primary"
                        bsSize="large"
                        onClick={()=>this.setState({ showModal: true, isAutoFocus: true, isEnforceFocus: true })}
                    >
                        ログイン
                    </Button>

                    <Modal autoFocus={this.state.isAutoFocus} 
                            enforceFocus={this.state.isEnforceFocus} 
                            show={this.state.showModal}
                            onHide={e => {
                                        this.closeModal()
                                    }}
                            onEntered={e => {
                                        let input = ReactDOM.findDOMNode(this.refs.usrinput)
                                        input && input.focus()
                                }}>
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
                                    <FormControl type="userid" placeholder="ログインID"
                                        onKeyDown={e => this.keyProc(e)}
                                        onKeyPress={e => this.keyProc2(e)}
                                        onKeyUp={e => this.keyProc2(e)}
                                        onChange={e => changed('userid', e)} ref='usrinput' />
                                    </Col>
                                </FormGroup>
                            ​
                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={3}>
                                    パスワード
                                    </Col>
                                    <Col sm={9}>
                                    <FormControl type="password" placeholder="パスワード"
                                        onKeyDown={e => this.keyProc(e)}
                                        onKeyPress={e => this.keyProc2(e)}
                                        onKeyUp={e => this.keyProc2(e)}
                                        onChange={e => changed('passwd', e)} />
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="button" bsStyle="primary"
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
                </Nav>
            </Navbar>
        )

        const appLogout = (state) => (
            <Navbar>
                <Nav>
                    <NavItem eventKey={1} href="#"><Link to="/"><Glyphicon glyph="home" title="ホーム"/></Link></NavItem>
                    <NavItem eventKey={2} href="#"><Link to="/chat"><Glyphicon glyph="comment" title="お住い相談"/></Link></NavItem>
                    <NavItem eventKey={3} href="#"><Link to="/favorite/大阪駅"><Glyphicon glyph="star" title="お気に入り"/></Link></NavItem>
                    <NavItem eventKey={4} href="#"><Link to="/survey"><Glyphicon glyph="edit" title="アンケート"/></Link></NavItem>
                </Nav>
                <Nav pullRight>
                    <div>
                        <h3 className='text-center' style={styles.osumai_nav_right}>{state.userid}</h3>&nbsp;&nbsp;
                        <Button type="button" bsSize="large" bsStyle="primary" onClick={e => this.logout()} style={styles.osumai_nav_right}>
                            ログアウト
                        </Button>
                    </div>
                </Nav>
            </Navbar>
        )

        const changed = (name, e) => this.setState({[name]: e.target.value})

        console.log('window.location.pathname:' + window.location.pathname)

        if(this.state.jump && this.state.jump != window.location.pathname) {
            return <Redirect to={this.state.jump}/>
        }
        // this.setState({jump: ''})
        if (window.localStorage['sns_auth_token'] != '') {
            return appLogout(this.state)
        }
        return appLogin(this.state)
    }

    componentDidMount() {
        console.log('OsumAIHeaderLogin::componentDidMount')
        // super.componentDidMount()
        console.log('OsumAIHeaderLogin::setState(jump:)')
        this.setState({jump: ''})
    }
    componentWillUnmount() {
        console.log('OsumAIHeaderLogin::componentWillUnmount')
        // super.componentWillUnmount()
    }
    componentWillReceiveProps(nextProps) {
        console.log('OsumAIHeaderLogin::componentWillReceiveProps')
        // super.componentWillReceiveProps(nextProps)
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('OsumAIHeaderLogin::shouldComponentUpdate')
    //     // super.shouldComponentUpdate(nextProps, nextState)
    // }
    componentWillUpdate(nextProps, nextState) {
        console.log('OsumAIHeaderLogin::componentWillUpdate')
        // super.componentWillUpdate(nextProps, nextState)
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('OsumAIHeaderLogin::componentDidUpdate')
        // super.componentDidUpdate(prevProps, prevState)
        // console.log('OsumAIHeaderLogin::setState(jump:)')
        // this.setState({jump: ''})
    }


}
