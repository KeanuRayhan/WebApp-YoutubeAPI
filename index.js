const { google } = require('googleapis');
require('dotenv').config();
const CronJob = require('cron').CronJob;

const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

const updateVideo = async () => {
    oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    // Yotube Client
    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client,
    });

    try {
        // Get Video
        const result = await youtube.videos.list({
            id: "mveujnBi7bM",
            part: "statistics,snippet",
        });

        if (result.data.items.length > 0) {
            const stats = result.data.items[0].statistics;

            // Update Video
            await youtube.videos.update({
                part: "snippet",
                requestBody: {
                    id: "mveujnBi7bM",
                    snippet: {
                        title: `Video ini ditonton ${stats.viewCount} kali`,
                        categoryId: 28,
                    },
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const updateEvery10Mins = new CronJob("*/10 * * * * *", async () => {
    updateVideo();
});

updateEvery10Mins.start();