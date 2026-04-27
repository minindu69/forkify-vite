import { TIMEOUT_SEC } from './config.js';

// helper function
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const requestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    };

    const fetchPro = uploadData ? fetch(url, requestInit) : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    console.log(res, data);

    return data;
  } catch (error) {
    if (!navigator.onLine) {
      console.log('No internet connection');
    } else if (error.name === 'TypeError') {
      console.log('Network/CORS/Domain error');
    } else {
      console.log('Other error:', error.message);
    }

    throw error;
  }
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    // const res = await fetch(
    //   'https://forkify-api.jonas.io/api/v2/recipes?search=pizza',
    // );

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    console.log(res, data);

    return data;
  } catch (error) {
    if (!navigator.onLine) {
      console.log('No internet connection');
    } else if (error.name === 'TypeError') {
      console.log('Network/CORS/Domain error');
    } else {
      console.log('Other error:', error.message);
    }

    throw error;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const requestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    };

    const res = await Promise.race([
      fetch(url, requestInit),
      timeout(TIMEOUT_SEC),
    ]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    console.log(res, data);

    return data;
  } catch (error) {
    if (!navigator.onLine) {
      console.log('No internet connection');
    } else if (error.name === 'TypeError') {
      console.log('Network/CORS/Domain error');
    } else {
      console.log('Other error:', error.message);
    }

    throw error;
  }
};
