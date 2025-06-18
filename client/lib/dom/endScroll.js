import { getNode } from './getNode.js';
import { isString } from '../utils/type.js';

<<<<<<< HEAD
export function endScroll({ node }) {
=======
export function endScroll(node) {
>>>>>>> 95ef3c708ae24c6b7fab9c115af87e24dc931f62
  if (isString(node)) node = getNode(node);

  node.scrollTop = node.scrollHeight;
}
