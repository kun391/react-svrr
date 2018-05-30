import React from 'react';
import {Server} from 'http';
import {Provider} from 'react-redux';
import cookieParser from 'cookie-parser';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router/StaticRouter';
import { ReduxAsyncConnect, loadOnServer} from 'redux-connect';
import { routes } from './routes';
import { parse as parseUrl } from 'url';
import configureStore from './store';
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
      '/*.otf',
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
      const store = configureStore();
      const url = req.originalUrl || req.url;
      const location = parseUrl(url);
      // 1. load data
      loadOnServer({ store, location, routes })
        .then(() => {
          const context = {}

          // 2. use `ReduxAsyncConnect` to render component tree
          const appHTML = renderToString(
            <Provider store={store}>
              <StaticRouter location={req.url} context={context}>
                <ReduxAsyncConnect routes={routes} />
              </StaticRouter>
            </Provider>
          )

          let { SEO } = store.getState();
          const state = serialize(store.getState());

          const {title, description, image} = {title : 'title', description: 'desc', image: 'http://google.com'};
          let url = ``;

          let fb_appId = 'agag';
          const sitename = "SWIVEL";

          // handle redirects
          if (context.url) {
            return res.redirect(context.url);
          } else {
            let fs = require('fs');
            let data = fs.readFileSync('./build/manifest.json');
            let manifest = JSON.parse(data);

            let jsFile = '/' + manifest['app.js'];
            let jsVendorFile = '/' + manifest['vendor.js'];
            let cssFile = '/' + manifest['app.css'];

            ejs.renderFile(
              path.resolve('./src/index.ejs' ),
              {
                jsFile,
                cssFile,
                production,
                title,
                description,
                image,
                appHTML,
                state
              }, {},
              function(err, str) {
                if (err) {
                  console.log(err);
                }
                res.writeHead(200);
                res.write(str);
                res.end();
              });
          }
        });
    });

    server.listen(3000, function() {
      console.log(`Listening at http://localhost:${server.address().port}`);
    });
  }
}
