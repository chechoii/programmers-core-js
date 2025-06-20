import {
  choii,
  delayP,
  getNode,
  END_POINT,
  insertLast,
  changeColor,
  renderSpinner,
  renderUserCard,
  renderEmptyCard,
} from './lib/index.js';

/* 
  1. 태그 template 만들기 
      - `<div></div>`

  2. 태그 렌더링하기
      - insertLast
*/

const userCardInner = getNode('.user-card-inner');

async function renderUserList() {
  renderSpinner(userCardInner);

  // await delayP(2000)

  try {
    const { data } = await choii.get(END_POINT);

    // getNode('.loadingSpinner').remove();

    gsap.to('.loadingSpinner', {
      opacity: 0,
      duration: 1,
      onComplete() {
        this._targets[0].remove();
        data.forEach((user) => renderUserCard(userCardInner, user));
        changeColor('.user-card');

        gsap.from('.user-card', {
          opacity: 0,
          stagger: 0.1,
          x: -30,
        });
      },
    });
  } catch {
    gsap.to('.loadingSpinner', {
      opacity: 0,
      duration: 1,
      onComplete() {
        this._targets[0].remove();
        renderEmptyCard(userCardInner);
      },
    });
  }
}

renderUserList();

function handleDelete(e) {
  const button = e.target.closest('button');

  if (!button) return;

  const id = button.dataset.value;

  choii.delete(`${END_POINT}/${id}`).then(() => {
    alert('삭제가 완료됐습니다');
  });
}

userCardInner.addEventListener('click', handleDelete);
