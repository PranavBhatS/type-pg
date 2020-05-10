import * as bodyParser from 'body-parser';
import * as controllers from './controllers';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { sequelize } from './services/database/db.config';

class MainServer extends Server {
    private readonly SERVER_STARTED = 'main server started on port: ';
    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
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
    public start(port: number): void {
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port);
        });
        this.app.listen(port, () => {
            sequelize.authenticate().then(async()=>{
                await sequelize.sync()
                Logger.Imp("db connected");
            })
            .catch(err=>{
                Logger.Err("error occered during db connection");
            })
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default MainServer;