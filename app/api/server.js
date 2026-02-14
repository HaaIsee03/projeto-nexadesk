const express = require('express');
const app = express();
app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/', (req, res) => res.send('NexaDesk API - v1.0.0'));
app.listen(3000, () => console.log('Rodando na porta 3000'));