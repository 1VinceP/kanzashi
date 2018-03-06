module.exports = {

    login: function( req, res ) {
        if( !req.user )
            return res.status(404).send( 'User not found' )
        else
            return res.status(200).send( req.user )
    },

    logout: function( req, res ) {
        req.logOut(); // Logout function given from passport
        return res.redirect( 302, '/' ); // res.redirect comes from express
    }
}