const Proposal = require('../models/Proposal');

exports.getProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find().sort({ listingDate: -1 });
    res.status(200).json(proposals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching proposals', error: error.message });
  }
};

exports.createProposal = async (req, res) => {
  try {
    const { title, details, dueDate, sector, techSkills, attachment, coordinator } = req.body;
    const newProposal = new Proposal({
      title,
      details,
      dueDate,
      listingDate: new Date(),
      sector,
      techSkills,
      coordinator,
      attachment
    });
    await newProposal.save();
    res.status(201).json(newProposal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating proposal', error: error.message });
  }
};
