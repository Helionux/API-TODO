const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "erreur serveur" })
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newProduct = new Product({ name, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: "Donnee invalides" })
    }
};

exports.updatedProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Produit non trouve" });
        }
    } catch (err) {
        res.status(400).json({ message: "Erreur lors de la mise a jour", error: err.message });
    }
};


exports.deletedProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Produit non trouve" });
        }
    } catch (err) {
        res.status(500).json({ message: "erreur serveur" });
    }
}