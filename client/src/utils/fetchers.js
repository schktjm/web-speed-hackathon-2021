import { gzip } from 'pako';

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const result = await fetch(url).then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.arrayBuffer();
  });
  return result;
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  const result = await fetch(url, {
    credentials: 'include',
  }).then((res) => {
    if (!res.ok) {
      throw res;
    }

    return res.json();
  });
  return result;
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const result = await fetch(url, {
    method: 'POST',
    body: file,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  }).then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
  return result;
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);
  const uint8Array = new TextEncoder().encode(jsonString);
  const compressed = gzip(uint8Array);

  const result = await fetch(url, {
    method: 'POST',
    body: compressed,
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res;
  });
  return result;
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
