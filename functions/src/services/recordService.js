const admin = require('firebase-admin');
const { getNextIncrementId } = require('../triggers/recordTrigger');

const db = admin.firestore();

async function createRecord(name) {
  const incrementId = await getNextIncrementId();
  const newRecord = {
    name,
    increment_id: incrementId,
  };

  const recordRef = await db.collection('records').add(newRecord);
  return { id: recordRef.id, increment_id: incrementId, name };
}

async function getRecord(id) {
  const recordRef = db.collection('records').doc(id);
  const record = await recordRef.get();

  if (!record.exists) {
    return null;
  }
  return { id: record.id, ...record.data() };
}

async function updateRecord(id, name) {
  const recordRef = db.collection('records').doc(id);
  await recordRef.update({ name });

  const updatedRecordSnapshot = await recordRef.get();
  const updatedRecord = updatedRecordSnapshot.data();

  return { id: updatedRecordSnapshot.id, ...updatedRecord };
}

async function deleteRecord(id) {
  const recordRef = db.collection('records').doc(id);
  await recordRef.delete();
}

module.exports = {
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
};
