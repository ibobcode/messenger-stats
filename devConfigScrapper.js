function loadFbDtsg() {
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

async function scrap() {
  const res = await loadFbDtsg();
  console.log(res);
}

scrap();
