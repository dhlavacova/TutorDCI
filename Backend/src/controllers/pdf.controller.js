import Task from "../models/task.model.js";
import pdf from "../middlewares/pdf.middleware.js";

/**
 * Handle request to some endpoint
 *
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */

export const convertToPdf = async (req, res) => {
    try {
        const { id } = req.params;

        const protocol = await Task.findOne({_id: id});
        if (!protocol) {
            res.status(404).json({message: "Protocol not found"});
            return;
        }
        pdf(protocol,res)
//res.status(200).json(protocoll.thema);

        console.log(protocol)
    }catch (err) {
        console.error(err.message);
    }}