const chalk = require('chalk');
const log = console.log;

const { EventEmitter } = require('events');
const firstEmitter = new EventEmitter();

firstEmitter.emit('My first event');
