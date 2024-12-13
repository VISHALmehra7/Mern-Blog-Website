import express from 'express'
import { adminRoute, protectRoute } from '../middleware/protectRoute.js'
import {getAllBlogs,assignAdminRole,deleteBlog,allUsers} from '../controllers/adminController.js'

const router = express.Router()
router.get("/getallusers",protectRoute,adminRoute,allUsers)
router.post("/assign-admin-role/:userId",protectRoute,adminRoute,assignAdminRole)
router.get("/getallblogs",protectRoute,adminRoute,getAllBlogs)
router.delete("/delete/:postId",protectRoute,adminRoute,deleteBlog)

export default router