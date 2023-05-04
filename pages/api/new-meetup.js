import { MongoClient } from "mongodb";

const mongoClinet =
  "mongodb+srv://magedmaher602:xgwvPFy7SfzjGxYQ@cluster0.f2o4kie.mongodb.net/meetups?retryWrites=true&w=majority";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const client = await MongoClient.connect(mongoClinet);
      const db = client.db();
      const meetupsCollection = db.collection("meetups");
      const response = await meetupsCollection.insertOne(req.body);
      client.close();
      res.status(201).json({ message: "Meetup added." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default handler;
