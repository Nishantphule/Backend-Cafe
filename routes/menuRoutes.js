const express = require('express');
const menuRouter = express.Router();
const menuController = require("../controllers/menuController");

// to get all items in menu
menuRouter.get('/items', menuController.getAllItems);

// create new item and add in menu
menuRouter.post('/addItem', menuController.addItem);

// delete item from menu
menuRouter.delete('/deleteItem/:id', menuController.deleteItem);

// edit items in menu
menuRouter.put('/editItem/:id', menuController.editItem);

module.exports = menuRouter;