# Flights & Auth API - AVIOBOOK

This project provides a backend API for managing flight information and user authentication. The backend is built with Node.js and uses Firebase for authentication and MongoDB for data storage. The API supports user authentication and flight-related operations.

## Features

- **User Authentication**: Firebase authentication.
- **Flight Management**: Add, update, delete, and list flight information.
- **MongoDB**: Uses MongoDB for storing flight-related data.
- **Firebase**: Handles user authentication, including signup, login, and user verification.
- **Traefik**: Acts as a reverse proxy for routing HTTP traffic to the app.

## Technologies Used

- **Node.js**: The runtime environment for building the backend.
- **Express.js**: Web framework for Node.js to handle HTTP requests.
- **MongoDB**: NoSQL database to store flight information.
- **Firebase**: Used for authentication, including signup, login, and user verification.
- **Traefik**: Reverse proxy to handle traffic and load balancing.
- **Docker**: For containerizing the application.
- **Jest**: Testing framework for unit and integration tests.

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (>=v14)
- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)
- [Traefik](https://traefik.io/)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/iglesias9627/avio_project.git
cd avio_project

