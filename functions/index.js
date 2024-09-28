const { initializeApp } = require('firebase-admin/app');
const { onRequest } = require('firebase-functions/v2/https');
const { createRecord } = require('./controllers/recordController');
const { onNewRecordCreated } = require('./triggers/recordTrigger');

initializeApp();

exports.createRecord = onRequest(createRecord);
exports.onNewRecordCreated = onNewRecordCreated;
