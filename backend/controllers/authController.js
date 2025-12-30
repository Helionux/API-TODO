const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: " erreur lors de la recuperation des utilisateurs" });
     }
}


exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "Cet email est déjà utilisé" });
        }

        const newUser = new User({ 
            name, 
            email, 
            password 
        });

        await newUser.save();
        res.status(201).json({ message: "Utilisateur créé avec succès !" });

    } catch (err) {
        console.error("Détail de l'erreur Signup :", err);
        res.status(400).json({ 
            error: "Erreur lors de la création", 
            details: err.message 
        });
    }
};


exports.login = async (req, res) => {
    try { 
        const { name, email, password } = req.body;

        const user = await User.findOne({ name });
        if (!user) {
            return res.status(401).json({ error: "Nom d'utilisateur incorrect" });
        }

        const userByEmail = await User.findOne({ email });
        if (!userByEmail) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect" });
        }

        const isPasswordValid = await bcrypt.compare(password, userByEmail.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Email ou mot de passe incorrect" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // console.log(`Utilisateur connecté : ${user.email} (ID: ${user._id}) avec le rôle ${user.role} le token généré est ${token}`);

        res.status(200).json({ 
            userId: user._id,
            role: user.role,
            token: token 
        });

    } catch (error) {
        console.error("Détail de l'erreur Login :", error);
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
};