import { app, db } from "@/config/firbase";
import { collection, doc, getFirestore, updateDoc } from "firebase/firestore";

export default async (req, res) => {
 
  if (req.method === 'PUT') {
    const db = getFirestore(app)
    try {
      const { id, data } = req.body;
      const leadsRef = doc(db, "leads",id)
      await updateDoc(leadsRef,data)
      res.status(200).end();
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Error updating data' });
    }
  } else {
    res.status(405).end();
  }
};
