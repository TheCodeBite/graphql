var express = require('express')
var app = express()

var graphqlHTTP = require('express-graphql')
var {buildSchema} = require('graphql')

var { getProducts, addProduct, updateProduct, deleteProduct } = require("./data/products")

var cors = require("cors")

//Add cors
app.use(cors())


var schema = buildSchema(`
    type Product{
        description: String,
        name: String,
        id: Int
    },
    type Query {
        hello: String,
        products: [Product],
        product(id: Int!): Product,
    },
    type Mutation{
        addProduct(name: String!, description: String!): Product,
        deleteProduct(id:Int!): Product,
        updateProduct(id:Int!, name:String!, description:String!): Product
    }`)


var root = {
    products: ()=>{
        return getProducts()
    },
    addProduct: args =>{
        const {name, description} = args;
        return addProduct(name, description)
    },
    deleteProduct: args=> {
        const id = args;
        return deleteProduct(id)
    },updateProduct: args =>{
        const {id,name,description}=args;
        return updateProduct(id,name,description);
    }  
}

//Create Server Graphql
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
    })
)

app.listen(4000)