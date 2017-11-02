import React, { Component } from 'react';
import axios from 'axios';
import './header.css';
import hamMenu from '../../images/ham-menu.svg';
import { Link } from 'react-router-dom';

// import SideNav from './SideNav';

class Header extends Component {
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
            // console.log( 'user:', this.state.username )
        })

    }

    render() {
        return(
            <div>
                <div className='header'>
                    <div className='side-nav-toggle' onClick={ () => this.props.toggleMenu() }><img src={hamMenu} className='ham-menu' alt='' /></div>

                    {/* Nav for larger devices */}
                    <div className='large-nav'>
                        <Link to='/' className='link'><div className='header-nav'>Home</div></Link>

                        <Link to='/gallery' className='link'><div className='header-nav'>Gallery</div></Link>

                        <Link to='/custom-order' className='link'><div className='header-nav'>Place an Order</div></Link>

                        { this.state.userId
                            ? <Link to='/cart' className='link'><div className='header-nav'>Cart</div></Link>
                            : null
                        }

                        <Link to='/about' className='link' id='header-about'><div className='header-nav'>About</div></Link>

                        { this.state.email === 'vpalmergraphics@gmail.com'
                            ? <Link to='/admin' className='link'><div className='header-nav'>Admin</div></Link>
                            : null
                        }
                        
                        {/* Login stuff */}
                        { !this.state.username ? <a href={ process.env.REACT_APP_LOGIN } className='decor' >
                            <div className='header-nav' id='login'>Log In</div>
                         </a> 
                        : <section className='header-loggedin'>
                            <Link to={ { pathname:'/account', query: { id: this.state.userId } } }
                                className='link'><div className='header-nav' id='header-account'>Account</div></Link>

                            <a href={ process.env.REACT_APP_LOGOUT } className='decor'>
                                <div className='header-nav' id='header-logout'>Log Out</div>
                            </a>
                        </section>
                        }
                    </div>

                    <Link to='/' className='link'><div className='header-title'>Kanzashi</div></Link>
                </div>
            </div>
        )
    }
}

export default Header;