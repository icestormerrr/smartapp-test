import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import historyRouter from '../router';
import { ui } from './ui';
import { dashboard } from './dashboard';
import { ApplicationState } from '../../types/reducers';

const rootReducer = combineReducers<ApplicationState>({
  ui,
  router: connectRouter(historyRouter),
  dashboard,
});

export default rootReducer;