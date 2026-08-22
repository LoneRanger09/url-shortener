// server.js
require('dotenv').config();
const https = require('https');
const express = require('express');
const app = express();

const OriginalDate = global.Date;

const setupApp = () => {
  const cors = require('cors');
  const initializeFirebase = require('./config/firebase');
  const urlRoutes = require('./routes/urls');
  const errorHandler = require('./middleware/errorMiddleware');

  app.use(cors());
  app.use(express.json());
  app.use('/api', urlRoutes);
  app.use('/', urlRoutes);


  initializeFirebase();

  app.get('/', (req, res) => {
      res.send('Api Running...');
  });

  const indexRoutes = require('./routes/index');
  app.use('/', indexRoutes);

  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);
  app.use('/auth', authRoutes);

  const linksRoutes = require('./routes/links');
  app.use('/api/links', linksRoutes);
  app.use('/links', linksRoutes);

  app.use(errorHandler);

  if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
  }
};

const syncTimeAndStart = async () => {
  let skew = 0;
  try {
    skew = await new Promise((resolve) => {
      const req = https.get('https://www.google.com', (res) => {
        const serverDateStr = res.headers.date;
        if (serverDateStr) {
          const serverTime = new OriginalDate(serverDateStr).getTime();
          const localTime = OriginalDate.now();
          resolve(localTime - serverTime);
        } else {
          resolve(0);
        }
      });
      req.on('error', () => resolve(0));
      req.setTimeout(1500, () => {
        req.destroy();
        resolve(0);
      });
      req.end();
    });
  } catch (e) {
    console.error("Clock sync failed:", e);
  }

  if (Math.abs(skew) > 30000) {
    class MockDate extends OriginalDate {
      constructor(...args) {
        if (args.length === 0) {
          super(OriginalDate.now() - skew);
        } else {
          super(...args);
        }
      }
    }
    MockDate.now = function() {
      return OriginalDate.now() - skew;
    };
    MockDate.UTC = OriginalDate.UTC;
    MockDate.parse = OriginalDate.parse;
    global.Date = MockDate;
    console.log(`System clock skew corrected by -${Math.round(skew / 1000)}s to align with real-world time.`);
  }

  setupApp();
};

if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
  setupApp();
} else {
  syncTimeAndStart();
}

module.exports = app;