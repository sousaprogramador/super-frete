const { getFirestore } = require('firebase-admin/firestore');
const { onDocumentCreated } = require('firebase-functions/v2/firestore');

exports.onNewRecordCreated = onDocumentCreated(
  'test_collection/{docId}',
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log('No data associated with the event');
      return null;
    }
    const newDocRef = snapshot.ref;
    const currentIdSnapshot = await getFirestore()
      .collection('test_collection')
      .orderBy('increment_id', 'desc')
      .limit(1)
      .get();
    let currentId = 1;
    if (!currentIdSnapshot.empty) {
      currentId = currentIdSnapshot.docs[0].data().increment_id++;
    }
    return newDocRef.update({ increment_id: currentId });
  }
);
