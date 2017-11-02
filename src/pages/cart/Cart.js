import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './cart.css';

class Cart extends Component {
    constructor() {
        super();

        this.state = {
            cart: [],
            cartAmount: 0,
            userId: 0
        }
    }
    
    componentDidMount() {
        window.scrollTo( 0, 0 )

        axios.get( '/api/user' ).then( user => {
            if( user.data.username !== undefined ) {
                this.setState({
                    userId: user.data.id
                })
            }
            console.log( 'userId:', this.state.userId )
        }).then( () => { axios.get( `/api/cart/${this.state.userId}` )
            .then( response => {
                this.setState({
                    cart: response.data
                })
                console.log( response )
                this.countCart( response.data )
        } ) } )
        
    };

    countCart( cart ) {
        let amount = 0

        for( var i = 0; i < cart.length; i++ ) {
            if( !cart[i].paid )
                amount += cart[i].quantity
        }

        this.setState({
            cartAmount: amount
        })

        console.log( 'amount on state:', this.state.cartAmount )
    };

    deleteItem( id ) {
        axios.delete( `/api/delete/${id}` )
            .then( () => { axios.get( `/api/cart/${this.state.userId}` ).then( response => {
                this.setState({
                    cart: response.data
                })
                this.countCart( response.data )
            } ) } )
        console.log( 'deleted' )
    };

    render() {

        var cartMap = this.state.cart.map( ( cart, i ) => {
            return(
                ( !cart.paid
                ? <div key={i} className={'cart-product-card ' + ( cart.type === 'headband' ? 'pink-border' : cart.type === 'flower' ? 'yellow-border' : 'blue-border' ) } >
                    <div className={'cart-order-header ' + ( cart.type === 'headband' ? 'pink-header' : cart.type === 'flower' ? 'yellow-header' : 'blue-header' ) }><b>{cart.type.toUpperCase()}</b></div>

                    { cart.material ? <div><b>Style:</b> {cart.material}</div> : null }
                    { cart.basecolor ? <div><b>Primary Color:</b> {cart.basecolor}</div> : null }
                    { cart.secondarycolor ? <div><b>Secondary Color:</b> {cart.secondarycolor}</div> : null }

                    { cart.centerbase ? <div><b>Center Base:</b> {cart.centerbase}</div> : null }
                    { cart.centercandle ? <div><b>Center Candle:</b> {cart.centercandle}</div> : null }
                    { cart.centerglass ? <div><b>Center Glass:</b> {cart.centerbase}</div> : null }

                    <div><b>Decoration:</b> {cart.decoration}</div>
                    <div><b>Decoration Color:</b> {cart.decocolor}</div>
                    <div><b>Decoration Color 2:</b> {cart.decocolor2}</div>
                    <div><b>Request:</b> {cart.request}</div>
                    <div><b>Quantity:</b> {cart.quantity}</div>
                    <button className='delete-button' onClick={ () => this.deleteItem( cart.id ) }>&#10006;</button>
                </div>
                : console.log( 'Cannot display cart' ) )
            )
        } )

        console.log( 'cart:', this.state.cart )
        console.log( 'cartMap:', cartMap )
        return(
            <div className='cart-body'>
                <br/><br/>

                <h1>This is Your Cart</h1>

                { cartMap.length > 0 ?
                    <div className='cart-card'>
                        { cartMap }
                    </div>
                : null
                }

                <div className='cart-total-card'>
                    <h2 className='cart-total-style'>
                        Total: ${ this.state.cartAmount < 15 ? this.state.cartAmount * 12
                        : this.state.cartAmount * 9 }.00</h2>
                </div>

                <Link to={ { pathname: '/checkout', query: { quantity: this.state.cartAmount, userId: this.state.userId } } }>
                    <button className='checkout-button'>Checkout</button>
                </Link>
            </div>
        )
    }
}

export default Cart;