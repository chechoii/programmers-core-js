const END_POINT = 'https://jsonplaceholder.typicode.com/users';

// const response = await fetch(END_POINT);
// if (response.ok) {
//   const data = await response.json();
// }

/* 
fetch API를 활용한 choii 함수 만들기

1. 함수로 전달받은 url을 fetch의 인수로 넣어주세요
2. 통신을 통해 전달받은 promise객체의 result를 확인해주세요
3. 원하는 데이터를 return 해주세요
4. defaultOption와 함수로부터 전달받은 인자를 병합(mixin)해주세요
*/
const obj = {
  name: 'choii',
  age: 30,
};

const defaultOptions = {
  method: 'GET',
  url: '',
  body: null,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

export const choii = async (options) => {
  const { url, ...rest } = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(url, rest);

  if (response.ok) {
    response.data = await response.json();
  }

  return response;
};

// const { data } = await choii({
//   url: END_POINT,
//   method: 'POST',
//   body: JSON.stringify(obj),
// });

choii.get = (url, options) => {
  return choii({
    url,
    ...options,
  });
};

choii.post = (url, body, options) => {
  return choii({
    method: 'POST',
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

choii.put = (url, body, options) => {
  return choii({
    method: 'PUT',
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

choii.patch = (url, body, options) => {
  return choii({
    method: 'PATCH',
    url,
    body: JSON.stringify(body),
    ...options,
  });
};

choii.delete = (url, options) => {
  return choii({
    method: 'DELETE',
    url,
    ...options,
  });
};

// choii.get();
// choii.post(END_POINT,obj);
// choii.put();
// choii.delete(`${END_POINT}/3);
