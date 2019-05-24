import { call, take, put, all, fork } from 'redux-saga/effects';
import {
  loadFbDtsg,
  loadMessagesFromConv,
  loadConvsInfos,
  getConvId,
} from 'utils/requests';
import dummyConv from 'utils/dummyConv.json';
import dummyDetails from 'utils/dummyDetails.json';
import {
  INIT_APP,
  STATUS_UPDATE,
  CONVS_RETREIVE,
  CONVS_META,
  CONV_SET,
  PUSH_DATA,
} from './constants';

const pause = t => new Promise(resolve => setTimeout(() => resolve(true), t));

async function sendChomeMessage(action) {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    chrome.runtime.sendMessage(action, response => resolve(response));
  });
}

function* initApp() {
  try {
    // Used to trigger animation when landing on page
    const isOnMessenger = yield sendChomeMessage({ type: 'IS_ON_MESSENGER' });
    if (!isOnMessenger) {
      yield put({
        type: STATUS_UPDATE,
        payload: 0,
        meta: {
          message: 'You have to be on a messenger tab for the plugin to work',
          link: 'https://www.messenger.com',
          target: '_blank',
          action: 'Click here to open a messenger tab',
        },
      });
      return null;
    }
    yield put({ type: STATUS_UPDATE, payload: 1 });
    // Load dummy data
    let userInfos = {
      dtsg: null,
      uid: null,
    };
    // TODO : Fix memory leak when loading data from local storage
    // yield sendChomeMessage({
    //   type: 'LS_SET',
    //   payload: { conversations: {} },
    // });

    // FIRST STEP : Getting the DTGS and UID variables from facebook
    try {
      userInfos = yield loadFbDtsg();
    } catch (e) {
      yield put({
        type: STATUS_UPDATE,
        payload: 0,
        meta: {
          message:
            'You mush be already logged once to facebook on this computer',
          link: 'https://www.facebook.com',
          target: '_blank',
          action: 'Click here to open the facebook login page',
        },
      });
      return null;
    }
    yield pause(1000);
    yield put({ type: STATUS_UPDATE, payload: 2 });

    // SECOND STEP : Checking if data already exists in local storage, and load it
    const storedData = yield sendChomeMessage({
      type: 'LS_GET',
      payload: 'conversations',
    });
    if (
      storedData.conversations &&
      Object.keys(storedData.conversations).length > 0
    ) {
      yield put({ type: CONVS_RETREIVE, payload: storedData.conversations });
    }
    yield pause(1000);
    yield put({ type: STATUS_UPDATE, payload: 3 });

    // THIRD STEP : Getting infos about the curent conversation and updating state
    const convId = yield getConvId();
    const conversationsInfos = yield loadConvsInfos(
      userInfos.uid,
      userInfos.dtsg,
    );
    yield put({ type: CONVS_META, payload: conversationsInfos, meta: convId });
    yield put({ type: CONV_SET, payload: convId });
    yield put({ type: STATUS_UPDATE, payload: 4 });
    let firstLoad = true;
    let conversation = null;
    while (
      conversation === null ||
      conversation.messages.page_info.has_previous_page
    ) {
      conversation = yield loadMessagesFromConv(
        userInfos.uid,
        userInfos.dtsg,
        convId,
        1000,
        conversation
          ? Number(conversation.messages.nodes[0].timestamp_precise)
          : Date.now(),
      );
      if (firstLoad) {
        yield put({ type: STATUS_UPDATE, payload: 5 });
        firstLoad = false;
      }
      yield put({
        type: PUSH_DATA,
        payload: conversation,
      });
      // const convsToStore = yield select(selectConversations);
      // yield sendChomeMessage({
      //   type: 'LS_SET',
      //   payload: { conversations: convsToStore },
      // });
    }
  } catch (error) {
    yield put({
      type: STATUS_UPDATE,
      payload: 0,
      meta: {
        message: 'An unknown error occured, try to refresh your messenger tab',
        link: '',
        target: '',
        action: '',
      },
    });
  }
  return null;
}

function* mockApp() {
  // yield pause(200);
  // yield put({
  //   type: STATUS_UPDATE,
  //   payload: 0,
  //   meta: {
  //     message: 'An unknown error occured',
  //     link: '.',
  //     target: '',
  //     action: 'Click here to reload messenger',
  //   },
  // });
  yield put({
    type: CONVS_META,
    payload: dummyDetails,
    meta: dummyConv.thread_key.thread_fbid,
  });
  yield put({
    type: CONV_SET,
    payload: dummyConv.thread_key.thread_fbid,
  });
  yield put({
    type: PUSH_DATA,
    payload: dummyConv,
  });
  yield put({ type: STATUS_UPDATE, payload: 5 });
}

/* **************************************************************************** */
/* ****************************** WATCHERS ************************************ */
/* **************************************************************************** */

function* watchInitApp() {
  while (true) {
    const action = yield take(INIT_APP);
    if (process.env.NODE_ENV === 'development') {
      yield call(mockApp, action);
    } else {
      yield call(initApp, action);
    }
  }
}

export default function* dashboardSaga() {
  yield all([fork(watchInitApp)]);
}
