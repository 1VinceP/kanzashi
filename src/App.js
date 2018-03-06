import React, { Component } from 'react';
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