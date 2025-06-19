const END_POINT = 'https://jsonplaceholder.typicode.com/users';

/* 
  [readyState]
  0: uninitialized
  1: loading
  2: loaded
  3: interactive
  4: complete   성공 | 실패
*/

// callback

function xhr({
  method = 'GET',
  url = '',
  success = null,
  fail = null,
  body = null,
  headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
} = {}) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);

  if (!(method === 'DELETE')) {
    Object.entries(headers).forEach(([k, v]) => {
      xhr.setRequestHeader(k, v);
    });
  }

  xhr.addEventListener('readystatechange', () => {
    const { readyState, status, response } = xhr;

    if (readyState === 4) {
      if (status >= 200 && status < 400) {
        const data = JSON.parse(response);

        success(data);
      } else {
        console.error('데이터 로드 실패!');
        fail({ message: '오류가 발생했습니다!' });
      }
    }
  });

  xhr.send(JSON.stringify(body));
}

const obj = {
  name: 'tiger',
  age: 30,
  email: 'tiger@gmail.com',
};
/* 
xhr({
  method: 'POST',
  url: `END_POINT`,
  success: (data) => {
    console.log(data);
  },
  fail: ({ message }) => {
    console.log(message);
  },
  body: obj,
}); */

// xhr({
//   method: 'DELETE',
//   url: `${END_POINT}/4`,
//   success: (data) => {
//     console.log(data);
//   },
//   fail: ({ message }) => {
//     console.log(message);
//   },
// });

// compound pattern

/* xhr.get = (url, success, fail) => {
  xhr({
    url,
    success,
    fail,
  });
};

xhr.get(
  END_POINT,
  (data) => {
    console.log(data);
  },
  () => {}
); */

xhr.post = (url, body, success, fail) => {
  xhr({ method: 'POST', url, body, success, fail });
};

/* xhr.post(
  END_POINT,
  obj,
  () => {},
  () => {}
); */

xhr.delete = (url, success, fail) => {
  xhr({ method: 'DELETE', url, success, fail });
};

xhr.put = (url, body, success, fail) => {
  xhr({ method: 'PUT', body, success, fail });
};

xhr.patch = (url, body, success, fail) => {
  xhr({ method: 'PATCH', body, success, fail });
};

/* xhr.delete(
  `${END_POINT}/3`,
  () => {},
  () => {}
); */
