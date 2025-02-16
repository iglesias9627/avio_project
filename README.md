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
```

## Deploy using Docker

This application was executed using Docker version 4.37.1.

To deploy the application using Docker, follow these steps:

1. Navigate to the directory where the `docker-compose.yml` file is located.

    ```bash
    cd avio_project
    ```

2. Run the following command in the terminal to start the Docker containers in the background.

    ```bash
    docker-compose up -d
    ```

This command will initiate the deployment process and run the Docker containers detached from the terminal.

`avio_project_mongo/data` will store the data from MongoDB to persist data.     

## Docker Images
When executing docker-compose up -d, Docker will automatically download the images hosted in my public DockerHub repository. However, if you prefer to download the image separately beforehand, you can use the following command:

```bash 
docker pull iglesias9627/avio_flight_api:v0.0.1
```