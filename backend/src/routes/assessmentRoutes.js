const express =
  require('express')

const router =
  express.Router()

const authMiddleware =
  require(
    '../middleware/authMiddleware'
  )

const {
  createAssessment,
  resetTodayAssessment,
} = require(
  '../controllers/assessmentController'
)

router.post(
  '/',
  authMiddleware,
  createAssessment
)

router.delete(
  '/reset',
  authMiddleware,
  resetTodayAssessment
)

module.exports =
  router