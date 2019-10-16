const request = require('request');

let detailsCall = (options) => {
  return new Promise ((resolve, reject) => {
    request(options, (err, res, body) => {
      if(!err && res.statusCode == 200) {
        resolve(JSON.parse(body));
      };
      reject(err);
    });
  });
};

module.exports = { detailsCall };
