const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { Logging } = require('./library/logging');

const postRoutes = require("./routes/post.js");
const requestRoutes = require("./routes/request.js");

const router = express();

router.use(async(req, res, next) => {
    /** Log the Request */
    Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the Response */
        Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    });

    await next();
});

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.urlencoded({ extended: true }));

/** Rules of our API */
router.use(async(req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    await next();
});

/** Routes */
router.use('/post', postRoutes);
router.use('/request', requestRoutes);

/** Healthcheck */
router.get('/ping', (req, res) => res.status(200).json({ message: 'pong' }));

/** Error Handling */
router.use((req, res) => {
    const error = new Error('not found');
    Logging.err(error);

    return res.status(404).json({ message: error.message });
});

module.exports = router;