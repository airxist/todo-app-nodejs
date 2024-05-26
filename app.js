// require('dotenv').config();
require('express-async-errors')

// express
const express = require('express');
const app = express();
// rest of the packages
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// database
const connectDB = require('./db/connect');

// routers
const todosRoute = require('./routes/todosRoute');
const authRoute = require('./routes/authRoute');
const { requireAuth, authentication } = require('./middlewares/authentication');

// middlewares
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');


app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMS: 15 * 60 * 1000,
        max: 60
    })
)
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
//extra middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECURE))


//routes


app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tasks', authentication, todosRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async() => {
    try {
        await connectDB();
        app.listen(port, () => [
            console.log(`Server is listening on port ${port}`)
        ])
    } catch (error) {
        console.log(error);
    }
}

start();