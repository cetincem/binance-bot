# Binance Bot
A real-time cryptocurrency trading bot using Binance WebSocket API and Firebase Firestore


## Environment Variables

The project uses the following environment variables to configure Firebase:

| Variable Name              | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `FIREBASE_SERVICE_ACCOUNT_KEY` | Path to your Firebase service account key JSON file. This file is required to authenticate and interact with Firebase Firestore. |

### Setting Up Environment Variables

1. Create a `.env` file in the project root:   
```bash
touch .env
```

2. Add the path to your Firebase service account key:
```bash
FIREBASE_SERVICE_ACCOUNT_KEY=./path/to/your/serviceAccountKey.json
```