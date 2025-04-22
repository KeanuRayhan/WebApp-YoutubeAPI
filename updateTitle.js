const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

const updateVideo = async () => {
    oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

    const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client,
    });

    try {
        const result = await youtube.videos.list({
            id: "whc6C7vS6MQ",
            part: "statistics,snippet",
        });

        if (result.data.items.length > 0) {
            const stats = result.data.items[0].statistics;

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

            console.log(`Updated title to: Video ini ditonton ${stats.viewCount} kali`);
        }
    } catch (error) {
        console.error("Failed to update video:", error);
        process.exit(1);
    }
};

updateVideo();
