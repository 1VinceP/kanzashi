import React, { Component } from 'react';
import axios from 'axios';
import Headband from './Headband';
import Flower from './Flower';
import Centerpiece from './Centerpiece';
import { attributeDescription } from '../../components/textCleanup/TextCleanup';
import './customOrder.css';

class CustomOrder extends Component {
    constructor() {
        super();

        this.state = {
            orderType: '',
            orderMaterial: '',
            orderBaseColor: '',
            orderSecondaryColor: '',
            orderDecoration: '',
            orderDecoColor: '',
            orderDecoColor2: '',
            orderCenterBase: '',
            orderCenterCandle: '',
            orderCenterGlass: '',
            orderRequest: '',
            quantity: 1,

            user: false,
            userId: null
        }

        this.submitOrder = this.submitOrder.bind(this);
        this.resetSelections = this.resetSelections.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.countChar = this.countChar.bind(this)
    }

    componentDidMount() {
        window.scrollTo( 0, 0 )

        axios.get( '/api/user' ).then( user => {
            if( user.data.username !== undefined ) {
                this.setState({
                    user: true,
                    userId: user.data.id
                })
            }
        })
        
    };

    handleInputChange( e ) {
        let value = e.target.value
        let name = e.target.name

        if( name === 'orderType' && this.state.orderType ) {
            this.resetSelections( value );
        }
        else {
            this.setState({
                [name]: value
            })
        }

        
    };

    submitOrder() {
        if( 1 > this.state.quantity || this.state.quantity > 20 ) {
            alert('The quantity must be between 1 and 20')
        } else {
            alert('Your item has been added to your cart');
            let body = {
                type: this.state.orderType,
                material: this.state.orderMaterial,
                baseColor: this.state.orderBaseColor,
                secondaryColor: this.state.orderSecondaryColor,
                decoration: this.state.orderDecoration,
                decoColor: this.state.orderDecoColor,
                decoColor2: this.state.orderDecoColor2,
                centerBase: this.state.orderCenterBase,
                centerCandle: this.state.orderCenterCandle,
                centerGlass: this.state.orderCenterGlass,
                request: this.state.orderRequest,
                creatorId: this.state.userId,
                paid: false,
                shipped: false,
                quantity: this.state.quantity
            }

            axios.post( '/api/createProd', body )
        }

        
    };

    resetSelections( value ) {
        if( window.confirm( 'This will clear your selections. Anything you have added to your cart will still be there' ) ) {
            document.getElementById("orderForm").reset();

            if( value ) {
                document.getElementById('orderType').value = value
                this.setState({
                    orderType: value,
                    orderMaterial: '',
                    orderBaseColor: '',
                    orderSecondaryColor: '',
                    orderDecoration: '',
                    orderDecoColor: '',
                    orderCenterCandle: '',
                    orderCenterBase: '',
                    orderRequest: '',
                    quantity: 1
                })
            } else {
                this.setState({
                    orderType: '',
                    orderMaterial: '',
                    orderBaseColor: '',
                    orderSecondaryColor: '',
                    orderDecoration: '',
                    orderDecoColor: '',
                    orderCenterCandle: '',
                    orderCenterBase: '',
                    orderRequest: '',
                    quantity: 1
                })
            }

            
        }

    };

    countChar() {
        let limit = 300;

        return limit - this.state.orderRequest.length
    }

    render() {
        
        return(
            <div className='order-body'>

                {/* Displays a banner prompting the user to log in so they can place an order */}
                { !this.state.user 
                    ? <section className='log-in-banner'>
                        <p>Please <a href={ process.env.REACT_APP_LOGIN } className='mini-login-link' >Log In</a> to place an order</p>
                    </section>
                    : null
                }
                
                <div className='order-div'>
                    <div className='order-header'>Please specify directions for each attribute marked with a star (*) in the comments section
                        <hr/>
                        <div className='show-him'><i>Hover over me for more info on each attribute</i>
                        <div className='show-me'>
                            { attributeDescription() }
                        </div></div>
                    </div>
                    
                    <br/>

                    <div className='order-center'>

                        {/* HERO ON LEFT FOR LARGER DISPLAYS */}
                        { this.state.orderType === 'headband' ? <div className='order-hero-head-one'></div> : null }
                        { this.state.orderType === 'flower' ? <div className='order-hero-flower-one'></div> : null }
                        { this.state.orderType === 'centerpiece' ? <div className='order-hero-center-one'></div> : null }

                        <form className='form-content' id='orderForm'>
                            <p>Product type: </p>
                            <select name='orderType' id='orderType' onChange={ e => this.handleInputChange(e) }>
                                <option value=''>--Select a type--</option>
                                <option value='headband'>Headband</option>
                                <option value='flower'>Flower</option>
                                <option value='centerpiece'>Centerpiece</option>
                            </select>
                            <br/>

                            { this.state.orderType === 'headband'
                                ? <Headband countChar={this.countChar}
                                            handleInputChange={this.handleInputChange} />
                                : this.state.orderType === 'flower'
                                    ? <Flower countChar={this.countChar}
                                              handleInputChange={this.handleInputChange} />
                                    : this.state.orderType === 'centerpiece'
                                        ? <Centerpiece countChar={this.countChar}
                                                       handleInputChange={this.handleInputChange} />
                                        : <div className='no-content'>Please select a product type to continue...</div>
                            }
                        </form>
                        
                        {/* HERO ON RIGHT FOR LARGER DISPLAYS */}
                        { this.state.orderType === 'headband' ? <div className='order-hero-head-two'></div> : null }
                        { this.state.orderType === 'flower' ? <div className='order-hero-flower-two'></div> : null }
                        { this.state.orderType === 'centerpiece' ? <div className='order-hero-center-two'></div> : null }

                    </div>

                </div>
                
                <br/>
                { this.state.user
                    ? <button className='submit-order-button' onClick={ this.submitOrder }>Submit Item to Cart</button>
                    : null
                }
                
                <button className='clear-button' onClick={ () => this.resetSelections('') }>Clear Selections</button>
            </div>
        )
    }
}

export default CustomOrder;