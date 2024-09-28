const recordService = require('../services/recordService').default;

exports.createRecord = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const newRecord = await recordService.createRecord(name);
    return res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error creating record:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getRecord = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    const record = await recordService.getRecord(id);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }
    return res.status(200).json(record);
  } catch (error) {
    console.error('Error fetching record:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateRecord = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({ error: 'ID and Name are required' });
  }

  try {
    const updatedRecord = await recordService.updateRecord(id, name);
    return res.status(200).json(updatedRecord);
  } catch (error) {
    console.error('Error updating record:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteRecord = async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    await recordService.deleteRecord(id);
    return res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting record:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
