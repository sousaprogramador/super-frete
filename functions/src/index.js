const functions = require('firebase-functions');
const {
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} = require('./controllers/recordController');
const { setIncrementId } = require('./triggers/recordTrigger');

exports.createRecord = functions.https.onRequest(createRecord);
exports.getRecord = functions.https.onRequest(getRecord);
exports.updateRecord = functions.https.onRequest(updateRecord);
exports.deleteRecord = functions.https.onRequest(deleteRecord);

exports.onRecordCreate = functions.firestore
  .document('records/{recordId}')
  .onCreate(setIncrementId);
