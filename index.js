const Docker = require('dockerode');
const events = require("events");
const JSuck = require("./jsuck.js");

class DockerEvents extends events.EventEmitter {
    constructor(options = { socketPath: '/var/run/docker.sock' }) {
        super()
        
        this.docker = new Docker(options)
        this.running = false;
    }
    start() {
        
        this.running = true;
        this.docker.getEvents((err, res)=>{
          if (err) {
            return this.emit("error", err);
          }
      
          this.res = res;     
          this.emit("connect");
      
          const parser = new JSuck();
          parser.on("error", error=>{
            this.emit("error", error.message ? error.message : error);
          });
          res.pipe(parser);
      
          parser.on("data", data=>{
            this.emit("_message", data);
            this.emit(data.status, data);
          });
      
          parser.on("end", ()=>{
            this.emit("disconnect");
            this.res = null;
      
            if (this.running) {
              this.start();
            }
          });
        });
        return this;
    }
    stop() {
        this.running = false;
        if (this.res) {
          this.res.destroy();
        } 
        return this;
    }    
}
module.exports=DockerEvents