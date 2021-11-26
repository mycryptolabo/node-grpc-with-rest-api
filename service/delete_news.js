const client = require('../client');

// delete a news
client.deleteNews({ id: 2 }, (error, news) => {
    if (error) throw error;

    console.log("Successfully deleted a news item.");
});