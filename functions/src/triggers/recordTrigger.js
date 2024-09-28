const admin = require('firebase-admin');
const db = admin.firestore();

async function getNextIncrementId() {
  const recordsSnapshot = await db
    .collection('records')
    .orderBy('increment_id', 'desc')
    .limit(1)
    .get();

  if (recordsSnapshot.empty) {
    return 1;
  } else {
    const lastRecord = recordsSnapshot.docs[0].data();
    return lastRecord.increment_id + 1;
  }
}

module.exports = {
  getNextIncrementId,
};
