import { getNode, getStorage, setStorage, deleteStorage } from './lib/index.js';

function debounce(f, limit = 1000) {
  let timeout;

  return function (e) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      f.call(this, e);
    }, limit);
  };
}

/* 
1. 인풋 이벤트 바인딩

2. 인풋 값을 로컬 스토리지에 저장(타이핑 하는 순간순간)

3. 새로고침 시 데이터가 textarea 안에 유지될 수 있게 설정

4. clear 버튼 클릭 시 모든 데이터 제거

*/

const textField = getNode('#textField');
const clearButton = getNode('button[data-name="clear"]');

function handleText() {
  const value = this.value;

  setStorage('text', value);
}

function init() {
  getStorage('text').then((res) => {
    textField.value = res;
  });
}

textField.addEventListener('input', debounce(handleText), 300);
// window.addEventListener("DOMContentLoaded", init);
init(); //위랑 동일
