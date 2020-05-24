import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { sequelize } from './services/database/db.config';
import * as cors from "cors";
class MainServer extends Server {
    private readonly SERVER_STARTED = 'main server started on port: ';
    constructor() {
        super(true);
        const options: cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin:'https://pgdbtype.herokuapp.com',
            preflightContinue: false
        };
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors(options))
        this.setupControllers();
    }

    setupControllers() {
        const ctlrInstances = [];
        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctlrInstances.push(new controller());
            }
        }
        super.addControllers(ctlrInstances);
    }
    public start(port: any,LOCAL_ADDRESS:any): void {
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port,LOCAL_ADDRESS, () => {
            sequelize.authenticate().then(async () => {
                await sequelize.sync()
                Logger.Imp("db connected");
            })
                .catch(err => {
                    console.log(err)
                    Logger.Err("error occered during db connection");
                })
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default MainServer;