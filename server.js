const express = require('express');
const app = express();

app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'pug');


app.get('/', (req, res) => res.render(__dirname + '/views/index.pug'));

app.listen(3001, () => console.log('server listening on port 3001'));
