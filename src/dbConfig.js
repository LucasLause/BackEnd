import mongoose from "mongoose"
import config from "./config.js"

const URL = config.mongo_uri

mongoose.set('strictQuery', true)

if(mongoose.connect(URL)){
    console.log('Conectado a la base de datos')
}

