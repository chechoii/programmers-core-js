import { isString } from '../utils/type.js';

console.log('storage');

const { localStorage: storage } = window;

const obj = {
  name: 'tiger',
  age: 30,
  do() {
    return 'nice';
  },
};

storage.setItem('user', JSON.stringify(obj));
// storage.setItem('name', 'tiger');

// console.log(JSON.parse(storage.getItem('user')));

export function setStorage(key, value) {
  return new Promise((resolve, reject) => {
    if (isString(key)) {
      storage.setItem(key, JSON.stringify(value));
      resolve();
    } else {
      reject({
        message: 'setStorage 함수의 첫번째 인수는 문자 타입 이어야 합니다.',
      });
    }
  });
}

export function getStorage(key) {
  return new Promise((resolve, reject) => {
    if (isString(key)) {
      resolve(JSON.parse(storage.getItem(key)));
    } else {
      reject({ message: 'getStorage 함수의 인수는 문자 타입이어야 합니다.' });
    }
  });
}

// setStorage('user', obj).then(() => {
//   // ...
//   console.log('done');
// });

const { name, age } = getStorage('user');
console.log(name, age);

export function deleteStorage(key) {
  return new Promise((resolve, reject) => {
    !key ? storage.clear() : storage.removeItem(key);
    resolve();
  });
}

// deleteStorage();
