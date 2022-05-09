const { atom, selector } = require('recoil');

const jwtState = atom({
  key: 'tokenState',
  default: ''
});

const userTokenState = selector({
  key: 'userTokenState',
  get: ({get}) => {
    const token = get(jwtState);
    return token;
  }
});

export { jwtState, userTokenState }