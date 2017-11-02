// require('dotenv').config();

// const Auth0Strategy = require('passport-auth0');
// const express = require('express');

// app = express();

// module.exports = new Auth0Strategy({
//     domain: process.env.DOMAIN,
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_URL
// },
//     function( accessToken, refreshToken, extraParams, profile, done ) {
//         const db = app.get('db')
//         // If user exists, get their data. If not, create a new user
//         db.find_user( profile.id ).then( user => {
//             if( user[0] )
//                 return done( null, user )
//             else {
//                 db.create_user( [profile.displayName, profile.emails[0].value, profile.picture, profile.id] )
//                   .then( user => {
//                     return done( null, user[0] )
//                 })
//             };
//         } );
//         return done( null, profile )
//     }
// );