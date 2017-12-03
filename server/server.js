import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import useragent from 'express-useragent';
import cookieParser from 'cookie-parser';

// utils
import './utils/babel-register';

// controllers
import homepage from './controllers/homepage';

// app
const app = express();
app.set('trust proxy', 'loopback, uniquelocal');
app.set('json spaces', 2);
app.disable('etag');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(useragent.express());
app.set('views', path.join(__dirname, '..', 'server', 'views'));
app.set('view engine', 'pug');

// assets
const assetsDir = 'build';
app.use('/fonts', express.static(`assets/${assetsDir}/fonts`));
app.use('/images/sprites', express.static('assets/build/images/sprites'));
app.use('/css', express.static('assets/build/css'));
app.use('/images', express.static(`assets/${assetsDir}/images`));

// serve static built assets (build with `npm run build:app`)
app.use('/js', express.static('assets/build/js'));
app.use('/css', express.static('assets/build/css'));

app.get('/', homepage);

const port = process.env.PORT || 8080;
http.createServer(app).listen(port, () => {
  /* eslint-disable no-console */
  console.log('www is running server');
  /* eslint-enable no-console */
});
