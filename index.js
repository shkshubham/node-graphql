const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const schema = require('./schema')
const keys = require('./config/keys')
const mongoose = require('mongoose')

const app = express()
app.use(bodyParser.json())


mongoose.connect(keys.mongodb.url, () => {
    console.log("connected to db");
});


app.use(bodyParser.urlencoded({ extended: true }))
app.use('/graphql', graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}))
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Node for GraphQL server running on port ${PORT}.`)
})