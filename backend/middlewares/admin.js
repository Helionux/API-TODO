



module.exports = (req, res, next) => {
    if (req.auth && req.auth.role === 'admin') {
        return next(); // Permet de continuer vers le contrôleur
    } else {
        return res.status(403).json({ message: "Accès refusé : privilèges administrateur requis" });
    }
}