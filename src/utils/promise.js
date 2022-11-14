export /**
 * @description call the multiple fetch & get the updated values from response
 * @param {*} urls
 * @param {*} keys
 */
const multiHttp = async (urls) => {
  const httpClient = urls.map((url) => fetch(url).then(res => res.json()));
  Promise.allSettled(httpClient).then(response => response.map((res) => res.value ));
};
