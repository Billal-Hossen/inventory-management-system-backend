const { createOrderService } = require("../services/order.service")

module.exports.CreateOrderController = async (req, res) => {
  try {
    req.body.customerId = await req.user._id;
    const result = await createOrderService(req.body)
    if (result) {
      res.status(200).json({
        success: true,
        message: "Order Successfully.",
        data: result
      })
    } else {
      res.status(400).json({
        success: false,
        error: "Order is not Successfully.",

      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Order is not Successfully.",

    })
  }
}