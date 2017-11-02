import React, { Component } from 'react';

class Centerpiece extends Component {

    render() {
        return(
            <div className='form-content' id='orderForm'>
                <p>Centerpiece Base: </p>
                <select name='orderCenterBase' onChange={ e => this.props.handleInputChange(e) }>
                    <option value=''>--Select a base--</option>
                    <option value='round-mirror'>Round Mirror</option>
                    <option value='square-mirror'>Square Mirror</option>
                    <option value='round-wood'>Round Wood</option>
                    <option value='square-wood'>Square Wood</option>
                    <option value='round-tile'>Round Tile</option>
                    <option value='square-tile'>Square Tile</option>
                    <option value='rocks-blue'>Blue Rocks</option>
                    <option value='rocks-white'>White Rocks</option>
                    <option value='rocks-yellow'>Yellow Rocks</option>
                </select>
                <br/>
                <p>Centerpiece Candle: </p>
                <select name='orderCenterCandle' onChange={ e => this.props.handleInputChange(e) }>
                    <option value=''>--Select a candle--</option>
                    <option value='enclosed'>Enclosed</option>
                    <option value='tall'>Tall</option>
                    <option value='short'>Short</option>
                </select>
                <br/>
                {/* <p>Centerpiece Glass: </p>
                <select name='orderCenterGlass' onChange={ e => this.props.handleInputChange(e) }>
                    <option value=''>--Select the glass--</option>
                    <option value='tall-glass'>Tall Glass</option>
                    <option value='vintage-bubbles'>Vintage Bubbles</option>
                    <option value='vintage-delicate'>Vintage Delicate</option>
                    <option value='vintage-scallop'>Vintage Scallop</option>
                </select>
                <br/> */}
                <p>Centerpiece Decor: </p>
                <select name='orderDecoration' onChange={ e => this.props.handleInputChange(e) }>
                    <option value=''>--Select a decoration type--</option>
                    <option value='rose-ring'>Ring of Roses</option>
                    <option value='small-flower'>Small Flower</option>
                    <option value='large-flower'>Large Flower</option>
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

export default Centerpiece;