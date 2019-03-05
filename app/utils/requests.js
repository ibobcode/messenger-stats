export function loadFbDtsg() {
  return fetch('https://www.facebook.com/', {
    credentials: 'include',
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      'upgrade-insecure-requests': '1',
    },
    referrerPolicy: 'no-referrer-when-downgrade',
    body: null,
    method: 'GET',
    mode: 'cors',
  })
    .then(a => a.text())
    .then(a => {
      const regexpDtsg = /name="fb_dtsg" value="(.*)"/g;
      const regexpUid = /name="xhpc_targetid" value="(.*)"/g;
      const matchDtsg = regexpDtsg.exec(a);
      const matchUid = regexpUid.exec(a);
      return {
        dtsg: matchDtsg[1].split('"')[0],
        uid: matchUid[1].split('"')[0],
      };
    });
}

async function sendChomeMessage(action) {
  return new Promise(resolve => {
    // eslint-disable-next-line no-undef
    chrome.tabs.query({ active: true, currentWindow: true }, tabs =>
      // eslint-disable-next-line no-undef
      chrome.tabs.sendMessage(tabs[0].id, action, results => resolve(results)),
    );
  });
}

export async function loadSelectedConv(uid, dtsg, nMessages, time) {
  const ret = await sendChomeMessage({
    type: 'FETCH',
    payload: `\
          batch_name=MessengerGraphQLThreadFetcher&\
          __user=${uid}&\
          fb_dtsg=${dtsg}&\
          queries=%7B%22o0%22%3A%7B%22doc_id%22%3A%221777357372370450%22%2C%22query_params%22%3A%7B%22id%22%3A%22CURRENT_CONV_ID%22%2C%22message_limit%22%3A${nMessages}%2C%22load_messages%22%3Atrue%2C%22load_read_receipts%22%3Atrue%2C%22load_delivery_receipts%22%3Atrue%2C%22before%22%3A${time}%7D%7D%7D\
        `,
  });
  return ret.o0.data.message_thread;
}

// export async function loadConvs(uid, dtsg, nConvs, time) {
//   console.log(uid, dtsg, nConvs, time);
//   const ret = await sendChomeMessage({
//     type: 'FETCH',
//     payload: `\
//       batch_name=MessengerGraphQLThreadlistFetcher&\
//       __user=${uid}&\
//       fb_dtsg=${dtsg}&\
//       queries=%7B%22o0%22%3A%7B%22doc_id%22%3A%222165227886848586%22%2C%22query_params%22%3A%7B%22limit%22%3A${nConvs}%2C%22before%22%3A${time}%2C%22tags%22%3A[%22INBOX%22]%7D%7D%7D\
//     `,
//   });
//   console.log(ret);
//   return ret.o0.data.viewer.message_threads.nodes;
// }
