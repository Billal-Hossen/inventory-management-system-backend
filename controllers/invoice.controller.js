const { createInvoiceService, getInvoicesService } = require("../services/invoice.service")


// module.exports.CreateInvoiceController = async (req, res) => {
//   try {
//     const result = await createInvoiceService(req.body)
//     if (result) {
//       res.status(200).json({
//         success: true,
//         message: "Invoice created Successfully.",
//         data: result
//       })
//     } else {
//       res.status(400).json({
//         success: false,
//         error: "Invoice is not created Successfully.",

//       })
//     }
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: "Invoice is not created Successfully.",

//     })
//   }
// }

module.exports.getInvoicesController = async (req, res) => {
  try {

    const invoices = await getInvoicesService(req.query)
    res.status(200).json({
      success: true,
      data: invoices,

    })

  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Can't get invoices data.",
      error: error.message


    })
  }
}