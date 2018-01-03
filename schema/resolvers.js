const Link = require('../models/Link')
const Pub = require('../models/Pub')
const ios_model = require('../models/ios_model')

const alcohol = function(id, type) {
    this.id = id;
    this.type = type;
}

al1 = new alcohol(1, 'beer')
al2 = new alcohol(2, 'wine')
al3 = new alcohol(3, 'rum')
al4 = new alcohol(4, 'vodka')

const alcoholList = [al1, al2, al3, al4]

const allOrderList = [{
        id: 1,
        order_element: [al1, al2]
    },
    {
        id: 2,
        order_element: [al2, al3]
    }
]

const allTableList = [{
        id: 1,
        status: 1,
        order: allOrderList
    },
    {
        id: 2,
        status: 0
    },
    {
        id: 3,
        status: 0
    },
    {
        id: 4,
        status: 1
    }
]

var allConferenceList = [{
    id: 1,
    name: "test conference 1",
    city: "delhi",
    year: "2018",
    attendees: [{
            id: 1,
            name: "shubham"
        },
        {
            id: 2,
            name: "shukla"
        }
    ]
}]


var allAttendeeList = [{
    id: 1,
    name: "shubham"
}]

module.exports = {
    Query: {
        allLinks: () => Link.find({}, function(err, docs) {
            links = docs
        }),
        allAlcohol: () => alcoholList,
        allOrder: () => allOrderList,
        allTable: () => allTableList,
        allConferences: () => ios_model.Conference.find({}, function(err, docs) {
            return docs
        }),
        ConferenceDetails: async function(_, data) {
            conference = []
            await ios_model.Conference.findOne({
                conference_id: data.id
            }).then((data) => {
                conference.push(data)
            })
            return conference
        },

        Conference: async function(_, data) {
            conference = []
            await ios_model.Conference.findOne({
                conference_id: data.id
            }).then((data) => {
                conference.push(data)
            })
            return conference
        },
    },
    Mutation: {
        createLink: (_, data) => {
            var link = new Link(data)
            link.save(function(err, docs) {
                if (err) return handleError(err);
            })
            return link

        },
        createConference: async(_, data) => {
            var conferenceList = []
            await ios_model.Conference.find({}, function(err, docs) {
                conferenceList = docs
            })
            console.log(conferenceList)
            var conference = Object.assign({ conference_id: conferenceList.length + 1 }, data)

            var newconference = new ios_model.Conference(conference)
            newconference.save(function(err, conference) {
                if (err) return handleError(err);
            })
            return newconference
        },
        createAttendee: async(_, data) => {
            var attendeeList = []
            await ios_model.Attendee.find({}, function(err, docs) {
                attendeeList = docs
            })
            console.log(attendeeList)
            var attendee = Object.assign({ attendee_id: attendeeList.length + 1 }, data)

            var newAttendee = new ios_model.Attendee(attendee)
            newAttendee.save(function(err, attendee) {
                if (err) return handleError(err);
            })
            return newAttendee
        },
        updateConference: async(_, data) => {
            await ios_model.Conference.findOne({
                conference_id: data.id
            }).then((conference) => {
                console.log(conference)
            })
        }
    }
}