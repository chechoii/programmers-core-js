import {
  tiger,
  delayP,
  getNode,
  END_POINT,
  insertLast,
  changeColor,
  renderSpinner,
  clearContents,
  renderUserCard,
  renderEmptyCard,
} from './lib/index.js';

/* 
  1. 태그 template 만들기 
      - `<div></div>`

  2. 태그 렌더링하기
      - insertLast
*/

/* renderUserList() */
const userCardInner = getNode('.user-card-inner');
async function renderUserList() {
  renderSpinner(userCardInner);

  // await delayP(2000)

  try {
    const { data } = await tiger.get(END_POINT);

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

/* handleDelete */
function handleDelete(e) {
  const button = e.target.closest('button');

  if (!button) return;

  const id = button.dataset.value;

  tiger.delete(`${END_POINT}/${id}`).then(() => {
    alert('삭제가 완료됐습니다!');

    clearContents(userCardInner);
    renderUserList();
  });
}

userCardInner.addEventListener('click', handleDelete);

const createButton = getNode('.create');
const cancelButton = getNode('.create .cancel');
const doneButton = getNode('.create .done');

/* handleCreate */
function handleCreate() {
  const pop = getNode('.pop');

  // pop.style.opacity = 1;
  // pop.style.visibility = 'initial';

  gsap.to(pop, { autoAlpha: 1 });
}

/* handleCancel */
function handleCancel(e) {
  e.stopPropagation();
  gsap.to('.create .pop', { autoAlpha: 0 });
}

/* handleDone */
function handleDone(e) {
  e.preventDefault();

  const name = getNode('#nameField').value;
  const email = getNode('#emailField').value;
  const website = getNode('#siteField').value;

  tiger.post(END_POINT, { name, email, website }).then(() => {
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

/* handleRegister */
function handleRegister() {
  gsap.to('.register .pop', { autoAlpha: 1 });
}

/* handleRegisterCancel */
function handleRegisterCancel(e) {
  e.stopPropagation();
  gsap.to('.register .pop', { autoAlpha: 0 });
}

// handleRegisterCreate
function handleRegisterCreate(e) {
  e.preventDefault();

  const name = getNode('#create-name').value;
  const password = getNode('#create-password').value;

  tiger.post('http://localhost:3000/register', {
    email: 'tiger@gmail.com',
    password: '123123',
  });
}

registerButton.addEventListener('click', handleRegister);
registerCancelButton.addEventListener('click', handleRegisterCancel);
registerDoneButton.addEventListener('click', handleRegisterCreate);

/* isLogin */
const isLogin = await tiger.post('http://localhost:3000/login', {
  email: 'tiger@gmail.com',
  password: '123123',
});

// alert(`${isLogin.data.user.email}님 환영합니다!`)

console.log(isLogin.data);
