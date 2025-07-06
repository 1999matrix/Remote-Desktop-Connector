```markdown
# Remote-Desktop-Connector

> A lightweight Electron.js application leveraging WebSockets for real-time remote desktop sharing between hosts.

![Remote-Desktop-Connector Demo](assets/demo.gif)

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Architecture](#architecture)  
- [Configuration](#configuration)  
- [Security & Performance](#security--performance)  
- [Troubleshooting](#troubleshooting)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Overview

**Remote-Desktop-Connector** is a desktop application built with [Electron.js](https://www.electronjs.org/) and [Socket.IO](https://socket.io/). It enables one host to view and interact with the screen of another host in real time, over your local network or the internet. Perfect for remote support, demos, or collaborative work.

---

## Features

- 🔌 **Peer-to-Peer** connection using WebSockets (Socket.IO)  
- 📺 **Live Screen Sharing** with ultra-low latency  
- 🔒 End-to-end encryption (optional TLS)  
- 🎥 Adjustable frame rate & quality settings  
- 👥 Multi-host support (one viewer, multiple hosts)  
- 🌐 Cross-platform: Windows, macOS & Linux  

---

## Prerequisites

- **Node.js** v14+ & **npm** or **Yarn**  
- **Git** (for cloning)  
- **Electron** (bundled in `devDependencies`)  
- (Optional) **Self-signed TLS certificate** for secure WebSocket (`wss://`)  

---

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-org/remote-desktop-connector.git
   cd remote-desktop-connector
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Build & Run in development**  
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Package for distribution**  
   ```bash
   npm run build
   npm run dist
   # or
   yarn build
   yarn dist
   ```

---

## Usage

1. **Start the Signaling Server**  
   ```bash
   npm run server
   # Listens on http://localhost:3000 by default
   ```

2. **Launch the Electron App**  
   ```bash
   npm start
   ```

3. **Host Mode (Sharing Your Screen)**  
   - Select **“Host”** from the main menu.  
   - Copy the generated **session code** or **URL**.  
   - Share it with the viewer.

4. **Viewer Mode (Viewing a Remote Screen)**  
   - Select **“Viewer”** from the main menu.  
   - Enter the **session code** or **URL** you received.  
   - Click **Connect** to begin streaming.

---

## Architecture

```mermaid
graph TD
  A[Screen Capturer] --> B[Renderer Process]
  B --> C[WebSocket Client]
  C <--> D[Signaling Server]
  D <--> E[WebSocket Client]
  E --> F[Renderer Process (Viewer)]
  F --> G[Display Canvas]
```

1. **Main Process**  
   - Initializes Electron app, menus & security policies.  
2. **Renderer Process**  
   - Captures screen frames via `desktopCapturer`.  
   - Renders remote frames onto a `<canvas>`.  
3. **WebSocket Signaling Server**  
   - Facilitates session negotiation & data relay.  

---

## Configuration

| Variable               | Default         | Description                              |
|------------------------|-----------------|------------------------------------------|
| `SERVER_PORT`          | `3000`          | Port for the signaling server            |
| `ENABLE_TLS`           | `false`         | Toggle secure WebSocket (`wss://`)       |
| `TLS_CERT_PATH`        | `./cert.pem`    | Path to SSL certificate                  |
| `TLS_KEY_PATH`         | `./key.pem`     | Path to SSL private key                  |
| `FRAME_RATE`           | `15`            | Capture frame rate (FPS)                 |
| `VIDEO_QUALITY`        | `0.8`           | JPEG compression quality (0.0–1.0)       |

Configure by creating a `.env` file at project root:
```bash
cp .env.example .env
```

---

## Security & Performance

- **Encryption**  
  - Enable `ENABLE_TLS=true` and provide valid TLS certs for end-to-end encryption.  
- **Bandwidth Tuning**  
  - Adjust `FRAME_RATE` and `VIDEO_QUALITY` in `.env` to balance smoothness vs. bandwidth.  
- **Firewall/NAT**  
  - Open the signaling server port and configure port-forwarding for internet use.  

---

## Troubleshooting

- **Black Screen on Viewer**  
  - Ensure the host grants “Screen Recording” permissions (macOS).  
  - Verify the host’s firewall allows Electron to capture and send frames.  
- **Connection Refused**  
  - Confirm the signaling server is running and accessible.  
  - Check IP/port correctness.  
- **High Latency**  
  - Lower `FRAME_RATE` or `VIDEO_QUALITY`.  
  - Use a wired network or reduce network hops.  

---

## Contributing

1. Fork the repo  
2. Create a feature branch (`git checkout -b feature/YourFeature`)  
3. Commit your changes (`git commit -m 'Add awesome feature'`)  
4. Push to your branch (`git push origin feature/YourFeature`)  
5. Open a Pull Request.  

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) and keep commits clean.

---

## License

Distributed under the [MIT License](LICENSE).  
© 2025 Your Name (or Organization).  

---
```
