const chalk = require('chalk')

module.exports = {
    getSessionUser: ( req, res, next ) => {
        if( !req.user ) {
            console.log( chalk.red('No User') )
            return res.send( null )
        }
        else if( req.user ) {
            console.log( chalk.green('It Works!'), req.user )
            return res.send( req.user )
        }
    },

    updateAddress: ( req, res, next ) => {
        const { id, street1, street2, city, state, zip } = req.body

        req.app.get('db').update_address( [ id, street1, street2, city, state, zip ] )
            .then( (response) => res.status(200).send(response) )
            .catch( () => {
                console.log('request failed')
                console.log( id, street1, street2, city, state, zip )
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

    // getAllUsers: ( req, res, next ) => {

    //     req.app.get('db').all_users()
    //         .then( response => res.status(200).send(response) )
    // }
}