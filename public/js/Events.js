let events = {}; // cleaning up namespace


events.emitKeyPress = function(pack){
    socket.emit('keyPress', pack)
};


events.emitNewNick = function(pack){
    socket.emit('newNick', pack)
};

events.emitNewMessage = function(pack){
    console.log(pack);
    socket.emit('newMessage', pack);
};

events.emitNewPurchase = function(pack){
    socket.emit('newPurchase', pack);
};


events.ping = function() {
    socket.emit('getPing')
};


events.emitPlayerDash = function(){
    console.log('dashing');
    socket.emit('dash', keyPresses);
};


socket.on('timersInfo', pack => {
    timers = pack;
});
socket.on('getPing', (pack)=>{
    console.log(pack);
    let currentPing = Date.now() - ping;

    pack.msg= `[${pack.nick}] has ${currentPing} ms ping.`;
    socket.emit('newMessage', pack);
    ping = 0;
});

socket.on('newMessage', (pack)=>{
    console.log(pack);
    let nick;
    //TODO: Icons should be enums
    let userImage = './Media/blue-cube.png';
    let hasClass;
    if (pack.user){
        nick = pack.nick
    }
    else {
        nick = "SERVER"
    }
    if (pack.user){
        hasClass = 'user-message'
    }
    else {
        hasClass = 'server-message'
    }

    handler.appendMessage(nick, hasClass, pack.msg)

});

socket.on('upgradesUpdate', (pack)=>{
    upgrades = pack;
});
/*
socket.on('playerInfo', (pack)=> {
    players = pack;

    for (let x in players){
        if (players[x].id === socket.id){
            self = players[x];
        }
    }
});
*/


socket.on('playerConnect', player=> {
    handler.playerConnect(player);
});


socket.on('playerUpdate', pack =>{
    handler.playerUpdate(pack);
});


socket.on('playerDisconnect', (pack)=>{
    handler.playerDisconnect(pack);
});

/*
socket.on('shrink', () => {
    shrinkWorld();
});*/

socket.on('enemiesUpdate', pack => {
    handler.enemyUpdate(pack);
});

socket.on('foodsUpdate', (pack) => {
    handler.foodUpdate(pack);
});

socket.on('potionsUpdate', (pack)=>{
    potions = pack;
});
/*
socket.on('draw', ()=>{
    updateDisplay();
});

*/