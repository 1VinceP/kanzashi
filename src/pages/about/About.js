import React, { Component } from 'react'
import { aboutBody } from '../../components/textCleanup/TextCleanup';
import './about.css'

class About extends Component {
    constructor() {
        super();

        this.state = {

        }
    }
    
    componentDidMount() {
        window.scrollTo( 0, 0 )
    }

    render() {
        return(
            <div>
                <div className='body'>
                    <div className='about-hero'/>
                    <div>{ aboutBody() }</div>
                </div>
            </div>
        )
    }
}

export default About;