<<<<<<< HEAD
// memoization
export const memo = (() => {
  const cache = {};

  return (key, fn) => {
    if (!fn) return cache[key];

    if (cache[key]) {
      console.warn(`${key} 안에는 이미 캐시된 값이 존재합니다.`);

      if (confirm('덮어쓰기 할래?')) {
=======

// memoization


export const memo = (() => {

  const cache = {};

  return (key,fn) => {
    if(!fn) return cache[key];


    if(cache[key]){
      console.warn(`${key} 안에는 이미 캐시된 값이 존재합니다.`);

      if(confirm('덮어쓰기 할래?')){
>>>>>>> 95ef3c708ae24c6b7fab9c115af87e24dc931f62
        //
      }
    }

    cache[key] = fn();
<<<<<<< HEAD
  };
})();

// memo('cube',()=> document.querySelector('#cube'));
=======
  }
})()


// memo('cube')


// memo('cube',
//   ()=> {
//     return document.querySelector('#cube')
//   }
// );
>>>>>>> 95ef3c708ae24c6b7fab9c115af87e24dc931f62
// memo('cube',()=> document.querySelector('div'));

// console.log(memo('cube'));

// memo('say',()=> 'hello');

<<<<<<< HEAD
// console.log( memo('say') );

// memo('cube') // #cube
=======

// console.log( memo('say') );






// memo('cube') // #cube




















>>>>>>> 95ef3c708ae24c6b7fab9c115af87e24dc931f62
