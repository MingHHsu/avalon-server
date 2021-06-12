export function generateUniqueID () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};

export function generateRoomNumber () {
  function r () {
    const max = 100000;
    const min = 10000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return r();
};
