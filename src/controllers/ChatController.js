class ChatController {
  async index (req, res) {
    res.render('layouts/default.ejs')
  }
}

module.exports = new ChatController()
