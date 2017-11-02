import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import './checkout.css'

class Checkout extends Component {
    constructor() {
        super();

        this.state = {
            redirect: false,

            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: '',

            price: 0
        }
    }
    
    componentDidMount() {
        window.scrollTo( 0, 0 )

        axios.get( '/api/getaddress' ).then( response => {
            console.log( response )
            this.setState({
                street1: response.data[0].street1,
                street2: response.data[0].street2,
                city: response.data[0].city,
                state: response.data[0].state,
                zip: response.data[0].zip
            })
        })

        let amount = this.props.location.query.quantity

        if( amount < 15 )
            amount *= 1200
        else
            amount *= 900

        this.setState({
            price: amount
        })
    }

    onPurchaseConfirmation() {
        // let data = {
        //     username: 'vincent',
        //     email: 'meisadude@gmail.com',
        //     message: 'This is coming from Nodemailer!'
        // }
        // axios.post( 'http://localhost:9060/api/send_email', data ).then( response => {
        //     console.log( response );
        // })

        axios.put( '/api/update_paid/' + this.props.location.query.userId )
    }

    onToken = (token) => {
        token.card = void 0;
        console.log('token', token);
        axios.post('http://localhost:9060/api/payment', { token, amount: this.state.price /* the amount actually charged*/ } ).then(response => {
            this.onPurchaseConfirmation();
            this.setState({
                redirect: true
            })
            alert('Thanks for your purchase')
        });
    }

    render() {

        if( this.state.redirect )
            return <Redirect to='/gallery' />

        return(
            <div className='checkout-body'>

                <section className='checkout-address'>
                    <div>{this.state.street1}</div>
                    { this.state.street2 ? <div>{this.state.street2}</div> : null }
                    <div>{this.state.city}</div>
                    <div>{this.state.state}</div>
                    <div>{this.state.zip}</div>
                    <h2>If your address is not correct, please update it on your "Account" page before completing your purchase</h2>
                </section>

                <h2>Your total is ${this.state.price / 100}.00</h2>

                <StripeCheckout
                    token={this.onToken}
                    stripeKey={ 'pk_test_k1ZmSbaquoQabEKXdT1RBe3x' }
                    amount={this.state.price} // The amount displayed at the bottom of the payment form
                />

                {/* <div onClick={ this.onPurchaseConfirmation }>Send email</div> */}

            </div>
        )
    }
}

export default Checkout;