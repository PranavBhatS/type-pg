import MainServer from './MainServer';

const exampleServer = new MainServer();
const { PORT=3000, LOCAL_ADDRESS='157.45.239.175' } = process.env
exampleServer.start(process.env.NODE_PORT || PORT,LOCAL_ADDRESS);