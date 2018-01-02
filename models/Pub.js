const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlcoholSchema = new Schema({
    type: String
});

const TableSchema = new Schema({
    order: [Order]
});

const OrderSchema = new Schema({
    order_element: [Alcohol]
});

const Alcohol = mongoose.model("alcohols", AlcoholSchema);
const Table = mongoose.model("tables", TableSchema);
const Order = mongoose.model("orders", OrderSchema);

module.exports = {
    Alcohol,
    Order,
    Table
};