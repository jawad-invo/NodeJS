const cron = require('node-cron');
import events from 'events';
const eventEmitter = new events.EventEmitter();

async function cronJob() {
    cron.schedule('* * * * * *', function () {
        console.log("Cron Job Running");
    })
}

async function myEvent() {
    eventEmitter.on('My Event', myEventHandler);
}

function myEventHandler(): void {
    console.log("My Event is Fired!");
}

myEvent();
eventEmitter.emit('My Event');

// cronJob();