export const alphaCheck = (e) => {
  const regex = /[A-Za-z]/;
  const chars = e.target.value.split('');
  const char = chars.pop();
  if (!regex.test(char)) {
    e.target.value = chars.join('');
    e.preventDefault();
    return false;
  } else {
    return true;
  }
};
