const { atom, selector } = require('recoil');

const jwtState = atom({
  key: 'tokenState',
  default: ''
});

const userTokenState = selector({
  key: 'userTokenState',
  get: ({get}) => {
    const userToken = get(jwtState);
    return userToken;
  }
});

export { jwtState, userTokenState }