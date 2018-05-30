import { HomePage } from 'containers/pages';
import App from 'containers/App';

export default [{
  component: App,
  requireLogin: '/login',
  routes: [{
    path: '/',
    exact: true,
    component: HomePage
  },{
      path: '/login',
      exact: true,
      component: HomePage
    }]
}];
