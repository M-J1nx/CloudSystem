const express = require('express');
const cors = require('cors');
const accountRouter = require('./routes/account');
const addressRouter = require('./routes/address');
const eventRouter = require('./routes/event');
const templateRouter = require('./routes/template');
const app = express();
const { PORT } = require('./env');

const port = PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/account', accountRouter);
app.use('/address', addressRouter);
app.use('/event', eventRouter);
app.use('/template', templateRouter);

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
