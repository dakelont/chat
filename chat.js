const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;
    
    this.close = function(){
       this.emit("close", '-----------------------------');
    };

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
    }, 1000);
  }
}


let webinarChat  = new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat       = new ChatApp('---------vk')
                          .setMaxListeners(1);

let chatOnMessage = (message) => {
  console.log(message);
};

let readyForAnswer = (message) => {
  console.log('Готовлюсь к ответу');
};

webinarChat.on('message', readyForAnswer);
webinarChat.on('message', chatOnMessage);

facebookChat.on('message', chatOnMessage);

vkChat.on('message', readyForAnswer);
vkChat.on('message', chatOnMessage);
vkChat.once('close', function(message) {
    console.log('Чат вконтакте закрылся :(');
});


// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
vkChat.removeListener('message', readyForAnswer);
vkChat.removeListener('message', chatOnMessage);
}, 10000 );

// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю чат...');
  webinarChat.removeListener('message', readyForAnswer);
  webinarChat.removeListener('message', chatOnMessage);
}, 16000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', readyForAnswer);
  facebookChat.removeListener('message', chatOnMessage);
}, 15000 );