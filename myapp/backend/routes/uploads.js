// import express from "express";
// import multer from "multer";
// import Upload from '../models/Upload.js';  // Import your model properly

// const router = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post("/", upload.single("file1"), async (req, res) => {
//   try {
//     const {
//       userId,
//       requestId,
//       companyName,
//       date,
//       type,
//       status,
//       services,
//     } = req.body;

//     const newUpload = new Upload({
//       userId,
//       requestId,
//       companyName,
//       date,
//       type,
//       status,
//       services: JSON.parse(services),  // make sure this matches your schema
//       // You have filePaths in your model, but multer stores files in memory here.
//       // So either save files on disk and push paths to filePaths array or remove filePaths
//     });

//     await newUpload.save();
//     console.log("✅ Saved to MongoDB:", newUpload);
//     res.status(200).json({ message: "Upload successful" });
//   } catch (error) {
//     console.error("❌ Error uploading:", error);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     const uploads = await Upload.find();
//     res.json(uploads);
//   } catch (err) {
//     console.error("❌ Error fetching uploads:", err);
//     res.status(500).json({ message: 'Error fetching requests' });
//   }
// });
// router.get('/:id', async (req, res) => {
//   try {
//     const upload = await Upload.findById(req.params.id);
//     if (!upload) {
//       return res.status(404).json({ message: "Upload not found" });
//     }
//     res.json(upload);
//   } catch (error) {
//     console.error("❌ Error fetching upload by ID:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export default router;
