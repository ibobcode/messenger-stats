// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'LS_SET')
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
