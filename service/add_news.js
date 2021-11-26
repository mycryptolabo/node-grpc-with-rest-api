const client = require('../client');

// add a news
client.addNews({
    id: '3',
    title: "Title news 3",
    body: "Body content 3",
    postImage: "Image URL here",
}, (error, news) => {
    if (error) throw error;

    console.log("Successfully created a news.");
});