const { User, Appointment } = require('../models')

class AppointmentsController {
  async create (req, res) {
    const provider = await User.findByPk(req.params.provider)

    return res.render('appointments/create', { provider })
  }
  async store (req, res) {
    const { id } = await req.session.user
    const { provider } = await req.params
    const { date } = await req.body

    await Appointment.create({
      user_id: id,
      provider_id: provider,
      date
    })
    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentsController()
