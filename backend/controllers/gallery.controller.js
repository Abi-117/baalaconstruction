const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

exports.createGallery = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Image Required",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "baala-gallery",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    const gallery = await Gallery.create({
      title,
      category,
      image: result.secure_url,
      public_id: result.public_id,
    });

    res.status(201).json(gallery);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

// ========================
// Get Gallery
// ========================
exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({
      createdAt: -1,
    });

    res.status(200).json(gallery);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ========================
// Update Gallery
// ========================
// ========================
// Update Gallery
// ========================
exports.updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery Not Found",
      });
    }

    // Update text fields if they exist in the body
    if (req.body.title) gallery.title = req.body.title;
    if (req.body.category) gallery.category = req.body.category;

    // If a new image is provided, handle Cloudinary replacement
    if (req.file) {
      // 1. Securely delete the old asset from Cloudinary
      if (gallery.public_id) {
        await cloudinary.uploader.destroy(gallery.public_id);
      }

      // 2. Stream and upload the new image buffer to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "baala-gallery",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      // 3. Update document with valid Cloudinary properties
      gallery.image = result.secure_url;
      gallery.public_id = result.public_id;
    }

    await gallery.save();

    res.status(200).json({
      success: true,
      message: "Gallery Updated Successfully",
      gallery,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ========================
// Delete Gallery
// ========================
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery Not Found",
      });
    }

    await cloudinary.uploader.destroy(gallery.public_id);

    await gallery.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gallery Deleted Successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};