import { attr } from '../dom/attr.js';
import { getNode } from '../dom/getNode.js';
import { memo } from '../utils/memo.js';

<<<<<<< HEAD
memo('cube', () => getNode('#cube'));
=======
import { attr } from "../dom/attr.js";
import { getNode } from '../dom/getNode.js'
import { memo } from '../utils/memo.js'


>>>>>>> 95ef3c708ae24c6b7fab9c115af87e24dc931f62

memo('cube',()=> getNode('#cube'));

// const cube = document.query...

let random;
<<<<<<< HEAD
gsap.to(memo('cube'), {
  duration: 1,
  rotationX: 100,
  rotationY: -100,
  ease: 'back(10)',
});
=======
gsap.to(memo('cube'),{duration:1,rotationX:100,rotationY:-100,ease:'back(10)'});
>>>>>>> 95ef3c708ae24c6b7fab9c115af87e24dc931f62

export function diceAnimation() {
  random = gsap.utils.random([0, 1, 2, 3, 4, 5]);

<<<<<<< HEAD
  function complete() {
    attr(memo('cube'), 'dice', random + 1);
=======
export function diceAnimation (){


  random = gsap.utils.random([0,1,2,3,4,5]);

  function complete(){
		attr(memo('cube'),'dice',random + 1)
>>>>>>> 95ef3c708ae24c6b7fab9c115af87e24dc931f62
  }

  const rotationValue = [
    [0, 0], // 1
    [0, -90], // 2
    [-90, 0], // 3
    [90, 0], // 4
    [0, 90], // 5
    [-180, 0], // 6
  ];

<<<<<<< HEAD
  gsap.to(memo('cube'), {
    ease: 'linear',
    duration: 0.2,
    z: -100,
    rotationX: rotationValue[random][0],
    rotationY: rotationValue[random][1],
    onComplete: complete,
  });
}
=======
  gsap.to(memo('cube'),{ease:'linear',duration:0.2,z:-100,rotationX:rotationValue[random][0],rotationY:rotationValue[random][1],onComplete:complete})

}
>>>>>>> 95ef3c708ae24c6b7fab9c115af87e24dc931f62
