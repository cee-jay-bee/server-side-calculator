// requires
const express = require( 'express' );
const app = express();
const bodyParser = require ( 'body-parser' );

// uses
app.use( express.static( 'server/public'));
app.use( bodyParser.urlencoded( {extended: true}));

// globals
const port = 3000;


// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port);
})

// routes
app.get( '/inventory', ( req, res )=>{
    console.log( '/inventory GET hit');
    res.send( inventory );
})

app.post( '/inventory', (req, res)=>{
    console.log('/inventory POST HIT', req.body);
    inventory.push(req.body);
    res.sendStatus( 200 );
})