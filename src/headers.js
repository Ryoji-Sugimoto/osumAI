import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import { Jumbotron, PageHeader, Navbar, Nav, NavItem} from 'react-bootstrap'
import styles from './styles'
import OsumAIHeaderLogin from './header_login'

export default class OsumAIHeader extends Component {

    render () {
        if (window.localStorage['login_auth_token'] != '') {
            return (
                <div style={styles.osumai_header}>
                    <Jumbotron style={styles.osumai_bg}>
                        <h1 style={styles.osumai_banner_color}>osum<span style={styles.osumai_banner_color_ai}>AI</span></h1>
                    </Jumbotron>
                    <OsumAIHeaderLogin/>
                </div>
            )
        }
        return (
            <div style={styles.osumai_header}>
                <Jumbotron style={styles.osumai_bg}>
                    <h1 style={styles.osumai_banner_color}>osum<span style={styles.osumai_banner_color_ai}>AI</span></h1>
                </Jumbotron>
                <OsumAIHeaderLogin/>
            </div>
        )
    }

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log('OsumAIHeader::componentDidMount')
    }
    componentWillUnmount() {
        console.log('OsumAIHeader::componentWillUnmount')
    }
    componentWillReceiveProps(nextProps) {
        console.log('OsumAIHeader::componentWillReceiveProps')
    }
    componentWillUpdate(nextProps, nextState) {
        console.log('OsumAIHeader::componentWillUpdate')
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('OsumAIHeader::componentDidUpdate')
    }

}
