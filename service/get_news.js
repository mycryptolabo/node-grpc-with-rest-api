const client = require('../client');

// get all news
client.getAllNews({}, (error, news) => {
    if (error) throw error;

    console.log('successfully fetch news List');
    console.log(news);
});