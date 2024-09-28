const recordService = require('../services/recordService');

exports.createRecord = async (req, res) => {
  try {
    const { name } = req.body;
    const newRecord = await recordService.createRecord(name);
    res
      .status(201)
      .send({ message: 'Registro criado com sucesso.', ...newRecord });
  } catch (error) {
    console.error('Erro ao criar registro:', error);
    res.status(400).send({ message: error.message });
  }
};

exports.getRecord = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await recordService.getRecord(id);
    if (!record) {
      res.status(404).send({ message: 'Registro não encontrado' });
    } else {
      res.status(200).send(record);
    }
  } catch (error) {
    console.error('Erro ao obter registro:', error);
    res.status(500).send({ message: 'Erro interno do servidor' });
  }
};

exports.updateRecord = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await recordService.updateRecord(id, name);
    res.status(200).send({ message: 'Registro atualizado com sucesso.' });
  } catch (error) {
    console.error('Erro ao atualizar registro:', error);
    res.status(400).send({ message: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  const { id } = req.params;
  try {
    await recordService.deleteRecord(id);
    res.status(200).send({ message: 'Registro deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar registro:', error);
    res.status(500).send({ message: 'Erro interno do servidor' });
  }
};
