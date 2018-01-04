const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schema')
const keys = require('./config/keys')
const mongoose = require('mongoose')
const AUE = require('apollo-upload-server')
const app = express()
const jwt = require('jsonwebtoken');

app.use(bodyParser.json())
const SECRET = 'eDuQTF2eyUJ9ayMasiISv9LHZeTVcIpS'

const auth = async (req, res)=>{
  const token = req.headers.autherization || req.headers['x-access-token']
    try{
      const { user } = jwt.verify(token, SECRET);
      req.user = user
    }
    catch(err){
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
    })
    }
    req.next()
}

mongoose.connect(keys.mongodb.url, () => {
    console.log("connected to db");
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/graphql',auth, AUE.apolloUploadExpress({ uploadDir:"./" }),graphqlExpress(req =>({ schema, context:{
  user: req.user,SECRET}}
    )
  )
)
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}))

const server_port = process.env.PORT || 3000;
app.listen(server_port, function() {
    console.log("server started");
});
