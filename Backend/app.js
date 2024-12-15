const express = require('express');
const cors = require('cors');
const accountRouter = require('./routes/account');  
const app = express();
const { PORT } = require('./env');

const port = PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/account', accountRouter);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
