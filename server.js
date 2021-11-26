const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './proto/news.proto';
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition).NewsService;

const server = new grpc.Server();
const data = { news: [
    { id: '1', title: 'Note 1', body: 'Content 1', postImage: 'Post image 1' },
    { id: '2', title: 'Note 2', body: 'Content 2', postImage: 'Post image 2' }
]};

server.addService(newsProto.service, {
    getAllNews: (_, callback) => {
        callback(null, data);
    },
    getNews: (_, callback) => {
        const newsRequestId = _.request.id;
        const newsItem = data.news.find(({ id }) => newsRequestId == id);
        callback(null, newsItem);
    },    
    addNews: (call, callback) => {
        const _news = { id: Date.now(), ...call.request };
        data.news.push(_news);
        callback(null, _news);
    },
    editNews: (_, callback) => {
        const newsRequestId = _.request.id;
        const newsItem = data.news.find(({ id }) => newsRequestId == id);
        newsItem.body = _.request.body;
        newsItem.postImage = _.request.postImage;
        newsItem.title = _.request.title;
        callback(null, newsItem);
    },
    deleteNews: (_, callback) => {
        const newsRequestId = _.request.id;
        let index = data.news.findIndex((n) => n.id == newsRequestId);
        data.news.splice(index, 1)
        callback(null, {});
    },
});

server.bindAsync(
    '127.0.0.1:50052',
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log('Server running at http://127.0.0.1:50052');
        server.start();
    }
);