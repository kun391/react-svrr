import { Home } from 'containers/pages';
import App from 'containers/App';

const routes = [{
  component: App,
  requireLogin: '/login',
  home: '/',
  routes: [{
    path: '/',
    exact: true,
    component: Home
  },{
        path: '/login',
        exact: true,
        component: Home
      },]
}];

export default routes;
