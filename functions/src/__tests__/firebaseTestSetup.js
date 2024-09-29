const admin = require('firebase-admin');

// Inicializar o Firebase Admin SDK
admin.initializeApp({
  projectId: 'super-frete-ea193', // Substitua pelo seu ID do projeto Firebase
});

module.exports = admin;
