import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import { Jumbotron, PageHeader, Navbar, Nav, NavItem} from 'react-bootstrap'
import styles from './styles'
import OsumAIHeaderLogin from './header_login'

export default class OsumAIHeader extends Component {

    render () {
        if (window.localStorage['sns_auth_token'] != '') {
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
        // super.componentDidMount()
    }
    componentWillUnmount() {
        console.log('OsumAIHeader::componentWillUnmount')
        // super.componentWillUnmount()
    }
    componentWillReceiveProps(nextProps) {
        console.log('OsumAIHeader::componentWillReceiveProps')
        // super.componentWillReceiveProps(nextProps)
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('OsumAIHeader::shouldComponentUpdate')
    //     // super.shouldComponentUpdate(nextProps, nextState)
    // }
    componentWillUpdate(nextProps, nextState) {
        console.log('OsumAIHeader::componentWillUpdate')
        // super.componentWillUpdate(nextProps, nextState)
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('OsumAIHeader::componentDidUpdate')
        // super.componentDidUpdate(prevProps, prevState)
    }

}
