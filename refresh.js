const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

const getTokens = async () => {
    const res = await oauth2Client.getToken(
        "4/0Ab_5qlmseaLuh-jfN1KwqPfsiWyYqaZ0gxZzHuk5pSdJaa2xP8MGOOUJj9u9OUjbFdmRdA"
    );
    console.log(res.tokens);
};

getTokens();