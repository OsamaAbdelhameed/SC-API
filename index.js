const mongoose = require('mongoose');
const router = require('./serverConfig');

require('dotenv').config();

const { Logging } = require('./library/logging');

const PORT = process.env.PORT || 5000;

const MONGO_UNAME = process.env.MONGO_UNAME || '';
const MONGO_PASS = process.env.MONGO_PASS || '';
const MONGO_URL = `mongodb+srv://${MONGO_UNAME}:${MONGO_PASS}@cluster0.4otsw.mongodb.net/sc_api`;

mongoose
    .connect(MONGO_URL, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logging.info('connected to MongoDB');
        StartServer();
    })
    .catch((err) => {
        Logging.err('Unable to connect');
        Logging.err(err);
    });

/** Only start the server if its connected to mongo **/
const StartServer = () => {
    router.listen(PORT, () => Logging.info(`Server is running on port ${PORT}`));
};