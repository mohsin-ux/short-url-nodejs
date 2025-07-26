import express from 'express';
import path from 'path';
import { router as urlRoute } from './routes/url.js';
import { connectMongoDB } from './connection.js';
import { URL } from './models/urls.js';
import { router as staticRoute } from './routes/staticRouter.js';

const app = express();
const PORT = 8001;

connectMongoDB('mongodb://localhost:27017/short-url').then(() =>
  console.log('connection esblished')
);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/url', urlRoute);
app.use('/', staticRoute);

app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log('Server Started at' + PORT));
