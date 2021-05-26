import { connectToDatabase, Collections } from "utils/MongoDB";
import web3 from "web3";

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await postHandler(req, res);
    default:
      res.status(400).json({ error: "Invalid Method" });
  }
}

const postHandler = async (req, res) => {
  const db = await connectToDatabase();
  const collection = await db.collection(Collections.USERS);
  const { wallet } = req.body;
  const user = await collection.findOne({ wallet: wallet.toLowerCase() });
  if (!user) {
    res.status(400).json({ error: "user is not eligible for the claim" });
  }
  const result = await collection.updateOne({ wallet }, { $set: { claimed: true } });
  res.json({ message: "User has claimed successfully" });
};
