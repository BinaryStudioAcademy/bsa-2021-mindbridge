export const validateSelection = elements => {
  if (elements.length !== 1 && elements.find(element => element.localName[0] === 'h')) {
    return false;
  }
  return !elements.find(element => element.localName === 'br');
};


