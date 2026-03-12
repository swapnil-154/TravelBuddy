const weatherService = require('../services/weatherService');

// @desc    Get weather for destination
// @route   GET /api/weather/:destination
// @access  Public
exports.getWeather = async (req, res) => {
  try {
    const weather = await weatherService.getWeather(req.params.destination);
    res.json({ success: true, weather });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
