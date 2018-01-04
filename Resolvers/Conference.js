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

const all = async (_,{limit,skip}) => {
  var conference
  if(limit || skip){
    conference = await models.Conference.find({}, function(err, docs) {}).limit(limit).skip(skip)
    return conference
  }
  else{
    conference = await models.Conference.find({}, function(err, docs) {})
    return conference
  }
}


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

const addAddenteeToConference = async function(_, data) {
    await models.Attendee.findOne({
        _id: data.id
    }).then((newData) => {
        console.log(newData)
        models.Conference.findByIdAndUpdate(data.conference_id, { $push: { "attendees": newData } }, { safe: true, upsert: true },
            function(err, model) {
                console.log(model)
            });
    })
    return data
}

module.exports = {
    create,
    remove,
    update,
    all,
    show,
    details,
    addAddenteeToConference
}
