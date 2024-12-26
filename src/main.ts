import WebSocket from "ws";

// Binance WebSocket endpoint
const binanceWS = "wss://stream.binance.com:9443/ws/btcusdt@trade";

// Create WebSocket connection
const socket = new WebSocket(binanceWS);

// Handle connection open
socket.on("open", () => {
    console.log("Connected to Binance WebSocket");
});

// Handle incoming messages
socket.on("message", (data: WebSocket.Data) => {
    const trade = JSON.parse(data.toString());
    console.log(`Trade: ${trade.s} - Price: ${trade.p}, Quantity: ${trade.q}`);
});

// Handle errors
socket.on("error", (err: Error) => {
    console.error("WebSocket error:", err);
});

// Handle connection close
socket.on("close", () => {
    console.log("Disconnected from Binance WebSocket");
});
