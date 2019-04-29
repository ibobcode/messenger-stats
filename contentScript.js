window.addEventListener('load', pageLoaded, false);
let loaded = false;

function pageLoaded() {
  // chrome.runtime.sendMessage({ type: 'CS_TAB_LOADED' });
  loaded = true;
}

function checkPageLoad(sendResponse) {
  setTimeout(
    () => (loaded ? sendResponse('LOADED') : checkPageLoad(sendResponse)),
    1000,
  );
}

function req(body, sendResponse) {
  fetch('https://www.messenger.com/api/graphqlbatch/', {
    credentials: 'include',
    method: 'POST',
    mode: 'cors',
    headers: {
      accept: '*/*',
      'accept-language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
      'cache-control': 'no-cache',
      'content-type':
        'application/x-www-form-urlencoded, application/x-www-form-urlencoded',
      pragma: 'no-cache',
      'x-msgr-region': 'LLA',
    },
    referrer: 'https://www.messenger.com/',
    referrerPolicy: 'origin-when-cross-origin',
    body,
  })
    .then(a => a.text())
    .then(a => {
      let b = a.split('"successful_results"')[0];
      b = a.substring(0, b.length - 5);
      sendResponse(JSON.parse(b));
    });
}

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'FETCH') {
    req(request.payload, sendResponse);
  } else if (request.type === 'WAIT_PAGE_LOAD') {
    checkPageLoad(sendResponse);
  } else if (request.type === 'GET_CURRENT_CONV_ID') {
    const a = document
      .getElementsByClassName('_1ht2')[0]
      .firstChild.id.split(':')[1];
    sendResponse(a);
  }
  return true;
});
