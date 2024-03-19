import queue from "../config/queueConfig";

queue.on('waiting', (jobId) => {
    console.log(`Job ${jobId} is waiting.`);
});

queue.on('active', (job) => {
    console.log(`Job ${job.id} is active.`);
});

queue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed with result ${result}.`);
});

queue.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed with error ${err.message}.`);
});

queue.on('progress', (job, progress) => {
    console.log(`Job ${job.id} is ${progress}% complete.`);
});