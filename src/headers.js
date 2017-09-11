import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import { Jumbotron, PageHeader, Navbar, Nav, NavItem} from 'react-bootstrap'
import styles from './styles'
import OsumAIHeaderLogin from './header_login'

export default class OsumAIHeader extends Component {

    render () {
        if (window.localStorage['sns_auth_token'] != '') {
            return (
                <div>
                    <Jumbotron style={styles.osumai_bg}>
                        <h1 style={styles.osumai_banner_color}>Osum<span style={styles.osumai_banner_color_ai}>AI</span></h1>
                    </Jumbotron>
                    <OsumAIHeaderLogin/>
                </div>
            )
        }
        return (
            <div>
                <Jumbotron style={styles.osumai_bg}>
                    <h1 style={styles.osumai_banner_color}>Osum<span style={styles.osumai_banner_color_ai}>AI</span></h1>
                </Jumbotron>
                <OsumAIHeaderLogin/>
            </div>
        )
    }
}
