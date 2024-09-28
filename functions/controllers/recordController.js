const { getFirestore } = require('firebase-admin/firestore');
const { validateInput } = require('../validators/inputValidator');

exports.createRecord = async (req, res) => {
  try {
    const { name } = req.body;
    if (!validateInput(name)) {
      res.status(400).send({ message: 'Nome é obrigatório' });
      return;
    }

    const writeResult = await getFirestore()
      .collection('test_collection')
      .add({ name });

    res.status(200).send({
      message: 'Registro criado com sucesso.',
      id: writeResult.id,
    });
  } catch (error) {
    console.error('Erro ao criar registro:', error);
    res.status(500).send({ message: 'Erro interno do servidor' });
  }
};
