import React, { Component } from 'react';
import './home.css';
import { description, homeBody, aboutBody } from '../../components/textCleanup/TextCleanup';

class Home extends Component {

    componentDidMount() {
        window.scrollTo( 0, 0 )
    }

    render() {
        return(
            <div className='home-front'>
                <div className='hero'></div>

                <div className='home-info'>{ description() }</div>
                <div className='home-body' id='small'>{ homeBody() }</div>

                {/* Display for larger screens */}
                <div className='large-home'>
                    <div className='home-body'>{ homeBody() }</div>
                    <div className='home-login'>
                        
                    <div className='home-about-body'>
                        <div>{ aboutBody() }</div>
                    </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default Home;