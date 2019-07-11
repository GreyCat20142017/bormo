import {SERVER_ROOT} from './constants';

const ROUTES = {
  MAIN: SERVER_ROOT,
  BORMO: SERVER_ROOT + 'bormotun',
  CONTROL: SERVER_ROOT + 'control',
  REVERSE: SERVER_ROOT + 'reversecontrol',
  SPELLING: SERVER_ROOT + 'spelling',
  CHECK: SERVER_ROOT + 'check',
  CONFIG: SERVER_ROOT + 'config',
  SEARCH: SERVER_ROOT + 'search'
}

const SWITCHABLE_ROUTES = [
  ROUTES.MAIN,
  ROUTES.SEARCH
];

export {
  ROUTES,
  SWITCHABLE_ROUTES
}
