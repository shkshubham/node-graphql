const models = require('../models/')

const remove = async function(_, data) {
    var deleted_conference = {}
    await models.Conference.findByIdAndRemove(data.id, (err, data) => {
        deleted_conference = data
        console.log(deleted_conference)
    });
    return deleted_conference
}

const update = async(_, data) => {
    models.Conference.update({ _id: data.id }, data, function(err, raw) {
        if (err) {
            console.log(err);
        }
        console.log(raw)
    });
    return data
}

const create = async(_, data) => {
    var conferenceList = []
    await models.Conference.find({}, function(err, docs) {
        conferenceList = docs
    })
    console.log(conferenceList)
    var conference = Object.assign({ conference_id: conferenceList.length + 1 }, data)

    var newconference = new models.Conference(conference)
    newconference.save(function(err, conference) {
        if (err) return handleError(err);
    })
    return newconference
}

const all = () => models.Conference.find({}, function(err, docs) {
    return docs
})


const show = async function(_, data) {
    console.log(data)
    conference = []
    await models.Conference.findOne({
        _id: data.id
    }).then((data) => {
        conference.push(data)
    })
    return conference
}

const details = async function(_, data) {
    conference = []
    await models.Conference.findOne({
        _id: data.id
    }).then((data) => {
        conference.push(data)
    })
    return conference
}

module.exports = {
    create,
    remove,
    update,
    all,
    show,
    details
}