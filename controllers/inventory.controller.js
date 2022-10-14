const { createInventoryService, getInventoryService } = require("../services/inventory.service")


module.exports.CreateInventoryController = async (req, res) => {
  try {
    const result = await createInventoryService(req.body)
    if (result) {
      res.status(200).json({
        success: true,
        message: "Create inventory Successfully.",
        data: result
      })
    } else {
      res.status(400).json({
        success: false,
        error: "Not found inventory.",

      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "inventory is not created Successfully.",

    })
  }
}
module.exports.getInventoryController = async (req, res) => {
  try {
    const result = await getInventoryService()
    if (result) {
      res.status(200).json({
        success: true,
        message: "Here is all inventory Successfully.",
        data: result
      })
    } else {
      res.status(400).json({
        success: false,
        error: " Not found inventory.",

      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Not found inventory.",

    })
  }
}