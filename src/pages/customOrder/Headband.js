import React, { Component } from 'react';

class Headband extends Component {

    render() {
        return(
            <div className='form-content' id='orderForm'>
                    <p>Material Style: </p>
                    <select name='orderMaterial' onChange={ e => this.props.handleInputChange(e) }>
                        <option value=''>--Select a style--</option>
                        <option value='plain-ribbon'>Plain Ribbon</option>
                        <option value='crochet'>Crochet</option>
                    </select>
                    <br/>
                    <p>Primary Color: </p>
                    <select name='orderBaseColor' onChange={ e => this.props.handleInputChange(e) }>
                        <option value=''>--Select a color--</option>
                        <option value='black'>Black</option>
                        <option value='brown'>Brown</option>
                        <option value='cream'>Cream</option>
                        <option value='navy-blue'>Navy Blue</option>
                        <option value='orange'>Orange</option>
                        <option value='white'>White</option>
                    </select>
                    <br/>
                    <p>Secondary Color: </p>
                    <select name='orderSecondaryColor' onChange={ e => this.props.handleInputChange(e) }>
                        <option value=''>--Select a color--</option>
                        <option value='black'>Black</option>
                        <option value='brown'>Brown</option>
                        <option value='cream'>Cream</option>
                        <option value='navy-blue'>Navy Blue</option>
                        <option value='orange'>Orange</option>
                        <option value='white'>White</option>>
                    </select>
                    <br/>
                    <p>Decoration: </p>
                    <select name='orderDecoration' onChange={ e => this.props.handleInputChange(e) }>
                        <option value=''>--Select a decoration type--</option>
                        <option value='rose'>Rose</option>
                        <option value='butterfly'>Butterfly</option>
                        <option value='other-flower'>Other* Flower</option>
                    </select>
                    <br/>
                    <p>Decoration Color: </p>
                    <select name='orderDecoColor' onChange={ e => this.props.handleInputChange(e) }>
                        <option value=''>--Select a color--</option>
                        <option value='black'>Black</option>
                        <option value='brown'>Brown</option>
                        <option value='cream'>Cream</option>
                        <option value='navy-blue'>Navy Blue</option>
                        <option value='orange'>Orange</option>
                        <option value='white'>White</option>
                    </select>
                    <br/>
                    <p>Second Decoration Color: </p>
                    <select name='orderDecoColor2' onChange={ e => this.props.handleInputChange(e) }>
                        <option value=''>--Select a color--</option>
                        <option value='black'>Black</option>
                        <option value='brown'>Brown</option>
                        <option value='cream'>Cream</option>
                        <option value='navy-blue'>Navy Blue</option>
                        <option value='orange'>Orange</option>
                        <option value='white'>White</option>
                    </select>
                    <br/>
                    <p>Quantity (1 - 20): </p>
                    <input type='number' name='quantity' min='1' max='20' onChange={ e => this.props.handleInputChange(e) } />
                    <br/>
                    <p>Additional comments: </p>
                    <textarea name='orderRequest' maxLength='300' onChange={ e => this.props.handleInputChange(e) }/>
                    <div className='character-limit'>Characters: {this.props.countChar()}</div>
            </div>
        )
    }
}

export default Headband;