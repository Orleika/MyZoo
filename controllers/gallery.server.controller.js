/**
 * Module dependencies.
 */
var async = require('async'),
  models = require('../models'),
  User = models.User,
  Gallery = models.Gallery;

var getImagePath = function (imagePath) {
  var path;

  imagePath = imagePath.split('\\');
  console.log(imagePath[2]);
  path = process.env.HOST + '/images/' + imagePath[2];

  return path;
};

/**
 * Create a Gallery
 */
exports.create = function (req, res) {
  var body = req.body,
    imageData = req.files.image;
  // soundData = req.files.sound;
  console.log(req.files);
  console.log(req.body);

  if (!body.id || !imageData) {
    res.status(400).send('Bad Request');
  } else {
    async.waterfall([
      function (callback) {
        User.findById(body.id, function (err, user) {
          if (err) {
            callback(err);
          } else {
            callback(null, user.name);
          }
        });
      },
      function (uname, callback) {
        var gallery = new Gallery();
        gallery.uid = body.id;
        gallery.uname = uname;
        gallery.name = body.name;
        gallery.text = body.text;
        // gallery.type = body.type;
        gallery.image = getImagePath(imageData.path);
        // gallery.sound = soundData;

        gallery.save(function (err) {
          if (err) {
            callback(err);
          } else {
            res.json(gallery);
            callback(null);
          }
        });
      },
    ], function (err) {
      if (err) {
        console.log(err);
        res.status(400).send('Bad Request');
      }
    });
  }
};

/**
 * Show the Gallery
 */
exports.read = function (req, res) {
  Gallery.find().limit(12).exec(
    function (err, galleries) {
      res.json(galleries);
    });
};


exports.readUserGallery = function (req, res) {
  if (!req.params.id) {
    res.status(400).send('Bad Request');
  } else {
    Gallery.find({
      uid: req.query.id
    }, function (err, galleries) {
      if (err) {
        res.status(400).send('Bad Request');
      } else {
        res.json(galleries);
      }
    });
  }
};
