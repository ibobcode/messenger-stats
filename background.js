function removeHeader(headers, name) {
  for (let i = 0; i < headers.length; i += 1) {
    if (headers[i].name.toLowerCase() === name) {
      // console.log('Removing "' + name + '" header.');
      headers.splice(i, 1);
      break;
    }
  }
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
    })
    .catch(() => sendResponse(null));
}

// eslint-disable-next-line no-undef
chrome.webRequest.onBeforeSendHeaders.addListener(
  details => {
    removeHeader(details.requestHeaders, 'origin');
    return { requestHeaders: details.requestHeaders };
  },
  // filters
  { urls: ['https://*/*', 'http://*/*'] },
  // extraInfoSpec
  ['blocking', 'requestHeaders', 'extraHeaders'],
);

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'FETCH') {
    req(request.payload, sendResponse);
  } else if (request.type === 'LS_SET')
    // eslint-disable-next-line no-undef
    chrome.storage.local.set(request.payload, () => {
      sendResponse('Saved !');
    });
  else if (request.type === 'LS_GET')
    // eslint-disable-next-line no-undef
    chrome.storage.local.get([request.payload], result => {
      sendResponse(result);
    });
  else if (request.type === 'IS_ON_MESSENGER')
    // eslint-disable-next-line no-undef
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      sendResponse(tabs[0].url.includes('messenger'));
    });
  return true;
});
