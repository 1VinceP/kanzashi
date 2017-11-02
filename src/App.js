import React, { Component } from 'react';
// import axios from 'axios';
import './styles/reset.css';
import './styles/App.css';

import Header from './components/header/Header'
import SideNav from './components/sideNav/SideNav'
import router from './router'
import Footer from './components/footer/Footer'

class App extends Component {
  constructor() {
    super();

    this.state = {
      displayMenu: false
    }

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidMount() {

    // axios.get( '/api/user' ).then( user => {
    //     if( user.data.username !== undefined ) {
    //         this.setState({
    //             username: ' ' + user.data.username,
    //             userId: user.data.id,
    //             email: user.data.email
    //         })
    //     }
    //     console.log( 'user:', this.state.username )
    // })

  }

  toggleMenu() {
    this.setState({
        displayMenu: !this.state.displayMenu
    })
  }

  render() {
    return (
      <div>
        <Header displayMenu={ this.state.displayMenu }
                toggleMenu={ this.toggleMenu }/>
        <SideNav displayMenu={ this.state.displayMenu }
                  toggleMenu={ this.toggleMenu }/>
        <div className='buffer'/>
        { router }
        <Footer />
      </div>
    );
  }
}

export default App;