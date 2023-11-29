import { app } from "@/config/firbase";
import { addDoc, collection, getFirestore } from "firebase/firestore";

export default async (req, res) => {
  if (req.method === "POST") {
    const db = getFirestore(app);
    try {
      const data = req.body;
      const leadsRef = collection(db, "leads");

      const response = await addDoc(leadsRef,  data);
      res.status(200).json({ id: response.id });
    } catch (error) {
      console.error("Error creating data:", { error });
      res.status(500).json({ error: "Error creating data" });
    }
  } else {
    res.status(405).end();
  }
};
