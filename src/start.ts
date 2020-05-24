import MainServer from './MainServer';

const exampleServer = new MainServer();
const { PORT=3000, LOCAL_ADDRESS='0.0.0.0' } = process.env
exampleServer.start(process.env.NODE_PORT || PORT,LOCAL_ADDRESS);