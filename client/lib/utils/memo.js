// memoization

export const memo = (() => {
  const cache = {};

  return (key, fn) => {
    if (!fn) return cache[key];

    if (cache[key]) {
      console.warn(`${key} 안에는 이미 캐시된 값이 존재합니다.`);

      if (confirm('덮어쓰기 할래?')) {
        //
      }
    }

    cache[key] = fn();
  };
})();

// memo('cube')

// memo('cube',
//   ()=> {
//     return document.querySelector('#cube')
//   }
// );
// memo('cube',()=> document.querySelector('div'));

// console.log(memo('cube'));

// memo('say',()=> 'hello');

// console.log( memo('say') );

// memo('cube') // #cube
