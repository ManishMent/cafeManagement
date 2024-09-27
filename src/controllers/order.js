const Order  =  require('../models/order');

exports.createOrder = async (req, res) => {
    try{
    const order = await Order.create(req.body);
    return res.status(201).json(order);
    }
    catch(error){   
        return res.status(500).send(error);
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("table").populate("items.item");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("table").populate("items.item");
        if(!order) {
            return res.status(404).json({ message: 'Order not found' });
          }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order) {
            return res.status(404).json({ message: 'Order not found' });
          }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
          });
          if(!order) {
            return res.status(404).json({ message: 'Order not found' });
          }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


