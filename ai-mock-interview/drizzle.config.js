/** @type {import("drizzle-kit").Config} */
export default{
  // Define the schema you are working with
  schema: './utils/schema.js', // Adjust path to your schema file

  // Define the dialect (PostgreSQL in this case for Neon)
  dialect: 'postgresql',

  // Database credentials for connection
  dbCredentials: {
        url: 'postgresql://neondb_owner:npg_rnKOx5dILm0g@ep-fragrant-morning-aeqsp82p-pooler.c-2.us-east-2.aws.neon.tech/ai-mock-interview?sslmode=require&channel_binding=require',
    }
}