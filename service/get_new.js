const client = require('../client');

// get news
client.getNews({ id: '1' }, (error, news) => {
    if (error) throw error;
    
    console.log('News feched successfully', news);
});