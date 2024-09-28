const { getFirestore } = require('firebase-admin/firestore');

class RecordModel {
  static async getLastIncrementId() {
    const snapshot = await getFirestore()
      .collection('test_collection')
      .orderBy('increment_id', 'desc')
      .limit(1)
      .get();

    if (!snapshot.empty) {
      return snapshot.docs[0].data().increment_id + 1;
    }
    return 1;
  }
}

module.exports = RecordModel;
