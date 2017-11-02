import React, { Component } from 'react';
import axios from 'axios';
import { getPerson } from '../../ducks/starwars'
import { connect } from 'react-redux'
import './admin.css'

class Admin extends Component {
    constructor() {
        super();

        this.state = {
            products: [],
            notShipped: true,
            shipped: false,
            type: '',

            users: [],

            starwars: '',
            starwarsId: 0
        }

        this.resetFilter = this.resetFilter.bind(this)
        // this.getStarwars = this.getStarwars.bind(this)
    }

    componentDidMount () {
        window.scrollTo( 0, 0 )

        axios.get( '/api/products' ).then( response => {
            this.setState({
                products: response.data
            })
        })

        axios.get( '/api/all_users' ).then( response => {
            console.log('res:', response.data)
            this.setState({
                users: response.data
            })
        } )
    }

    handleInputChange( e ) {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name

        this.setState({
            [name]: value
        })
        console.log( this.state.type )
    }

    resetFilter() {
        document.getElementById('clear').reset();

        this.setState({
            notShipped: true,
            shipped: false,
            type: ''
        })
    }

    markItemShipped( id, status ) {
        let body = {status}

        axios.put( '/api/update_shipped/' + id, body ).then( response => {

            axios.get( '/api/products' ).then( response => {
                this.setState({
                    products: response.data
                })
            })
        } )
    }

    render() {

        var notShippedMap = this.state.products.map( ( products, i ) => {
            return(
                <div key={i}>
                    { this.state.notShipped && products.paid && !products.shipped && products.creatorid > 2
                    ? <div key={i} className={ 'admin-product-card ' + ( products.type === 'headband' ? 'pink-border' : products.type === 'flower' ? 'yellow-border' : 'blue-border' ) }>
                        <div className={ 'admin-order-header ' + ( products.type === 'headband' ? 'pink-header' : products.type === 'flower' ? 'yellow-header' : 'blue-header' ) }><b>{products.type.toUpperCase()}</b></div>
                    
                        { products.material ? <div><b>Style:</b> {products.material}</div> : null }
                        { products.basecolor ? <div><b>Primary Color:</b> {products.basecolor}</div> : null }
                        { products.secondarycolor ? <div><b>Secondary Color:</b> {products.secondarycolor}</div> : null }

                        { products.centerbase ? <div><b>Center Base:</b> {products.centerbase}</div> : null }
                        { products.centercandle ? <div><b>Center Candle:</b> {products.centercandle}</div> : null }
                        { products.centerglass ? <div><b>Center Glass:</b> {products.centerbase}</div> : null }

                        <div><b>Decoration</b>: {products.decoration}</div>
                        <div><b>Decoration Color</b>: {products.decocolor}</div>
                        <div><b>Decoration Color 2:</b> {products.decocolor2}</div>
                        <div><b>Request</b>: {products.request}</div>
                        <div><b>Quantity</b>: {products.quantity}</div>
                        <button className='shipped-button' onClick={ () => this.markItemShipped( products.id, true ) } ><b>Shipped!</b></button>
                        <div>
                            { this.state.users.map( ( user, i ) => {
                                return (
                                    <div key={i}>
                                        { user.id === products.creatorid
                                            ? <div className='admin-show-address'>
                                                <div><u>{user.username}</u></div>
                                                <div>{user.email}</div>
                                                <div>{user.street1}</div>
                                                { user.street2 ? <div>{user.street2}</div> : null }
                                                <div>{user.city}, {user.state} {user.zip}</div>
                                            </div>
                                            : null }
                                    </div>
                                )
                            } ) }
                        </div>
                    </div>
                    : null }
                </div>
            )
        } );

        var shippedMap = this.state.products.map( ( products, i ) => {
            return(
                <div key={i}>
                    { this.state.shipped && products.paid && products.shipped && products.creatorid > 2
                    ? <div key={i} className={ 'admin-product-card ' + ( products.type === 'headband' ? 'pink-border' : products.type === 'flower' ? 'yellow-border' : 'blue-border' ) }>
                        <div className={ 'admin-order-header ' + ( products.type === 'headband' ? 'pink-header' : products.type === 'flower' ? 'yellow-header' : 'blue-header' ) }><b>{products.type.toUpperCase()}</b></div>
                        
                        { products.material ? <div><b>Style:</b> {products.material}</div> : null }
                        { products.basecolor ? <div><b>Primary Color:</b> {products.basecolor}</div> : null }
                        { products.secondarycolor ? <div><b>Secondary Color:</b> {products.secondarycolor}</div> : null }

                        { products.centerbase ? <div><b>Center Base:</b> {products.centerbase}</div> : null }
                        { products.centercandle ? <div><b>Center Candle:</b> {products.centercandle}</div> : null }
                        { products.centerglass ? <div><b>Center Glass:</b> {products.centerbase}</div> : null }

                        <div><b>Decoration</b>: {products.decoration}</div>
                        <div><b>Decoration Color</b>: {products.decocolor}</div>
                        <div><b>Decoration Color 2:</b> {products.decocolor2}</div>
                        <div><b>Request</b>: {products.request}</div>
                        <div><b>Quantity</b>: {products.quantity}</div>
                        <button className='unship-button' onClick={ () => this.markItemShipped( products.id, false ) } ><b>JK, not shipped</b></button>
                        <div>
                            { this.state.users.map( ( user, i ) => {
                                return (
                                    <div key={i}>
                                        { user.id === products.creatorid
                                            ? <div className='admin-show-address'>
                                                <div><u>{user.username}</u></div>
                                                <div>{user.email}</div>
                                                <div>{user.street1}</div>
                                                { user.street2 ? <div>{user.street2}</div> : null }
                                                <div>{user.city}, {user.state} {user.zip}</div>
                                            </div>
                                            : null }
                                    </div>
                                )
                            } ) }
                        </div>
                    </div>
                    : null }
                </div>
            )
        } );

        const starwarsCharacter = this.props.person

        return(
            <div className='admin-body'>

                <div className='filter-box'>
                    <form id='clear'>
                        <input type='checkbox' name='notShipped' checked={this.state.notShipped} onChange={ e => this.handleInputChange( e ) } />Not Shipped
                    </form>
                    <form id='clear'>
                        <input type='checkbox' name='shipped' checked={this.state.shipped} onChange={ e => this.handleInputChange( e ) } />Shipped
                    </form>
                </div>

                { this.state.notShipped ?
                <div className='orders-box'>
                    <h2>Not Shipped</h2>
                    <br/>
                    <section className='previous-section'>
                        { notShippedMap }
                    </section>
                </div>
                : null }

                { this.state.shipped ?
                    <div className='orders-box'>
                        <h2>Shipped</h2>
                        <br/>
                        <section className='previous-section'>
                            { shippedMap }
                        </section>
                    </div>
                : null }

                <div className='random-starwars'>
                    { this.props.loading ? 'Fetching...'
                        : <a href={`http://starwars.wikia.com/wiki/${starwarsCharacter}`} target='_blank'><b>{starwarsCharacter}</b></a> 
                    }
                    <button className='starwars-button' onClick={ this.props.getPerson }>Get a character!</button>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps( state ) {

    return {
        person: state.starwars.person,
        loading: state.starwars.loading
    };
}

export default connect( mapStateToProps, {getPerson} )(Admin);