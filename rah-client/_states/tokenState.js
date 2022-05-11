const { atom, selector } = require('recoil');
const uuid = require('react-uuid');

const userState = atom({
  key: 'tokenState',
  default: {id: '', token: '', userName: `Guest ${uuid().slice(0, 5)}`}
});

const userTokenState = selector({
  key: 'userTokenState',
  get: ({get}) => {
    const token = get(userState.token);
    return token;
  }
});

export { userState, userTokenState }