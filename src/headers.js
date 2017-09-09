import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import { PageHeader, Navbar, Nav, NavItem} from 'react-bootstrap'
import styles from './styles'
import OsumAIHeaderLogin from './header_login'

export default class OsumAIHeader extends Component {
    render () {
        return (
            <div>
                <PageHeader>OsumAI</PageHeader>
                <Navbar>
                    <Nav>
                        <NavItem eventKey={1} href="#"><Link to="/">トップ</Link></NavItem>
                        <NavItem eventKey={2} href="#"><Link to="/soudan">お住まい相談</Link></NavItem>
                        <NavItem eventKey={3} href="#"><Link to="/favorite">お気に入り</Link></NavItem>
                        <NavItem eventKey={4} href="#"><Link to="/survey">アンケート</Link></NavItem>
                    </Nav>
                    <Nav pullRight>
                        <OsumAIHeaderLogin/>
                    </Nav>
                </Navbar>
                <br style={styles.clearbath}/>
                <div>{this.props.title}</div>
            </div>
        )
    }
}
