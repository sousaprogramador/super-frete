const { initializeApp } = require('firebase-admin/app');
const functions = require('firebase-functions/v2/https');

initializeApp();

const recordController = require('./controllers/recordController');
const { onNewRecordCreated } = require('./triggers/recordTrigger');

exports.createRecord = functions.onRequest(recordController.createRecord);
exports.getRecord = functions.onRequest(recordController.getRecord);
exports.updateRecord = functions.onRequest(recordController.updateRecord);
exports.deleteRecord = functions.onRequest(recordController.deleteRecord);

exports.onNewRecordCreated = onNewRecordCreated;
