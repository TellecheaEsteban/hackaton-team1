import express from 'express'
import pkg from 'pg';
import { palletOptimization } from './src/index.js';
const { Client } = pkg;

const app = express()
const port = 3000

app.use(express.json());

app.post('/api/skus',  async (req, res) => {    
  const { skus } = req.body;
  
  if (!skus || !Array.isArray(skus)) {
    return res.status(400).json({ message: 'Se requiere un array de skus' });
  }
  const skusResponse = await skuService(skus)

  res.status(201).json(skusResponse);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'palletaizer',
  password: 'homero249',
  port: 5432,
});
client.connect();

const skuService = async (skuIds) =>{
  const placeholders = skuIds.map(sku => `'${sku}'`).join(', ');  
  const { rows: skus } = (await client.query(`SELECT * FROM sku WHERE sku.sku IN (${placeholders})`))
  console.log(skus);
  
  
  const response = await palletOptimization(skus)
  console.log(response);
  
  return response
}