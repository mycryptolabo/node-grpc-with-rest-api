const client = require('../client');

// edit a news
client.editNews({
    id: 2,
    body: "Body content 2 edited.",
    postImage: "Image URL edited.",
    title: "Title for 2 edited.",
}, (error, news) => {
    if (error) throw error;

    console.log("Successfully edited a news.");
});