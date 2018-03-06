const chalk = require('chalk')

module.exports = {
    getSessionUser: ( req, res, next ) => {
        if( !req.user ) {
            console.log( chalk.red('No User') )
            return res.send( null )
        }
        else if( req.user ) {
            console.log( chalk.green('User logged in:'), req.user )
            return res.send( req.user )
        }
    },

    updateAddress: ( req, res, next ) => {
        const { id, street1, street2, city, state, zip } = req.body

        req.app.get('db').update_address( [ id, street1, street2, city, state, zip ] )
            .then( (response) => res.status(200).send(response) )
            .catch( () => {
                res.status(500).send()
            } )
    },

    getAddress: ( req, res, next ) => {

        if( req.user ) {
            req.app.get('db').get_address( req.user.id ).then( (response) => {
                res.status(200).send(response)
            })
        }
        
    }
}