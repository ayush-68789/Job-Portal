const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated.js");
const {
    postJob,
    getAllJobs,
    getJobById,
    getAdminJobs,
    updateJob,
    toggleJobStatus,
    deleteJob
} = require("../controllers/jobController.js");

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(getJobById);
router.route("/update/:id").patch(isAuthenticated, updateJob);
router.route("/toggle/:id").patch(isAuthenticated, toggleJobStatus);
router.route("/delete/:id").delete(isAuthenticated, deleteJob);

module.exports = router;