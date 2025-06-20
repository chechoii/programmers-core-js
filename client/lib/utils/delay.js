// callback

import { getNode } from '../dom/getNode.js';
import { isNumber, isObject } from './type.js';
import { xhrPromise } from './xhr.js';
import { insertLast } from '../dom/index.js';

function delay(callback, timeout = 1000) {
  setTimeout(callback, timeout);
}

const first = getNode('.first');
const second = getNode('.second');
/* 
delay(() => {
  first.style.top = '-100px';
  second.style.top = '100px';

  delay(() => {
    first.style.transform = 'rotate(360deg)';
    second.style.transform = 'rotate(-360deg)';

    delay(() => {
      first.style.top = 0;
      second.style.top = 0;
    });
  });
}); */

// 내가 이거 끝나면 꼭 너한테 알려줄게 약속할게...

// promise

/* 
1.Promise를 사용하는 이유?
- 콜백의 한계 (콜백 지옥)
- 가독성을 위해
- 비동기 작업을 순차적으로 처리
*/

// object mixin
const defaultOptions = {
  shouldRejected: false,
  data: '성공',
  errorMessage: '알 수 없는 오류',
  timeout: 1000,
};

export function delayP(options) {
  let config = { ...defaultOptions };

  if (isNumber(options)) {
    config.timeout = options;
  }

  if (isObject(options)) {
    config = { ...defaultOptions, ...options };
  }

  const { shouldRejected, timeout, errorMessage, data } = config;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!shouldRejected) {
        resolve(data);
      } else {
        reject({ message: errorMessage });
      }
    }, timeout);
  });
}

delayP()
  .then(
    () => {
      first.style.top = '-100px';
      second.style.top = '100px';

      return delayP();
    }
    /* (result) => {
    console.log(result);
  } */
    /* ({ message }) => {
    console.log(message);
  } */
  )
  .then(() => {
    first.style.transform = 'rotate(360deg)';
    second.style.transform = 'rotate(-360deg)';

    return delayP();
  })
  .then(() => {
    first.style.top = 0;
    second.style.top = 0;
  });
// [[promise object]]

// promise 기본 구조
/* const p = new Promise((resolve, reject) => {
  if () {
    resolve('성공!');
  } else {
    reject('실패!');
  }
});

p.then((res) => {
  console.log(res);

  return p();
}).then(); */

// async await
// async : 무 조 건 !! promise object를 리턴하는 함수
// await : 코드 실행 흐름 제어
//         result의 값을 꺼낼 수 있다.

async function f() {
  return 10;
}

const a = await f();

// IIAF
(async () => {
  const a = await f();
})();

//
function delayA() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('성공');
    }, 2000);
  });
}

// const result = await delayA();

// console.log(result);

async function 라면끓이기() {
  const a = await delayP({ data: '물' });
  console.log(a);
  const b = await delayP({ data: '불켜기' });
  console.log(b);
  const c = await delayP({ data: '스프' });
  console.log(c);

  console.log('면');
  console.log('계란');
  console.log('먹기');
}

// 라면끓이기();

async function getData() {
  const data = await xhrPromise.get('https://pokeapi.co/api/v2/pokemon/50');
  const src = data.sprites.other.showdown['front_default'];

  insertLast(document.body, `<img src="${src}" alt="" />`);
}
getData();
