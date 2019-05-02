const { User } = require('../models')
const { Appointment } = require('../models')
const moment = require('moment')

class SchenduleController {
  async index (req, res) {
    const { id } = await req.session.user

    const appointments = await Appointment.findAll({
      include: [
        {
          model: User,
          as: 'user'
        }
      ],
      where: {
        provider_id: id
      }
    })
    const myAppointments = appointments.map(appointment => ({
      user: {
        name: appointment.user.name,
        avatar: appointment.user.avatar
      },
      date: moment(appointment.date).format('DD/MM/YYYY HH:mm')
    }))

    return res.render('schedule/list', { myAppointments })
  }
}

module.exports = new SchenduleController()
