import { call, take, put, all, fork, select } from 'redux-saga/effects';
import { loadFbDtsg, loadSelectedConv } from 'utils/requests';
import { selectConversations } from './selectors';
// import dummyData from 'utils/dummyData.json';
import {
  INIT_APP,
  STATUS_UPDATE,
  CONVS_INIT,
  CONV_CREATE,
  CONV_SET,
  CONV_UPDATE,
} from './constants';

const DTSG = process.env.DTSG || null;
const UID = process.env.UID || null;

const pause = t => new Promise(resolve => setTimeout(() => resolve(true), t));

async function sendChomeMessage(action) {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage(action, response => resolve(response));
  });
}

function getConvId(conversation) {
  const convId =
    conversation.thread_type === 'ONE_TO_ONE'
      ? conversation.thread_key.other_user_id
      : conversation.thread_key.thread_fbid;
  return typeof convId === 'number' ? convId.toString() : convId;
}

function* initApp() {
  try {
    // Used to trigger animation when landing on page
    yield pause(200);
    const isOnMessenger = yield sendChomeMessage({ type: 'IS_ON_MESSENGER' });
    if (!isOnMessenger) {
      yield put({ type: STATUS_UPDATE, payload: 0 });
      throw new Error('Not connected to messenger.');
    }
    yield put({ type: STATUS_UPDATE, payload: 1 });
    // Load dummy data
    let userInfos = {
      dtsg: DTSG,
      uid: UID,
    };
    // TODO : Fix memory leak when loading data from local storage
    // yield sendChomeMessage({
    //   type: 'LS_SET',
    //   payload: { conversations: {} },
    // });

    // FIRST STEP : Getting the DTGS and UID variables from facebook
    userInfos = yield loadFbDtsg();
    yield pause(1000);
    yield put({ type: STATUS_UPDATE, payload: 2 });

    // SECOND STEP : Checking if data already exists in local storage, and load it
    const storedData = yield sendChomeMessage({
      type: 'LS_GET',
      payload: 'conversations',
    });
    if (Object.keys(storedData.conversations).length > 0) {
      yield put({ type: CONVS_INIT, payload: storedData.conversations });
    }
    yield pause(1000);
    yield put({ type: STATUS_UPDATE, payload: 3 });

    // THIRD STEP : Getting infos about the curent conversation and updating state
    const stateConvs = yield select(selectConversations);
    let conversation = yield loadSelectedConv(
      userInfos.uid,
      userInfos.dtsg,
      100,
      Date.now(),
    );
    let convId = getConvId(conversation);
    if (stateConvs[convId]) {
      yield put({ type: CONV_SET, payload: convId });
    } else {
      yield put({ type: CONV_CREATE, payload: conversation, meta: convId });
      yield put({ type: CONV_SET, payload: convId });
      // const convsToStore = yield select(selectConversations);
      // yield sendChomeMessage({
      //   type: 'LS_SET',
      //   payload: { conversations: convsToStore },
      // });
    }
    yield pause(1000);
    yield put({ type: STATUS_UPDATE, payload: 4 });
    yield pause(1000);
    yield put({ type: STATUS_UPDATE, payload: 5 });
    while (conversation.messages.page_info.has_previous_page) {
      conversation = yield loadSelectedConv(
        userInfos.uid,
        userInfos.dtsg,
        1000,
        Number(conversation.messages.nodes[0].timestamp_precise),
      );
      convId = getConvId(conversation);
      yield put({
        type: CONV_UPDATE,
        payload: conversation.messages,
        meta: convId,
      });
      // const convsToStore = yield select(selectConversations);
      // yield sendChomeMessage({
      //   type: 'LS_SET',
      //   payload: { conversations: convsToStore },
      // });
    }
  } catch (error) {
    console.log(error);
  }
}

/* **************************************************************************** */
/* ****************************** WATCHERS ************************************ */
/* **************************************************************************** */

function* watchInitApp() {
  while (true) {
    const action = yield take(INIT_APP);
    yield call(initApp, action);
  }
}

export default function* dashboardSaga() {
  yield all([fork(watchInitApp)]);
}
