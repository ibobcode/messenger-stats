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

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'WAIT_PAGE_LOAD') {
    checkPageLoad(sendResponse);
  } else if (request.type === 'GET_CURRENT_CONV_ID') {
    const a = document
      .getElementsByClassName('_1ht2')[0]
      .firstChild.id.split(':')[1];
    sendResponse(a);
  }
  return true;
});
