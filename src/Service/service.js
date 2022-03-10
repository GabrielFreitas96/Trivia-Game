// Consultas a API de Trívia
import md5 from 'crypto-js/md5';

const tokenURL = 'https://opentdb.com/api_token.php?command=request';

export const getToken = async () => {
  const data = await fetch(tokenURL);
  const response = await data.json();
  return response.token;
};

export const getQuestions = async (token) => {
  const urlRequest = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const data = await fetch(urlRequest);
  const response = await data.json();
  // console.log(response);
  if (response.results === []) {
    const { token: tokenTwo } = await getToken();
    const urlRequestTwo = `https://opentdb.com/api.php?amount=5&token=${tokenTwo}`;
    const dataTwo = await fetch(urlRequestTwo);
    const responseTwo = await dataTwo.json();
    return responseTwo;
  }
  return response;
};

export const getGravatar = async (email) => {
  const hash = md5(email).toString();
  const gravatarURL = `https://www.gravatar.com/avatar/${hash}`;
  const data = await fetch(gravatarURL);
  return data.url;
};

export const saveTokenLocalStorage = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
};
