const chalk = require('chalk');

module.exports = {

    retrieveAll: ( req, res, next ) => {

        req.app.get('db').get_products()
            .then( response => {
                // console.log(response)
                res.status(200).send( response )
            })
    },

    createProduct: ( req, res, next ) => {
        const { type, material, baseColor, secondaryColor, decoration, decoColor, decoColor2, centerBase, centerCandle, centerGlass, request, creatorId, paid, shipped, quantity } = req.body

        req.app.get('db').create_product( [type, material, baseColor, secondaryColor, decoration, decoColor, decoColor2, centerBase, centerCandle, centerGlass, request, creatorId, paid, shipped, quantity] )
            .then( response => {
                console.log( chalk.yellow('New product added') )
                res.status(200).send(response)
            } )
    },

    getCart: ( req, res, next ) => {
        // console.log( req.params.id )

        req.app.get('db').get_user_cart( req.params.id )
            .then( response => res.status(200).send(response) )
            // .catch( console.log( chalk.red('Cart failed') ) )
    },

    delete: ( req, res, next ) => {

        req.app.get('db').delete_item( req.params.id )
            .then( response => {
                console.log( 'made it here at least' )
                res.status(200).send(response)
            } )
    },

    updateShipped: ( req, res, next ) => {

        console.log( req.params )

        req.app.get('db').update_shipped( [req.params.id, req.body.status] )
            .then( response => {
                res.status(200).send(response)
            } )
    },

    updatePaid: ( req, res, next ) => {
        
        req.app.get('db').update_paid( req.params.id )
            .then( response => {
                res.status(200).send(response)
            })
    },

    updateQuantity: ( req, res, next ) => {

        req.app.get('db').update_quantity( [req.params.id, req.body.amount] )
            .then( response => {
                res.status(200).send(response)
            } )
    }
}