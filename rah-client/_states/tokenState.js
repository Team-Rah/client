const { atom, selector } = require('recoil');
const uuid = require('uuid');

const userState = atom({
  key: 'tokenState',
  default: {id: '', token: '', userName: `Guest ${uuid.v1().slice(0, 5)}`}
});

const userTokenState = selector({
  key: 'userTokenState',
  get: ({get}) => {

    const token = get(userState.token);
    return token;
  }
});

export { userState, userTokenState }