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

const HOTKEY_REDIRECTS = {
  'm': ROUTES.BORMO,
  'ь': ROUTES.BORMO,
  'c': ROUTES.CONTROL,
  'с': ROUTES.CONTROL,
  'o': ROUTES.SPELLING,
  'щ': ROUTES.SPELLING,
  'i': ROUTES.REVERSE,
  'ш': ROUTES.REVERSE,
  'v': ROUTES.CHECK,
  'м': ROUTES.CHECK
}


const ROUTES_ORDER = [ROUTES.BORMO, ROUTES.CONTROL, ROUTES.REVERSE, ROUTES.SPELLING, ROUTES.CHECK];

export {
  ROUTES,
  SWITCHABLE_ROUTES,
  HOTKEY_REDIRECTS,
  ROUTES_ORDER
}
