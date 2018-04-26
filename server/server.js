require('dotenv').config();
const Auth0Strategy = require('passport-auth0');

const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive')
    , session = require('express-session')
    , chalk = require('chalk')
    , passport = require('passport')
    , stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const auth_controller = require('./controllers/auth_controller')
    , products_controller = require('./controllers/products_controller')
    , session_controller = require('./controllers/session_controller');

let app = express();

app.use( express.static( `${__dirname}/../build` ) )

app.use( bodyParser.json() );
app.use( cors() );
app.use( session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}) );
app.use( passport.initialize() );

app.use( passport.session() );
passport.use( module.exports = new Auth0Strategy({
    domain: process.env.DOMAIN,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function( accessToken, refreshToken, extraParams, profile, done ) {
        const db = app.get('db')
        // If user exists, get their data. If not, create a new user
        db.find_user( profile.id ).then( user => {
            if( user[0] )
                return done( null, user )
            else {
                db.create_user( [profile.displayName, profile.emails[0].value, profile.id] )
                  .then( user => {
                    return done( null, user )
                })
            };
        } );
    }) );


///////////// Connecting database
massive( process.env.DATABASE_URL ).then( db => {
    console.log( chalk.magenta('Connected to Database!') );
        app.set( 'db', db );
    //     app.get('db').init.seed().then( res => console.log( res ) )
    // } ).catch( err => {
    //     console.log( err );
} )

console.log( process.env.NODE_ENV )

///////////////////////////////////////////////////////////////// AUTHENTICATION
passport.serializeUser( ( user, done ) => {
    done( null, user )
} );
passport.deserializeUser( ( obj, done ) => {
    done( null, obj[0] )
} );

// AUTH CONTROLLER
app.get( '/auth', passport.authenticate( 'auth0' ) );
app.get( '/auth/callback', passport.authenticate( 'auth0', {
    successReturnToOrRedirect: process.env.SUCCESS,
    failureRedirect: process.env.FAILURE,
    failureFlash: true
}) );
app.get( '/auth/me', auth_controller.login );
app.get( '/auth/logout', auth_controller.logout );

// SESSION CONTROLLER
app.get( '/api/user', session_controller.getSessionUser )
app.put( '/api/updateaddress', session_controller.updateAddress )
app.get( '/api/getaddress', session_controller.getAddress )

///////////////////////////////////////////////////////////////// END AUTHENTICATION

///////////////////////////////////////////////////////////////// DATABASE CALLS
// GET ALL USERS
app.get( '/api/all_users', (req, res, next ) => {
    req.app.get('db').get_all_users()
        .then( response => res.status(200).send(response) )
} )

// GET ALL PRODUCTS
app.get( '/api/products', products_controller.retrieveAll )
// ADD NEW PRODUCT
app.post( '/api/createProd', products_controller.createProduct )
// GET ITEMS FOR USER'S CART
app.get( '/api/cart/:id', products_controller.getCart )
// DELETE FROM CART/DB
app.delete( '/api/delete/:id', products_controller.delete )
// UPDATE SHIPPED STATUS
app.put( '/api/update_shipped/:id', products_controller.updateShipped )
// UPDATE PAID
app.put( '/api/update_paid/:id', products_controller.updatePaid )
// UPDATE QUANTITY
app.put( '/api/update_quantity/:id', products_controller.updateQuantity )

///////////////////////////////////////////////////////////////// END DATABASE CALLS

///////////////////////////////////////////////////////////////// STRIPE STUFF
app.post('/api/payment', function(req, res, next){
    // convert amount to pennies
    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
      if(amountArray[i] === ".") {
        if (typeof amountArray[i + 1] === "string") {
          pennies.push(amountArray[i + 1]);
        } else {
          pennies.push("0");
        }
        if (typeof amountArray[i + 2] === "string") {
          pennies.push(amountArray[i + 2]);
        } else {
          pennies.push("0");
        }
          break;
      } else {
          pennies.push(amountArray[i])
      }
    }
    const convertedAmt = parseInt(pennies.join(''));
  
    const charge = stripe.charges.create({
        amount: convertedAmt, // amount in cents, again
        currency: 'usd',
        source: req.body.token.id,
        description: 'Test charge from react app'
    }, function(err, charge) {
        if (err) return res.sendStatus(500)
        return res.sendStatus(200);
        // if (err && err.type === 'StripeCardError') {
        //   // The card has been declined
        // }
    });
  });
///////////////////////////////////////////////////////////////// END STRIPE STUFF




let port = 9060;
const portChalk = chalk.cyan.underline
app.listen( port, () =>{
    console.log( portChalk(`listening_on_port_${port}`) )
} )