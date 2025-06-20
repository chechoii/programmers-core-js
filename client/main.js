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
  clearContents,
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

    clearContents(userCardInner);
    renderUserList();
  });
}

userCardInner.addEventListener('click', handleDelete);

const createButton = getNode('.create');
const cancelButton = getNode('.create .cancel');
const doneButton = getNode('.create .done');

function handleCreate() {
  const pop = getNode('.pop');
  // pop.style.opacity = 1;
  // pop.style.visibility = 'initial';
  gsap.to(pop, {
    autoAlpha: 1,
  });
}

function handleCancel(e) {
  e.stopPropagation();
  gsap.to('.create .pop', { autoAlpha: 0 });
}

function handleDone(e) {
  e.preventDefault();

  const username = getNode('#nameField').value;
  const email = getNode('#emailField').value;
  const website = getNode('#siteField').value;

  choii
    .post(END_POINT, {
      name,
      email,
      website,
    })
    .then(() => {
      gsap.to('.create .pop', { autoAlpha: 0 });
      clearContents(userCardInner);
      renderUserList();
      getNode('#nameField').value = '';
      getNode('#emailField').value = '';
      getNode('#siteField').value = '';
    });
}

createButton.addEventListener('click', handleCreate);
cancelButton.addEventListener('click', handleCancel);
doneButton.addEventListener('click', handleDone);

const registerButton = getNode('.register');
const registerCancelButton = getNode('.register .cancel');
const registerDoneButton = getNode('.register .done');

function handleRegister() {
  gsap.to('.register .pop', { autoAlpha: 1 });
}

function handleRegisterCancel(e) {
  e.stopPropagation();
  gsap.to('.register .pop', { autoAlpha: 0 });
}

function handleRegisterCreate(e) {
  e.preventDefault();

  const name = getNode('#create-name').value;
  const password = getNode('#create-password').value;

  choii.post('http://localhost:3000/register', {
    email: 'mijjn@naver.com',
    password: '123123',
  });
}

registerButton.addEventListener('click', handleRegister);
registerCancelButton.addEventListener('click', handleRegisterCancel);
registerDoneButton.addEventListener('click', handleRegisterCreate);

const isLogin = await choii.post('/http://localhost:3000/login', {
  email: 'mijjn@naver.com',
  password: '123123',
});

console.log(isLogin.data);
