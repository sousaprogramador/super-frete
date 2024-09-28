const { initializeApp } = require('firebase-admin/app');
const functions = require('firebase-functions/v2/https');

initializeApp();

const recordController = require('./controllers/recordController');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const recordTrigger = require('./triggers/recordTrigger');

exports.createRecord = functions.onRequest(recordController.createRecord);
exports.getRecord = functions.onRequest(recordController.getRecord);
exports.updateRecord = functions.onRequest(recordController.updateRecord);
exports.deleteRecord = functions.onRequest(recordController.deleteRecord);

exports.onNewRecordCreated = onDocumentCreated(
  'test_collection/{docId}',
  recordTrigger.onNewRecordCreated
);
