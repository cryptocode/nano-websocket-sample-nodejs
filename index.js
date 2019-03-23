const WS = require('ws');
const ReconnectingWebSocket = require('reconnecting-websocket');

// Create a reconnecting WebSocket.
// In this example, we wait a maximum of 2 seconds before retrying.
const ws = new ReconnectingWebSocket('ws://[::1]:7078', [], {
	WebSocket: WS,
	connectionTimeout: 1000,	
	maxRetries: 100000,
	maxReconnectionDelay: 2000
});

// As soon as we connect, subscribe to block confirmations
ws.onopen = () => {
	const subscription = {
		"action": "subscribe", 
		"topic": "confirmation"
	}
	ws.send(JSON.stringify(subscription));
};

// The node sent us a confirmation
ws.onmessage = msg => {
	console.log(msg.data);
	if (msg.data.topic === "confirmation") {
		console.log ('Confirmed', data.message.hash)
	}
};
