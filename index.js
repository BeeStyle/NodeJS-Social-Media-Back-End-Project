import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import initApp from './src/app.router.js';
const app = express()
const port = process.env.PORT || 3000;
initApp(app, express)
app.listen(port, () => console.log(`listening on port ${port}!`))