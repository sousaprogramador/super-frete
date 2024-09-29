const { getFirestore } = require('firebase-admin/firestore');

class RecordModel {
  constructor() {
    this.db = getFirestore();
    this.collection = 'test_collection';
  }

  async addRecord(data) {
    return await this.db.collection(this.collection).add(data);
  }

  async getRecordById(id) {
    const doc = await this.db.collection(this.collection).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }

  async updateRecord(id, data) {
    await this.db.collection(this.collection).doc(id).update(data);
  }

  async deleteRecord(id) {
    await this.db.collection(this.collection).doc(id).delete();
  }

  async getLastIncrementId() {
    const snapshot = await this.db
      .collection(this.collection)
      .orderBy('increment_id', 'desc')
      .limit(1)
      .get();
    return snapshot.empty ? 0 : snapshot.docs[0].data().increment_id;
  }
}

module.exports = new RecordModel();
