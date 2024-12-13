// api/upload-template.js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, description, link } = req.body;

    // MongoDB connection URI (replace with your MongoDB Atlas URI)
    const uri = 'YOUR_MONGODB_URI';
    const client = new MongoClient(uri);

    try {
      await client.connect();
      const db = client.db('discordTemplates');
      const collection = db.collection('templates');

      // Insert the new template into the database
      await collection.insertOne({ name, description, link });

      res.status(200).json({ success: true, message: 'Template uploaded successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error uploading template' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
