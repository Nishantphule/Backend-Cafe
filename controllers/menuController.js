const Menu = require("../models/menu")

const menuContoller = {

    addItem: async (req, res) => {
        try {
            const { productName, price, imgUrl } = req.body

            const itemExists = await Menu.findOne({ productName });

            if (itemExists) {
                return res.status(409).json({ message: "Item already exists" })
            }
            else {
                const newItem = new Menu({
                    productName,
                    price,
                    imgUrl
                })
                await newItem.save();
                res.status(200).json({ message: "Item Created Successfully", newItem })
            }

        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error })
        }
    },

    getAllItems: async (req, res) => {
        try {
            await Menu.find({})
                .then((items) => {
                    res.status(200).json({ items: items })
                })
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" })
        }
    },

    editItem: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedItem = req.body;

            const newData = {
                ...updatedItem,
                updatedAt: Date.now()
            }

            const item = await Menu.findByIdAndUpdate(
                id,
                newData,
                { new: true })

            res.json({ message: "Item Updated Successfully", item })

        } catch (error) {
            console.error("Error Updating Item")
            res.status(500).json({ message: "Internal Server Error" })
        }
    },

    deleteItem: async (req, res) => {
        try {
            const { id } = req.params
            await Menu.findByIdAndDelete(id);
            res.status(200).json({ message: "Item Deleted Successfully" })
        } catch (error) {
            console.error("Error Deleting Item")
            res.status(500).json({ message: "Internal Server Error" })
        }
    }


}
module.exports = menuContoller;