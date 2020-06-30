if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const routes = require('./routes');
const eHandler = require('./middlewares/errHandler');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);
app.use(eHandler);

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT,() => console.log(`listening at port ${PORT}`))
}
module.exports = app