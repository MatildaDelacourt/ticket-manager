const chalk = require('chalk');
const log = console.log;

const TicketManager = require('./ticketManager');
const EmailService = require('./emailService');
const DatabaseService = require('./databaseService');

const ticketManager = new TicketManager(3);
const emailService = new EmailService();
const databaseService = new DatabaseService();

ticketManager.on('buy', (email, price, timestamp) => {
  emailService.send(email);
  databaseService.save(email, price, timestamp);
});
ticketManager.on('error', (error) => {
  console.error(`Gracefully handling our error: ${error}`);
});

log(
  chalk.magenta(
    `We have ${ticketManager.listenerCount(
      'buy'
    )} listener(s) for the buy event \n`
  )
);
log(
  chalk.magenta(
    `We have ${ticketManager.listenerCount(
      'error'
    )} listener(s) for the error event \n`
  )
);

const onBuy = () => {
  log(chalk.red('I will be removed soon \n'));
};

ticketManager.on('buy', onBuy);

log(
  chalk.magenta(
    `We added a new event listener bringing our total count for the buy event to: ${ticketManager.listenerCount(
      'buy'
    )}\n`
  )
);

ticketManager.buy('test@email', 20);

ticketManager.off('buy', onBuy);
log(
  chalk.magenta(
    `We now have: ${ticketManager.listenerCount(
      'buy'
    )} listener(s) for the buy event \n`
  )
);

ticketManager.buy('test@email', 20);

ticketManager.removeAllListeners('buy');
log(
  chalk.magenta(
    `We have ${ticketManager.listenerCount(
      'buy'
    )} listeners for the buy event \n`
  )
);
ticketManager.buy('test@email', 20);

log(chalk.yellow('✨ The last ticket was bought ✨\n'));
