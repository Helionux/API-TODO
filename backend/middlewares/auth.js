const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Le token est envoyé dans le header 'Authorization: Bearer TOKEN'
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    // On ajoute les infos de l'utilisateur à la requête pour les étapes suivantes
    req.auth = { userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (error) {
    res.status(401).json({ message: "Requête non authentifiée !" });
  }
};