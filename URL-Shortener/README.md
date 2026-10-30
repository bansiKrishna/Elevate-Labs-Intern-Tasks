# URL Shortener

A full-stack URL Shortener application built with **Spring Boot 3.3, Java 17, and Next.js**. It allows users to convert long URLs into short links, redirect visitors to their original destinations, and track link performance through click statistics.

## Features

- **URL Shortening:** Convert long URLs into compact, shareable links.
- **Custom Aliases:** Create personalized short URLs.
- **URL Redirection:** Redirect visitors to the original URL using HTTP 302.
- **Click Tracking:** Track the number of times a short URL is accessed.
- **URL Statistics:** Retrieve metadata and click statistics for shortened URLs.
- **Expiration Support:** Configure an optional expiration period for short links.
- **Persistent Storage:** Store URL records using an H2 file-based database.
- **Caching:** Improve performance with Caffeine cache.
- **API Documentation:** Explore and test endpoints through Swagger UI.
- **Responsive Frontend:** Access the application through a Next.js web interface.

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- Java 17
- Spring Boot 3.3
- Spring Web
- Spring Data JPA
- H2 Database
- Caffeine Cache
- Swagger / OpenAPI
- Maven

### Development and Deployment
- Git and GitHub
- Visual Studio Code / IntelliJ IDEA
- Docker
- Vercel for frontend deployment
- Render for backend deployment

> Deployment platforms are intended options. The application is not necessarily deployed until the deployment process is completed.

## Project Structure

```text
url-shortener/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       └── resources/
│   ├── data/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── Dockerfile
│
├── frontend/
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

*The directory structure above is representative. Actual package names and files may vary.*

## Prerequisites

Install the following tools before running the project:

- Java Development Kit (JDK) 17 or compatible version
- Node.js and npm
- Git
- Docker (optional, for containerized deployment)

The Maven Wrapper is included in the backend project, so a separate Maven installation is not required if the wrapper files are present.

## Getting Started

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd url-shortener
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your actual GitHub repository URL.

### 2. Start the Backend

Open a terminal and navigate to the backend directory:

```powershell
cd backend
```

Run the Spring Boot application using the Maven Wrapper.

**Windows PowerShell:**

```powershell
.\mvnw.cmd spring-boot:run
```

**Linux / macOS:**

```bash
./mvnw spring-boot:run
```

The backend runs at:

```text
http://localhost:8080
```

Swagger UI:

```text
http://localhost:8080/swagger-ui.html
```

H2 Database Console:

```text
http://localhost:8080/h2-console
```

H2 JDBC URL:

```text
jdbc:h2:file:./data/urlshortener
```

Default H2 username:

```text
sa
```

The database password depends on your application configuration.

### 3. Configure the Frontend

Open another terminal and navigate to the frontend directory:

```powershell
cd frontend
```

Create a `.env.local` file in the frontend directory:

```env
API_BASE_URL=http://localhost:8080
```

This variable configures the frontend server to communicate with the Spring Boot backend. The actual variable name must match the one used in the application code.

**Important:** Do not expose server-side environment variables unnecessarily through `NEXT_PUBLIC_` variables.

### 4. Install Frontend Dependencies

```bash
npm install
```

### 5. Start the Frontend

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:3000
```

Keep both the backend and frontend development servers running while testing locally.

## API Endpoints

The backend exposes the following REST API endpoints.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/urls` | Create a shortened URL |
| GET | `/{code}` | Redirect to the original URL and count the click |
| GET | `/api/v1/urls/{code}/stats` | Retrieve click statistics and URL metadata |

### Create a Short URL

**Request**

```http
POST /api/v1/urls
Content-Type: application/json
```

**Request Body**

```json
{
  "longUrl": "https://www.example.com/very/long/path",
  "expiryDays": 7
}
```

The API also supports an optional `customAlias` field.

**Example using cURL**

```bash
curl -X POST http://localhost:8080/api/v1/urls \
  -H "Content-Type: application/json" \
  -d '{"longUrl":"https://www.example.com/very/long/path","expiryDays":7}'
```

The response structure depends on the backend implementation.

### Redirect to the Original URL

Open the shortened URL in a browser:

```text
http://localhost:8080/{code}
```

The backend responds with an HTTP 302 redirect to the original URL and records the click.

Replace `{code}` with the actual short code returned by the URL creation endpoint.

### Retrieve URL Statistics

```http
GET /api/v1/urls/{code}/stats
```

This endpoint returns click statistics and metadata for the specified short code.

For complete request and response details, use Swagger UI.

## Database

The application uses an H2 file-based database.

Default JDBC URL:

```text
jdbc:h2:file:./data/urlshortener
```

The database stores application records according to the configured JPA entities and schema.

**Deployment consideration:** Container filesystems may be temporary. Configure persistent storage for the H2 database file before deploying if shortened URLs must survive container replacement or redeployment.

## Docker Deployment

The backend includes a Dockerfile for containerized execution.

### Build the Backend Image

Run the following commands from the backend directory:

```bash
docker build -t url-shortener-backend .
```

### Run the Container

```bash
docker run -d \
  --name url-shortener-api \
  -p 8080:8080 \
  url-shortener-backend
```

On Windows PowerShell, the equivalent command can be written on one line:

```powershell
docker run -d --name url-shortener-api -p 8080:8080 url-shortener-backend
```

### View Container Logs

```bash
docker logs -f url-shortener-api
```

### Stop the Container

```bash
docker stop url-shortener-api
```

### Remove the Container

```bash
docker rm url-shortener-api
```

Ensure that the Dockerfile's Java version and generated JAR filename match the backend's Maven configuration.

## Production Deployment

The application can be deployed using separate frontend and backend hosting services.

### Frontend

Deploy the Next.js application using Vercel or another compatible hosting provider.

Configure the environment variable:

```env
API_BASE_URL=https://your-backend-domain.com
```

Replace the example domain with the actual deployed backend URL.

### Backend

Deploy the Spring Boot application using Docker on Render or another container-compatible hosting provider.

Verify the following before production use:

- The application starts successfully.
- The frontend uses the correct backend URL.
- CORS permits the deployed frontend origin.
- The database has suitable persistent storage.
- Production environment variables and credentials are configured securely.
- HTTP redirects and click statistics work correctly.

## Future Enhancements

Potential improvements include:

- Redis-based caching and distributed rate limiting
- MySQL or PostgreSQL integration
- QR code generation for shortened URLs
- User authentication and URL management
- Analytics dashboard with click trends
- Geographic and referrer-based analytics
- Link expiration management
- Abuse prevention and request validation

These are possible future enhancements, not claims about existing functionality.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Implement and test your changes.
4. Commit your changes with a descriptive message.
5. Open a pull request.

## License

Choose and add an appropriate open-source license before distributing the project publicly.