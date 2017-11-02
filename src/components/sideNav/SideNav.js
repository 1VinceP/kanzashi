import React, { Component } from 'react'
import './sideNav.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
require('dotenv').config();


class SideNav extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            userId: null,
            email: ''
        }
    }

    componentDidMount() {
        axios.get( '/api/user' ).then( user => {
            if( user.data.username !== undefined ) {
                this.setState({
                    username: ' ' + user.data.username,
                    userId: user.data.id,
                    email: user.data.email
                })
            }
            console.log( 'user:', this.state.username )
        })


    }

    render() {

        console.log( 'navIsOpen:', this.props.displayMenu )
        return(
            <div className={ 'mobile-menu-container ' + (this.props.displayMenu ? 'show' : null) }>
                <div className='menu-header'>
                    <div>Welcome{`${this.state.username}`}!</div>
                    <button className='close-button' onClick={ () => this.props.toggleMenu() }>&#10006;</button>
                </div>

                { !this.state.username ? <a href={ process.env.REACT_APP_LOGIN } className='decor' >
                    <div className='nav-tabs' id='login'>Log In</div>
                </a> 
                : <section className='profile-tabs'>

                    <Link to={ { pathname:'/account', query: { id: this.state.userId } } }
                           className='link' onClick={ () => this.props.toggleMenu() }><div className='nav-tabs' id='account'>Account</div></Link>

                    <a href={ process.env.REACT_APP_LOGOUT } className='decor'>
                        <div className='nav-tabs' id='logout'>Log Out</div>
                    </a>
                </section>
                }
                
                

                <Link to='/' className='link' onClick={ () => this.props.toggleMenu() }><div className='nav-tabs'>Home</div></Link>

                <Link to='/gallery' className='link' onClick={ () => this.props.toggleMenu() }><div className='nav-tabs'>Gallery</div></Link>

                <Link to='/custom-order' className='link' onClick={ () => this.props.toggleMenu() }><div className='nav-tabs'>Place an Order</div></Link>

                { this.state.userId
                    ? <Link to='/cart' className='link' onClick={ () => this.props.toggleMenu() }><div className='nav-tabs'>Cart</div></Link>
                    : null
                }

                <Link to='/about' className='link' onClick={ () => this.props.toggleMenu() }><div className='nav-tabs'>About</div></Link>

                { this.state.email === 'vpalmergraphics@gmail.com'
                    ? <Link to='/admin' className='link' onClick={ () => this.props.toggleMenu() }><div className='nav-tabs'>Admin</div></Link>
                    : null
                }
            </div>
        )
    }
}

export default SideNav;