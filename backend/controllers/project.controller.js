const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Cloudinary Stream Upload-ஐ ஒரு தனி Helper Function ஆக மாற்றினால் Code க்ளீனாக இருக்கும்
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "baala-projects" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// CREATE PROJECT (Multiple Images)
exports.createProject = async (req, res) => {
  try {
    const { title, category, location, year, completion, progress, description } = req.body;

    // req.file-க்கு பதிலா req.files இருக்கானு செக் பண்றோம்
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // எல்லா இமேஜ்களையும் Cloudinary-க்கு இணையாக (Parallel) அப்லோட் செய்கிறோம்
    const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
    const uploadResults = await Promise.all(uploadPromises);

    // அப்லோட் ஆன ரிசல்ட்களில் இருந்து secure_url மற்றும் public_id-ஐ தனித்தனி Array-களில் பிரிக்கிறோம்
    const images = uploadResults.map(result => result.secure_url);
    const public_ids = uploadResults.map(result => result.public_id);

    const project = await Project.create({
      title,
      category,
      location,
      year,
      completion,
      progress,
      description,
      images,      // Array of URLs
      public_ids   // Array of Public IDs (for deletion)
    });

    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PROJECT
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE PROJECT (Multiple Images Deletion)
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    // Cloudinary-யில் இருக்கும் அனைத்து இமேஜ்களையும் டெலிட் செய்கிறோம்
    if (project.public_ids && project.public_ids.length > 0) {
      const deletePromises = project.public_ids.map(id => cloudinary.uploader.destroy(id));
      await Promise.all(deletePromises);
    }

    await project.deleteOne();
    res.json({ message: "Project and its images deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PROJECT (Multiple Images Update)
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    const { title, category, location, year, completion, progress, description } = req.body;

    project.title = title || project.title;
    project.category = category || project.category;
    project.location = location || project.location;
    project.year = year || project.year;
    project.completion = completion || project.completion;
    project.progress = progress || project.progress;
    project.description = description || project.description;

   if (req.files && req.files.length > 0) {

  // Upload new images
  const uploadPromises = req.files.map(file =>
    uploadToCloudinary(file.buffer)
  );

  const uploadResults = await Promise.all(uploadPromises);


  const newImages = uploadResults.map(
    result => result.secure_url
  );

  const newPublicIds = uploadResults.map(
    result => result.public_id
  );


  // Keep old + add new
  project.images = [
    ...project.images,
    ...newImages
  ];


  project.public_ids = [
    ...project.public_ids,
    ...newPublicIds
  ];
}

    await project.save();

    res.json({
      success: true,
      message: "Project Updated Successfully",
      project
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};