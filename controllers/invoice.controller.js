const Customer = require('../libs/models/customer.model');
const Invoice = require('../libs/models/invoice.model');
const { body, validationResult } = require('express-validator');
const validateInvoice = [
    body('customer', 'Select the Customer').notEmpty(),
    body('amount', 'Amount must not be empty').notEmpty(),
    body('date', 'Due Date must not be empty').notEmpty(),
    body('status', 'Select the Status').notEmpty(),
]

const populateInvoices = query => {
    return query
    .populate({
        path: 'customer',
        model: Customer,
        select: '_id name',
    })
};

const showInvoices = async (req, res) => {
    const query = { owner: req.session.userId };
    const invoices = await populateInvoices(Invoice.find(query));
    res.render('pages/invoices', {
        title: 'Invoices',
        type: 'data',
        invoices,
        info: req.flash('info')[0],
    });
};

module.exports = {
    showInvoices
}
