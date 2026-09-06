# Real-Time & Background Processing Architecture

## 1. Real-Time WebSockets (Socket.IO)

Real-time capabilities are orchestrated using **Socket.IO** attached directly to the primary HTTP server.

### 1.1 Horizontal Scaling via Redis Adapter
When multiple API container instances are deployed behind Nginx or a cloud load balancer, WebSockets use `@socket.io/redis-adapter` over Redis Pub/Sub channels to seamlessly distribute events across instances.

```
Instance 1 (API) <─── Pub/Sub ───> [ Redis Cluster ] <─── Pub/Sub ───> Instance 2 (API)
       │                                                                      │
Connected Client A                                                     Connected Client B
```

### 1.2 Channel & Room Architecture
- `user:{userId}`: Private unicast room joined upon authenticated connection for direct user notifications.
- `conversation:{conversationId}`: Multicast room for peer-to-peer and group discussion channels.
- `route:{routeId}`: High-frequency telemetry channel for live bus tracking broadcasts.

### 1.3 Event Catalog
- `notification:new`: Dispatched when system alerts, grades, or administrative notices occur.
- `attendance:updated`: Fired when a faculty member records an attendance session.
- `assignment:submitted`: Dispatched to faculty when a student uploads coursework.
- `result:published`: Dispatched to students and parents upon grade approval.
- `bus:location`: Emitted at 3-5 second intervals with GPS latitude, longitude, and speed.
- `fee:payment`: Dispatched upon successful invoice settlement.

---

## 2. Background Job Queues (BullMQ)

Asynchronous workflows and heavy tasks run outside the HTTP request lifecycle via **BullMQ** workers powered by Redis:

- `email-queue`: Handles transactional emails, password resets, and circular dispatches with automatic exponential backoff retry.
- `notification-queue`: Dispatches push alerts, SMS gateways, and in-app notifications.
- `report-queue`: Asynchronously renders complex multi-page PDF statements and Excel ledgers without blocking web requests.
