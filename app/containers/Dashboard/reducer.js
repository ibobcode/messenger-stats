import { fromJS } from 'immutable';
import {
  STATUS_UPDATE,
  CONV_UPDATE,
  CONV_CREATE,
  CONV_SET,
  CONVS_INIT,
} from './constants';

export const initialState = fromJS({
  status: -1,
  conversations: {},
  activeConv: null,
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case STATUS_UPDATE:
      return state.update('status', () => action.payload);
    case CONVS_INIT:
      return state.set('conversations', fromJS(action.payload));
    case CONV_CREATE:
      return state.setIn(
        ['conversations', action.meta],
        fromJS(action.payload),
      );
    case CONV_SET:
      return state.set('activeConv', action.payload);
    case CONV_UPDATE:
      return state
        .updateIn(
          ['conversations', action.meta, 'messages', 'nodes'],
          messages => action.payload.nodes.concat(messages),
        )
        .updateIn(
          ['conversations', action.meta, 'messages', 'has_previous_page'],
          () => action.payload.has_previous_page,
        );
    default:
      return state;
  }
}

export default dashboardReducer;
