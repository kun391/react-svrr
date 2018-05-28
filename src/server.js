import React from 'react';
import {RouterContext} from 'react-router';
import Promise from 'bluebird';
import ReactDOMServer from 'react-dom/server';
import {Server} from 'http';
import {Provider} from 'react-redux';
import cookieParser from 'cookie-parser';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router/StaticRouter';
import { ReduxAsyncConnect, loadOnServer, reducer as reduxAsyncConnect } from 'redux-connect';
import { HandleRoute } from './routes';
import { parse as parseUrl } from 'url';
import { createStore, combineReducers } from 'redux';
import serialize from 'serialize-javascript';

module.exports = {
  run: function() {
    var http = require('http');
    var path = require('path');
    var fs = require('fs');
    var express = require('express');
    var reactRouter = require('react-router');
    var ejs = require('ejs');

    const match = reactRouter.match;

    const routes = require('./routes/routes').default;
    let cssFile, jsFile, production;

    if (process.env.NODE_ENV === 'development') {
      cssFile = '/style.css';
      jsFile = '/bundle.js';
      production = false;
    } else {
      var fs=require('fs');
      var data=fs.readFileSync('./build/manifest.json');
      var manifest=JSON.parse(data);
      jsFile = '/' + manifest['app.js'];
      cssFile = '/' + manifest['app.css'];
      production = true;
    }

    const staticFiles = [
      '/*.jpeg',
      '/*.jpg',
      '/*.png',
      '/*.ico',
      '/*.svg',
      '/*.ttf',
      '/*.woff',
      '/*.woff2',
      '/*.eot',
      '/*.css',
      '/*.js',
      '/bundle.server.js'
    ];

    const app = express();
    const server = new Server(app);

    app.use(express.static('/../build'));
    // Cookies
    app.use(cookieParser());

    app.set('view engine', 'ejs');

    staticFiles.forEach(file => {
      app.get(file, (req, res) => {
        const filePath = path.resolve(`build${req.url}` );
        res.sendFile( filePath );
      });
    });

    app.get('*', (req, res) => {
      const store = createStore(combineReducers({ reduxAsyncConnect }))
      const url = req.originalUrl || req.url
      const location = parseUrl(url)

      // 1. load data
      loadOnServer({ store, location, routes })
        .then(() => {
          const context = {}

          // 2. use `ReduxAsyncConnect` to render component tree
          const appHTML = renderToString(
            <Provider store={store} key="provider">
              <StaticRouter location={location} context={context}>
                <HandleRoute routes={routes} />
              </StaticRouter>
            </Provider>
          )
          // handle redirects
          if (context.url) {
            return res.redirect(context.url);
          //   req.header('Location', context.url)
          //   return res.send(302)
          }

          // 3. render the Redux initial data into the server markup
          const html = createPage(appHTML, store)
          res.send(html)
        })
    });

    function createPage(html, store) {
      return `
        <!doctype html>
        <html>
          <body>
            <div id="app">${html}</div>

            <!-- its a Redux initial data -->
            <script type="text/javascript">
              window.__REDUX__=${serialize(store.getState())};
            </script>
          </body>
        </html>
      `
    }

    server.listen(8081, function() {
      console.log(`Listening at http://localhost:${server.address().port}`);
    });
  }
}
