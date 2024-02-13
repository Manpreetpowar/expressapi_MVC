// cronJobs.js

const cron = require('node-cron');

// Define your cron job
const task = cron.schedule('* * * * *', () => {
    // This function will run every minute
    console.log('Cron job is running...');
});

// Start the cron job
task.start();

// Export the cron job for use in other files if needed
module.exports = task;
