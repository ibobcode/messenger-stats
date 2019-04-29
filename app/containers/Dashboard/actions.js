import { INIT_APP, CHANGE_USERS_FILTER } from './constants';

export function init() {
  return { type: INIT_APP, payload: 1 };
}

export function changeUsersFilter(payload, meta) {
  return {
    type: CHANGE_USERS_FILTER,
    payload,
    meta,
  };
}
