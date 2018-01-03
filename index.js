const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schema')
const keys = require('./config/keys')
const mongoose = require('mongoose')
const AUE = require('apollo-upload-server')
const app = express()
app.use(bodyParser.json())


mongoose.connect(keys.mongodb.url, () => {
    console.log("connected to db");
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/graphql', AUE.apolloUploadExpress({ uploadDir:"./" }),graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}))
const server_port = process.env.PORT || 3000;
app.listen(server_port, function() {
    console.log("server started");
});
