const client = require('./client');

client.getAllNews({}, (error, news) => {
    if (!error) {
        console.log(news)
    } else {
        console.error(error)
    }
});