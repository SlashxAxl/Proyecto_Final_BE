import express from 'express'
import ProductManager from '../ProductManager';


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = 8080;
const productManager = new ProductManager();

app.get('/',(req,res)=>{
    res.send('<p><a href="/api/products">Lista de Productos</a></p>')
})
app.get('/api/products',(req,res)=>{
    const responseObject = {};
    
    const {offset} = req.query

    const offsetNumber = Number(offset ?? 0)
    if(isNaN(offsetNumber)){
        responseObject.status = 'error';
        responseObject.console.error = `${offset} no es un valos aceptado`;

        res.status(400).json(responseObject).end();
        return;
    }
    if (offsetNumber < 0 || offsetNumber % 1 !== 0) {
        responseObject.status = 'error';
        responseObject.error = `Error: offset parameter must be a non-negative integer.`;
    
        res.status(400).json(responseObject).end();
    
        return;
    }

})


app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
