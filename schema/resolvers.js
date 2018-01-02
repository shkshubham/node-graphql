const Link = require('../models/Link')
const Pub = require('../models/Pub')



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




module.exports = {
    Query: {
        allLinks: () => Link.find({}, function(err, docs) {
            links = docs
        }),
        allAlcohol: () => alcoholList,
        allOrder: () => allOrderList,
        allTable: () => allTableList
    },
    Mutation: {
        createLink: (_, data) => {
            var link = new Link(data)
            link.save(function(err, docs) {
                if (err) return handleError(err);
            })
            return link

        }
    }
};