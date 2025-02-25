const { Contact } = require('../../models/contact');

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const findOptions = favorite ? { owner, favorite } : { owner };

  const result = await Contact.find(findOptions, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email subscription');

  res.status(200).json(result);
};

module.exports = getAll;
