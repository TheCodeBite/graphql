var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tienda',
    port: '3306'
})

connection.connect();

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'tienda'
    }
  });

const addProduct = (name, description) =>{
    console.log("Agregando producto..."+name+description) 
    return knex('products').insert({name: name, description: description}).then((response)=>{
        console.log("Respuesta: ",response)
        let retorno = {id: response[0], name: name, description:description}
        console.log("Retorno: ",retorno)
        return retorno
    })
}

const getProducts = () =>{
    return new Promise((resolve,reject)=>{
        let sql = "SELECT * from products;"
        connection.query(sql,(err,results)=>{
            if(err)reject(err)
            resolve(results)
            console.log(results)
        })
    })
}

const deleteProduct = (id) =>{
    knex('products').where('id', id.id).del().then((response)=>{
        console.log(response)
    }).catch((err) => { console.log( err); throw err })
    .finally(() => {
        console.log("PRODUCTO ELIMINADO")
        knex.destroy();
    });
}

const updateProduct = (id, name, description) =>{
    return knex('products').where('id',id).update({name: name, description: description}).then((response)=>{
        console.log("response",response)
        let respuesta = {id:id, name: name, description:description}
        return respuesta
    })
}

module.exports = {
    getProducts,
    addProduct,
    deleteProduct,
    updateProduct
}