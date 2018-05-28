import React from 'react';
import {RouterContext} from 'react-router';
import {store} from './routes/index.jsx';
import Promise from 'bluebird';
import ReactDOMServer from 'react-dom/server';
import {Server} from 'http';
import {Provider} from 'react-redux';
var cookieParser = require('cookie-parser');
import * as actions from 'actions';

module.exports = {
  run: function() {
    var http = require('http');
    var path = require('path');
    var fs = require('fs');
    var express = require('express');
    var reactRouter = require('react-router');
    var ejs = require('ejs');

    const match = reactRouter.match;

    const routes = require('./routes/routes').default();
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

    let render = function(req, renderProps, initialData) {
      return ReactDOMServer.renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      );
    }

    let getReduxPromise = (renderProps, request) => {
      let { query, params } = renderProps;

      let comp = renderProps.components[renderProps.components.length - 1];

      let at = null;

      if (request && request.cookies && request.cookies.accessToken) {
        at = request.cookies.accessToken
      }

      if (comp.fetchData) {
        return comp.fetchData({ query, params, store, at }).then(response => {
          if (request) {
            if (request.cookies && request.cookies.accessToken && request.cookies.userInfo) {
              store.dispatch(actions.auth(JSON.parse(request.cookies.userInfo)));
            } else {
              store.dispatch(actions.logout());
            }

          }
          return Promise.resolve({response, state: store.getState()})
        });
      } else {
        return Promise.resolve();
      }
    }

    const app = express();
    const server = new Server(app);

    app.use(express.static('/../build'));
    // Cookies
    app.use(cookieParser());

    app.set('view engine', 'ejs');
    //app.set('views', path.join(__dirname, './'));

    staticFiles.forEach(file => {
      app.get(file, (req, res) => {
        const filePath = path.resolve(`build${req.url}` );
        res.sendFile( filePath );
      });
    });

    app.get('*', (request, response) => {
      let htmlFilePath = path.resolve('build/index.html' );
      // let htmlFilePath = path.join(__dirname, '/build', 'index.html');
      let error = () => response.status(404).send('404 - Page not found');
      fs.readFile(htmlFilePath, 'utf8', (err, htmlData) => {
        if (err) {
          error();
        } else {
          match({routes, location: request.url}, (err, redirect, renderProps) => {
            if (err) {
              error();
            } else if (redirect) {
              response.redirect(302, redirect.pathname + redirect.search)
            } else if (renderProps) {
              let parseUrl = request.url.split('/');

              if (request.url.startsWith('/')) {
                parseUrl = request.url.replace('/', '').split('/');
              }

              if (request.cookies.userInfo) {
                const userInfo = JSON.parse(request.cookies.userInfo);

                if (parseUrl[0] && parseUrl[0] === 'profile' && userInfo) {
                  if (renderProps.params['id'].toString() !== userInfo.id.toString()) {
                    parseUrl[1] = userInfo.id.toString();
                    const url = '/' + parseUrl.join('/');
                    return response.redirect(url);
                  }
                }

                if (parseUrl[0] && parseUrl[0] === 'clubs' && userInfo) {
                  if (parseUrl.length > 1 && userInfo.get_member_club_ids.indexOf(parseInt(renderProps.params['id'])) === -1) {
                    if (userInfo.get_member_club_ids.length === 1) {
                      parseUrl[1] = userInfo.get_member_club_ids[0].toString();
                      const url = '/' + parseUrl.join('/');
                      return response.redirect(url);
                    } else {
                      return response.redirect('/clubs');
                    }
                  }
                }
              }

              getReduxPromise(renderProps, request).then((initialData) => {
                let generatedContent = initialData.response ? render(request, renderProps, initialData.response) : render(request, renderProps, {});

                const title = initialData.response.seo.title || '';
                const description = initialData.response.seo.description || '';
                const image = initialData.response.seo.image || '';

                var draft = [];

                const currentState =  initialData.state;

                if (currentState) {
                  const reduxState = JSON.stringify(currentState, function(key, value) {
                    if (typeof value === 'object' && value !== null) {
                      if (draft.indexOf(value) !== -1) {
                        // Circular reference found, discard key
                        return;
                      }
                      // Store value in our collection
                      draft.push(value);
                    }
                    return value;
                  });
                  draft = null;

                  ejs.renderFile(
                    path.resolve('./src/index.ejs' ),
                    {
                      jsFile,
                      cssFile,
                      production,
                      generatedContent,
                      reduxState,
                      title,
                      description,
                      image
                    }, {},
                    function(err, str) {
                      if (err) {
                        console.log(err);
                      }
                      response.status(200).send(str);
                    });
                } else {
                  error();
                }

              }).catch(err => {
                error();
              });

            } else {
              error();
            }
          });
        }
      })
    });

    server.listen(8081, function() {
      console.log(`Listening at http://localhost:${server.address().port}`);
    });
  }
}
