const getInfo = async (req, res, next) => {
  res.json(res.user);
};
module.exports = { getInfo };
