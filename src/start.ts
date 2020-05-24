import MainServer from './MainServer';

const exampleServer = new MainServer();
exampleServer.start(process.env.NODE_PORT || 3000);