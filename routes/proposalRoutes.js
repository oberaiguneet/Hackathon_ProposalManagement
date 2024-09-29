const express = require('express');
const router = express.Router();
const { getProposals, createProposal } = require('../controllers/proposalController');
const auth = require('../middleware/auth');

router.get('/', auth, getProposals);
router.post('/', auth, createProposal);

module.exports = router;
