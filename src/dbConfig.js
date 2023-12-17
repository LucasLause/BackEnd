import mongoose from "mongoose"

const URL = 'mongodb+srv://lucaslause:smukoyluke@cluster0.3gnogvw.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.set('strictQuery', true)

if(mongoose.connect(URL)){
    console.log('Conectado a la base de datos')
}

