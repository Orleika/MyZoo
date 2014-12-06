/**
 * Module dependencies.
 */
var async = require('async'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Gallery = mongoose.model('Gallery'),
  Image = mongoose.model('Image');

/**
 * Create a Gallery
 */
exports.create = function (req, res) {
  var uid = req.body.id,
    name = req.body.name,
    text = req.body.text,
    type = req.body.type,
    imageDate = req.body.image,
    soundDate = req.body.sound;

  if (!id || !image) {
    res.status(400).send();
  } else {
    async.waterfall([
      function (callback) {
        user.findById(uid, function (err, user) {
          if (err) {
            callback(err);
          } else {
            callback(user.name);
          }
        });
      },
      function (uname, allback) {
        var gallery = new Gallery();
        gallery.uid = uid;
        gallery.uname = uname;
        gallery.name = name;
        gallery.text = text;
        gallery.type = type;
        gallery.sound = soundDate;

        gallery.save(function (err) {
          if (err) {
            callback(err);
          } else {
            callback(null, gallery._id);
          }
        });
      },
      function (gid, callback) {
        var image = new Image();
        image.gid = gid;
        image.data = image;

        iamge.save(function (err) {
          if (err) {
            callback(err);
          } else {
            callback(null, image._id);
          }
        });
      },
      function (imgid, callback) {
        var host = process.env.HOST,
          imageURL = host + "/image?" + imgid;

        Gallery.update({
          _id: gid
        }, {
          $set: {
            "image": imageURL
          }
        });
      }
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
var randomGallery = function () {
  Gallery.find({}).limit(12).exec(
    function (err, galleries) {
      return galleries;
    });
};

var userGallery = function (uid) {
  Gallery.find({
    uid: uid
  }, function (err, galleries) {
    return galleries;
  });
};

exports.read = function (req, res) {
  var galleries;

  if (!req.query.id) {
    console.log("pass");
    galleries = randomGallery();
    res.json(galleries);
  } else if (req.query.id) {
    galleries = userGallery(req.query.id);
    res.json(galleries);
  } else {
    res.status(400).send();
  }
};
