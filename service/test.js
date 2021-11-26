const client = require('../client');

// get all news
client.getAllNews({}, (error, news) => {
    if (error) throw error;
    
    console.log(news);
});

// get news
client.getNews({ id: '1' }, (error, news) => {
    if (error) throw error;

    console.log('News feched successfully', news);
});

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

// delete a news
client.deleteNews({ id: 2 }, (error, news) => {
    if (error) throw error;

    console.log("Successfully deleted a news item.");
});