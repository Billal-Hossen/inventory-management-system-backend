const { createInvoiceService } = require("../services/invoice.service")


module.exports.CreateInvoiceController = async (req, res) => {
  try {
    const result = await createInvoiceService(req.body)
    if (result) {
      res.status(200).json({
        success: true,
        message: "Invoice created Successfully.",
        data: result
      })
    } else {
      res.status(400).json({
        success: false,
        error: "Invoice is not created Successfully.",

      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "Invoice is not created Successfully.",

    })
  }
}