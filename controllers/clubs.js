/* eslint-disable radix */
import { Op } from 'sequelize'
import models from '../models/index'

const clubsModel = models.Clubs
class Clubs {
  static welcome(req, res) {
    res.status(200).send({ message: 'Welcome to football clubs Api' })
  }

  static getAllClubs(req, res) {
    // eslint-disable-next-line no-unused-vars
    clubsModel.findAll().then((clubs) => {
      res.status(200).send({ message: 'Clubs retrieved successfully', clubs })
    })
  }

  static addClubs(req, res) {
    clubsModel
      .create({
        name: req.body.name,
        stadium: req.body.stadium,
        capacity: req.body.capacity,
        manager: req.body.manager,
        captain: req.body.captain,
        location: req.body.location
      })
      .then((newClub) =>
        res.status(201).send({ message: 'Club added successfully', newClub }))
  }

  static updateClub(req, res) {
    const id = parseInt(req.params.id)
    clubsModel.findByPk(id).then((club) => {
      club
        .update({
          name: req.body.name || club.name,
          stadium: req.body.stadium || club.stadium,
          capacity: req.body.capacity || club.capacity,
          manager: req.body.manager || club.manager,
          captain: req.body.captain,
          location: req.body.location || club.location
        })
        .then((clubsupdate) => {
          res
            .status(200)
            .send({ message: 'Club updated successfully', clubsupdate })
        })
    })
  }

  static deleteClub(req, res) {
    const id = parseInt(req.params.id)
    clubsModel.findByPk(id).then((club) => {
      if (!club) {
        return res.status(404).send({
          message: 'club cannot be found'
        })
      }
      return club.destroy().then(() =>
        res.status(204).send({
          message: 'Club deleted successfully'
        }))
    })
  }

  static getSingleClub(req, res) {
    const id = parseInt(req.params.id)
    clubsModel
      .findOne({
        where: {
          id
        }
      })
      .then((club) => {
        if (!club) {
          return res.status(404).send({
            message: 'Club cannot be found'
          })
        }
        return res
          .status(201)
          .send({ message: 'Club found successfully', club })
      })
  }

  static searchClubByName(req, res) {
    clubsModel.findAll({
      where: {
        name: {
          [Op.substring]: `%${req.query.name}%`
        }
      }
    }).then((name) => {
      res
        .status(200)
        .send({ name })
    })
  }
}

export default Clubs
