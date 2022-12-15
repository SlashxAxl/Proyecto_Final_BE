import express from 'express'
import  ProductManager from "./ProductManager.json" 

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));
const port = 8080;
const productManager = new ProductManager();

app.get('/',(req,res)=>{
    res.json(productManager);
})

app.listen(port,()=>{
    console.log('Listening on port ' + port)
})
