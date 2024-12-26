import WebSocket from "ws";
import * as admin from "firebase-admin";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Check for the service account key path in the environment variable
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!serviceAccountPath) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set.");
}

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath)),
});

const db = admin.firestore();

// Binance WebSocket endpoint
const binanceWS = "wss://stream.binance.com:9443/ws/btcusdt@trade";
const socket = new WebSocket(binanceWS);

socket.on("open", () => {
    console.log("Connected to Binance WebSocket");
});

socket.on("message", async (data: WebSocket.Data) => {
    const trade = JSON.parse(data.toString());
    console.log(`Trade: ${trade.s} - Price: ${trade.p}, Quantity: ${trade.q}`);

    // Save to Firestore
    try {
        await db.collection("trades").add({
            symbol: trade.s,
            price: parseFloat(trade.p),
            quantity: parseFloat(trade.q),
            timestamp: trade.T,
        });
        console.log("Trade saved to Firestore");
    } catch (error) {
        console.error("Error saving trade to Firestore:", error);
    }
});

socket.on("error", (err: Error) => {
    console.error("WebSocket error:", err);
});

socket.on("close", () => {
    console.log("Disconnected from Binance WebSocket");
});
