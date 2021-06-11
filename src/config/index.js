import dotenv from 'dotenv';

dotenv.config();

export default {
  port: parseInt(process.env.PORT || 5000, 10),
  api: {
    prefix: '/api'
  }
};
