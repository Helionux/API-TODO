const Product = require('../models/Product')

// Créer un produit
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            return res.status(409).json({ error: "Ce produit existe deja dans la base de donnees" });
        }
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: "Erreur lors de la verification des donnees", details: err.message });
  }
};

// Lire tous les produits (avec filtre optionnel par catégorie)
exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query; // Récupère ?category=xxx dans l'URL
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Modifier un produit
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Produit non trouvé" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Produit non trouvé" });
    res.json({ message: "Produit supprimé" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};