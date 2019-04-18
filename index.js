const WS = require('ws');
const ReconnectingWebSocket = require('reconnecting-websocket');

// Create a reconnecting WebSocket.
// In this example, we wait a maximum of 2 seconds before retrying.
const ws = new ReconnectingWebSocket('ws://[::1]:7078', [], {
	WebSocket: WS,
	connectionTimeout: 1000,	
	maxRetries: 100000,
	maxReconnectionDelay: 2000,
	minReconnectionDelay: 10 // if not set, initial connection will take a few seconds by default
});

// As soon as we connect, subscribe to block confirmations
ws.onopen = () => {
	const confirmation_subscription = {
		"action": "subscribe", 
		"topic": "confirmation",
		"ack": true,
	}
	ws.send(JSON.stringify(confirmation_subscription));

	// Other subscriptions can go here
};

// The node sent us a message
ws.onmessage = msg => {
	console.log(msg.data);
	data_json = JSON.parse(msg.data);

	if (data_json.topic === "confirmation") {
		console.log ('Confirmed', data_json.message.hash)
	}
};
