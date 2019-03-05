import { INIT_APP } from './constants';

export function init() {
  return { type: INIT_APP, payload: 1 };
}
