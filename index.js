const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const mongoose = require('mongoose')
const AUE = require('apollo-upload-server')
const jwt = require('jsonwebtoken')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { execute, subscribe } = require('graphql')


const schema = require('./schema')
const keys = require('./config/keys')


const app = express()

const SECRET = 'eDuQTF2eyUJ9ayMasiISv9LHZeTVcIpS'
const auth = async (req, res)=>{
  const token = req.headers.autherization || req.headers['x-access-token']
    try{
      const { user } = jwt.verify(token, SECRET);
      req.user = user
    }
    catch(err){
      console.log("login")
    }
    req.next()
}

mongoose.connect(keys.mongodb.url, () => {
    console.log("connected to db");
});



app.use(auth)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/graphql', AUE.apolloUploadExpress({ uploadDir:"./" }),graphqlExpress(req =>({ schema, context:{
  user: req.user,SECRET}}
    )
  )
)
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}))

const server_port = process.env.PORT || 3000;

const server = createServer(app);

server.listen(server_port, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
    }, {
      server,
      path: '/subscriptions',
    });
});


/*
app.listen(server_port, function() {
    console.log("server started");
});
*/
