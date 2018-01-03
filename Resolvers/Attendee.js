const models = require('../models/')

const remove = async(_, data) => {
    var deleted_attendee = {}
    await models.Attendee.findByIdAndRemove(data.id, (err, data) => {
        deleted_attendee = data
        console.log(deleted_attendee)
    });
    return deleted_attendee
}
const update = async(_, data) => {
    await models.Attendee.update({ _id: data.id }, data, function(err, raw) {
        if (err) {
            console.log(err)
        }
        console.log(raw)
    });
    return data
}

const create = async(_, data) => {
    var attendeeList = []
    await models.Attendee.find({}, function(err, docs) {
        attendeeList = docs
    })
    console.log(attendeeList)
    var attendee = Object.assign({ attendee_id: attendeeList.length + 1 }, data)

    var newAttendee = new models.Attendee(attendee)
    newAttendee.save(function(err, attendee) {
        if (err) return handleError(err);
    })
    return newAttendee
}

const all = () => models.Attendee.find({}, function(err, docs) {
    return docs
})

const show = async function(_, data) {
    attendee = []
    await models.Attendee.findOne({
        _id: data.id
    }).then((data) => {
        attendee.push(data)
    })
    return attendee
}

const addAddenteeToConference = async function(_, data) {
    await models.Conference.findOne({
        _id: data.conference_id
    }).then((newData) => {
        console.log(newData)
        models.Attendee.findByIdAndUpdate(data.id, { $push: { "conferences": newData } }, { safe: true, upsert: true },
            function(err, model) {
                console.log(err);
                console.log(model)
            });
        return data
    })
}

module.exports = {
    remove,
    update,
    all,
    create,
    show,
    addAddenteeToConference
}