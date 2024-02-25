const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');


const ClientController = require('../controllers/clientController');
const ProductController = require('../controllers/productController');
const OrderController = require('../controllers/orderController');
const OrderDetailController = require('../controllers/orderDetailController');

//validation 
const clientValidationRules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Must be a valid email')
  ];
  

  const productValidationRules = [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
  ];
  

  const orderValidationRules = [
    body('clientId').notEmpty().withMessage('Client ID is required'),
    body('orderDate').isISO8601().withMessage('Order date must be a valid ISO 8601 date')
  ];
  

  const orderDetailValidationRules = [
    body('orderId').notEmpty().withMessage('Order ID is required'),
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than 0')
  ];
  
  const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
  
    res.status(422).json({ errors: errors.array() });
  };


const { validateToken } = require('../validateToken');

// Client routes
router.post('/clients',validateToken,clientValidationRules,validate,ClientController.addClient);
router.get('/clients',  ClientController.getAllClients);
router.get('/clients/:id' ,ClientController.getClientById);
router.put('/clients/:id', validateToken,clientValidationRules, validate,ClientController.updateClient);
router.delete('/clients/:id', validateToken, ClientController.deleteClient);

// Product routes

router.post('/products',validateToken,productValidationRules,validate,ProductController.addProduct);
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.put('/products/:id', validateToken,productValidationRules,validate,ProductController.updateProduct);
router.delete('/products/:id', validateToken, ProductController.deleteProduct);

// Order routes

router.post('/orders', validateToken,orderValidationRules, validate,OrderController.addOrder);
router.get('/orders', OrderController.getAllOrders);
router.get('/orders/:id', OrderController.getOrderById);
router.put('/orders/:id', validateToken, orderValidationRules, validate,OrderController.updateOrder);
router.delete('/orders/:id', validateToken, OrderController.deleteOrder);

// OrderDetails routes

router.post('/ordersDetail', validateToken, orderDetailValidationRules,validate,OrderDetailController.addOrderDetail);
router.get('/ordersDetail', OrderDetailController.getAllOrderDetails);
router.get('/ordersDetail/:id', OrderDetailController.getOrderDetailsByOrderId);
router.put('/ordersDetail/:id', validateToken,orderDetailValidationRules,validate, OrderDetailController.updateOrderDetail);
router.delete('/ordersDetail/:id', validateToken, OrderDetailController.deleteOrderDetail);

module.exports = router;
