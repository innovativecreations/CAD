const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/cad', express.static(path.join(__dirname, 'public', 'cad')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(port, () => console.log(`Server running on port ${port}`));

