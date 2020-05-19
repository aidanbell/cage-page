const request = require('request');
const token = process.env.API_KEY;

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

// const show = (req, res, next) => {
//   const id = req.params.id;
//   const castOps = moviesCtrl.detailsCall({
//     url: `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${token}`
//   });
//   const movieOps = moviesCtrl.detailsCall({
//     url: `https://api.themoviedb.org/3/movie/${id}?api_key=${token}&language=en-US`
//   });
//   console.log(req.params.id);
//
//   Promise.all([castOps, movieOps]).then(([castDetails, movieDetails]) => {
//     Movie.findOne({movieId: movieDetails.id}, (err, movie) => {
//         res.render('show', {
//           movie,
//           castDetails,
//           movieDetails,
//           id,
//           user: req.user,
//           name: req.query.name
//         })
//       })
//     })
//     .catch(err => console.log(err));
// };

module.exports = { detailsCall };
