// api/get-templates.js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const uri = 'YOUR_MONGODB_URI';
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const db = client.db('discordTemplates');
      const collection = db.collection('templates');

      // Retrieve all templates
      const templates = await collection.find().toArray();
      res.status(200).json(templates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving templates' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
