# 🍔 Dinezo

### A Real-Time, Microservices-Based Food Delivery Platform

> A full-stack food delivery ecosystem built with **microservices, asynchronous communication, real-time tracking, and distributed-system principles.**

Dinezo is a food delivery platform designed around a **microservices architecture**, with separate services for core business capabilities and dedicated workflows for **customers, restaurants, riders, and administrators**.

The platform focuses on building a realistic distributed application where services communicate through APIs and messaging while real-time events keep clients synchronized.

---

## ✨ What Dinezo Implements

Dinezo covers the complete food-delivery lifecycle:

```text
👤 Customer
    │
    ▼
🍽️ Browse Restaurants
    │
    ▼
🛒 Place Order
    │
    ▼
💳 Payment
    │
    ▼
🏪 Restaurant Processing
    │
    ▼
🛵 Rider Assignment
    │
    ▼
📍 Live Delivery Tracking
    │
    ▼
🏠 Order Delivered
```

---

# 🏗️ Architecture

The application follows a **microservices-based architecture**, separating business responsibilities into independently manageable services.

```text
                         ┌─────────────────────┐
                         │     React Client    │
                         │                     │
                         │ Customer / Rider /  │
                         │ Restaurant / Admin  │
                         └──────────┬──────────┘
                                    │
                           REST / Socket.IO
                                    │
                                    ▼
                    ┌──────────────────────────┐
                    │      Backend Services    │
                    └────────────┬─────────────┘
                                 │
                         RabbitMQ Messaging
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
          ▼                      ▼                      ▼
    🔐 Auth Service       🍽️ Restaurant Service    📦 Order Service
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                                 ▼
                         🛵 Delivery Service
                                 │
                                 ▼
                          💳 Payment Service
                                 │
                                 ▼
                            🗄️ MongoDB
```

---

# 🧩 Services

## 🔐 Auth Service

Handles authentication and user identity across the platform.

### Implemented

- 👤 User registration
- 🔑 Login and authentication
- 🛡️ JWT-based authentication
- 🎭 Role-based access
- 🔒 Protected API routes
- 👥 Multiple user roles

---

## 🍽️ Restaurant Service

Manages restaurant-side functionality and food/menu operations.

### Implemented

- 🏪 Restaurant management
- 🔐 Restaurant authentication
- 🍔 Food/menu management
- ➕ Add food items
- ✏️ Update food items
- ❌ Remove food items
- 📋 Restaurant order workflow
- 📊 Restaurant dashboard

---

## 📦 Order Service

Responsible for the core order lifecycle.

### Implemented

- 🛒 Order creation
- 📦 Order management
- 🔄 Order status updates
- 🏪 Restaurant-side order processing
- 👤 Customer order tracking
- 🔔 Real-time order updates

---

## 🛵 Delivery / Rider Service

Handles delivery operations and rider workflows.

### Implemented

- 🛵 Rider management
- 📦 Delivery assignment
- 🔄 Delivery status updates
- 📍 Rider location tracking
- 🗺️ Real-time delivery tracking
- 🔔 Delivery notifications

---

## 💳 Payment Service

Handles payment-related operations independently from the order workflow.

### Implemented

- 💳 Payment processing
- 🔐 Payment verification
- 🔄 Payment status handling
- 💰 Razorpay integration
- 💳 Stripe integration

---

# ⚡ Real-Time Communication

Real-time functionality is implemented using **Socket.IO**.

```text
🏪 Restaurant
      │
      │ Order Status Update
      ▼
⚡ Socket.IO
      │
      ├──────────────► 👤 Customer
      │
      └──────────────► 🛵 Rider
```

This enables:

- ⚡ Live order status updates
- 📍 Rider location updates
- 🚚 Real-time delivery tracking
- 🔔 Instant notifications
- 🔄 Client synchronization

Instead of repeatedly polling the backend, connected clients receive updates as events occur.

---

# 📨 RabbitMQ

**RabbitMQ** is used for asynchronous communication between services.

```text
┌──────────────┐
│ Order Service│
└──────┬───────┘
       │
       │ Publish Event
       ▼
┌────────────────┐
│    RabbitMQ    │
│ Message Broker │
└───────┬────────┘
        │
        ├──────────────► 🍽️ Restaurant Service
        │
        ├──────────────► 🛵 Delivery Service
        │
        └──────────────► Other Services
```

This approach helps services communicate without tightly coupling their implementations.

### Benefits

- 📨 Asynchronous processing
- 🔗 Loose coupling
- 📬 Event-driven communication
- 📈 Better scalability
- 🛡️ Improved service isolation

---

# 📍 Real-Time Delivery Tracking

The rider workflow combines **location updates and Socket.IO** to provide live delivery visibility.

```text
🛵 Rider
   │
   │ Location Update
   ▼
Delivery Service
   │
   │ Socket.IO
   ▼
👤 Customer Client
   │
   ▼
📍 Live Location
```

Customers can follow delivery progress without manually refreshing the application.

---

# 💳 Payment Flow

```text
👤 Customer
      │
      │ Checkout
      ▼
📦 Order Service
      │
      ▼
💳 Payment Service
      │
      ├──────► Razorpay
      │
      └──────► Stripe
      │
      ▼
✅ Payment Verification
      │
      ▼
📦 Order Confirmation
```

Payment responsibilities remain separated from the core order workflow.

---

# 🛠️ Technology Stack

### Frontend

- ⚛️ React.js
- 🟨 JavaScript

### Backend

- 🟢 Node.js
- 🚂 Express.js

### Communication

- ⚡ Socket.IO
- 📨 RabbitMQ

### Database

- 🍃 MongoDB

### Infrastructure

- 🐳 Docker

### Payments

- 💳 Razorpay
- 💳 Stripe

---

---

# 🔄 Order Lifecycle

```text
🛒 Order Placed
       │
       ▼
🏪 Restaurant Receives Order
       │
       ▼
✅ Order Accepted
       │
       ▼
👨‍🍳 Food Preparation
       │
       ▼
📦 Ready for Pickup
       │
       ▼
🛵 Rider Assigned
       │
       ▼
🚚 Out for Delivery
       │
       ▼
📍 Live Tracking
       │
       ▼
🏠 Delivered
```

The order lifecycle can trigger events across the relevant services and connected clients.

---

## ⭐ Thanks for checking out Dinezo!

Built with ❤️, JavaScript, distributed systems, and a lot of debugging.
