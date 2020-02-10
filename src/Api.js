const axios = require('axios');

class Api {
  static create() {
    return axios.create({
      baseURL: 'https://api.deepai.org/api/image-similarity',
      timeout: 10000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        dataType: 'json',
        'api-key': 'c200be72-934e-4643-9854-309308e33c95',
      },
    });
  }

  static get(...args) {
    let server = this.create();

    return server.get(...args);
  }

  static put(...args) {
    let server = this.create();

    return server.put(...args);
  }

  static post(args) {
    let server = this.create();
    console.log('psot', server.post(args));
    return server.post(args);
  }

  static delete(...args) {
    let server = this.create();

    return server.delete(...args);
  }
}

export default Api;
