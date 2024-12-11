// Import dependencies for Redis and Database clients
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

// Define the AppController class to handle application-level logic
class AppController {
  /**
   * Handles the status check for Redis and Database connections
   * @param {Object} req - The HTTP request object
   * @param {Object} res - The HTTP response object
   */
  static getStatus(req, res) {
    try {
      // Check the status of Redis and Database connections
      const redisStatus = redisClient.isAlive();
      const dbStatus = dbClient.isAlive();

      // Respond with the status of both services
      return res.status(200).json({
        redis: redisStatus,
        db: dbStatus,
      });
    } catch (error) {
      // Handle unexpected errors gracefully
      return res.status(500).json({ error: 'Unable to retrieve status' });
    }
  }

  /**
   * Handles the retrieval of application statistics
   * @param {Object} req - The HTTP request object
   * @param {Object} res - The HTTP response object
   */
  static async getStats(req, res) {
    try {
      // Fetch the total number of users and files from the database
      const [usersTotal, filesTotal] = await Promise.all([
        dbClient.nbUsers(),
        dbClient.nbFiles(),
      ]);

      // Respond with the retrieved statistics
      return res.status(200).json({
        users: usersTotal,
        files: filesTotal,
      });
    } catch (error) {
      // Handle unexpected errors gracefully
      return res.status(500).json({ error: 'Unable to retrieve statistics' });
    }
  }
}

// Export the AppController class for use in other modules
export default AppController;

