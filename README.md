# ✈️ TravelBuddy — Travel Planning & Booking Platform

> A complete full-stack **MERN** (MongoDB, Express.js, React.js, Node.js) Travel Planning & Booking Platform — plan trips, book flights & hotels, build itineraries, share travel blogs, and get AI-based recommendations.

![TravelBuddy Screenshot Placeholder](https://via.placeholder.com/1200x600/2563eb/ffffff?text=TravelBuddy+Travel+Planning+%26+Booking+Platform)

---

## 🌟 Key Features

| Feature | Description |
|---------|-------------|
| **🗺️ Trip Planner** | Create & manage trips with day-by-day itinerary builder |
| **✈️ Flight Search** | Search & book flights via mock flight APIs |
| **🏨 Hotel Search** | Discover & book hotels with ratings and amenities |
| **📅 Itinerary Builder** | Drag-and-drop style day planning with activity tables |
| **📝 Travel Blog** | Share travel stories with rich media and image galleries |
| **💰 Expense Splitter** | Split trip costs among travel companions |
| **🌤️ Weather Widget** | Real-time mock weather data for destinations |
| **💱 Currency Converter** | Convert currencies with mock live rates |
| **🎠 Destination Carousel** | Bootstrap 5 carousel for featured destinations |
| **🔍 AJAX Search** | jQuery-powered live search for destinations |
| **🌊 Parallax Scrolling** | CSS3 parallax hero sections |
| **🔐 JWT Authentication** | Secure register/login with protected routes |

---

## 🛠 Tech Stack

### Frontend
- **React 18** — Functional components & hooks
- **React Router v6** — Client-side routing
- **Redux Toolkit + Redux Saga** — Async state management (multi-step booking flow)
- **Bootstrap 5** — Carousel, cards, tabs, modals, responsive grid
- **jQuery 3.7** — AJAX-powered live search & DOM effects
- **CSS3** — Parallax scrolling, gradient backgrounds, animations, CSS custom properties
- **Axios** — HTTP client for API calls

### Backend
- **Node.js + Express.js** — REST API server
- **MongoDB + Mongoose** — Database with ODM
- **JWT (jsonwebtoken)** — Authentication & authorization
- **bcryptjs** — Password hashing
- **Multer** — Image/file upload handling
- **Morgan** — HTTP request logging
- **CORS** — Cross-origin resource sharing

### Mock Services
- ✈️ Mock Flight API (search & book flights)
- 🏨 Mock Hotel API (search & book hotels)
- 🌤️ Mock Weather API (current & forecast data)
- 💱 Mock Currency API (real-time exchange rates)

---

## 📋 Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org))
- **MongoDB** v6+ ([Download](https://mongodb.com) or use MongoDB Atlas)
- **npm** v9+ (included with Node.js)
- **Git** ([Download](https://git-scm.com))

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/swapnil-154/TravelBuddy.git
cd TravelBuddy
```

### 2. Install All Dependencies
```bash
# Install root dependencies (concurrently, nodemon)
npm install

# Install server dependencies
npm install --prefix server

# Install client dependencies
npm install --prefix client
```

### 3. Configure Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your values
nano .env  # or use your editor of choice
```

**Required `.env` variables** (the app will not start without these):
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/travelbuddy
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=30d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

> **Note:** No external API keys are needed to run the app. Stripe, Twilio, and Email settings in `.env.example` are optional — the app uses mock/fallback services when they are not configured. See the [Environment Variables](#-environment-variables) section for details.

### 4. Seed the Database (Optional)
```bash
npm run seed
```
This populates the database with sample destinations, users, blogs, and reviews.

### 5. Start Development Server
```bash
# Run both client & server concurrently
npm run dev
```

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/health

### Individual Start Commands
```bash
# Start server only (with nodemon hot-reload)
npm run server

# Start client only
npm run client

# Start server in production mode
npm start
```

---

## 📡 API Documentation

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login with email/password | ❌ |
| GET | `/api/auth/me` | Get current logged-in user | ✅ |
| PUT | `/api/auth/profile` | Update user profile | ✅ |

### Destinations
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/destinations` | List destinations (paginated, filterable) | ❌ |
| GET | `/api/destinations/search?q=` | Live search destinations | ❌ |
| GET | `/api/destinations/:id` | Get single destination detail | ❌ |
| POST | `/api/destinations` | Create destination (admin) | ✅ Admin |
| PUT | `/api/destinations/:id` | Update destination (admin) | ✅ Admin |
| DELETE | `/api/destinations/:id` | Delete destination (admin) | ✅ Admin |

### Trips / Itineraries
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/trips` | Get user's trips | ✅ |
| GET | `/api/trips/:id` | Get single trip | ✅ |
| POST | `/api/trips` | Create new trip | ✅ |
| PUT | `/api/trips/:id` | Update trip | ✅ |
| DELETE | `/api/trips/:id` | Delete trip | ✅ |

### Bookings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/bookings` | Get user's bookings | ✅ |
| GET | `/api/bookings/:id` | Get single booking | ✅ |
| POST | `/api/bookings` | Create booking | ✅ |
| PUT | `/api/bookings/:id/status` | Update booking status | ✅ |

### Blogs
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/blogs` | List blog posts | ❌ |
| GET | `/api/blogs/:id` | Get single blog post | ❌ |
| POST | `/api/blogs` | Create blog post | ✅ |
| PUT | `/api/blogs/:id` | Update blog post | ✅ |
| DELETE | `/api/blogs/:id` | Delete blog post | ✅ |
| POST | `/api/blogs/:id/comment` | Add comment | ✅ |
| POST | `/api/blogs/:id/like` | Like/unlike post | ✅ |

### Reviews
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/reviews/destination/:destId` | Get destination reviews | ❌ |
| POST | `/api/reviews` | Create review | ✅ |
| PUT | `/api/reviews/:id` | Update review | ✅ |
| DELETE | `/api/reviews/:id` | Delete review | ✅ |

### Mock Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/weather/:destination` | Weather data for destination |
| GET | `/api/flights/search?from=&to=&date=` | Search available flights |
| GET | `/api/hotels/search?destination=&checkIn=&checkOut=` | Search hotels |
| GET | `/api/currency/rates` | Get currency exchange rates |
| GET | `/api/currency/convert?from=&to=&amount=` | Convert currency |

---

## 📁 Project Structure

```
TravelBuddy/
├── client/                    # React.js Frontend
│   ├── public/
│   │   └── index.html         # HTML with Bootstrap, FontAwesome, jQuery CDN
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Navbar/        # Responsive navbar with auth state
│   │   │   ├── DestinationCarousel/  # Bootstrap 5 carousel
│   │   │   ├── TripCard/      # Trip summary card
│   │   │   ├── BookingForm/   # HTML5 booking form
│   │   │   ├── ItineraryBuilder/    # Day-by-day itinerary table
│   │   │   ├── ExpenseSplitter/     # Cost splitting calculator
│   │   │   ├── WeatherWidget/       # Mock weather data display
│   │   │   ├── CurrencyConverter/   # Currency conversion widget
│   │   │   ├── ImageGallery/        # Lightbox image gallery
│   │   │   ├── ReviewCard/          # User review display
│   │   │   ├── BlogPost/            # Blog preview card
│   │   │   ├── SearchBar/           # jQuery AJAX live search
│   │   │   ├── ParallaxHero/        # CSS3 parallax hero sections
│   │   │   ├── Footer/              # Site footer
│   │   │   └── Loading/             # Loading spinner
│   │   ├── pages/             # Route pages
│   │   │   ├── Home/          # Landing page with all sections
│   │   │   ├── Destinations/  # Destination listings with filters
│   │   │   ├── DestinationDetail/   # Single destination with tabs
│   │   │   ├── TripPlanner/   # Full itinerary builder
│   │   │   ├── FlightSearch/  # Flight search & results
│   │   │   ├── HotelSearch/   # Hotel search & results
│   │   │   ├── BookingFlow/   # Multi-step booking wizard
│   │   │   ├── MyTrips/       # User's trips dashboard
│   │   │   ├── Blog/          # Blog listing
│   │   │   ├── BlogDetail/    # Single blog post with comments
│   │   │   ├── Profile/       # User profile & settings
│   │   │   ├── Login/         # Authentication
│   │   │   ├── Register/      # New account creation
│   │   │   └── NotFound/      # 404 page
│   │   ├── redux/             # Redux Toolkit + Saga
│   │   │   ├── store.js
│   │   │   ├── slices/        # authSlice, destinationSlice, tripSlice, bookingSlice, blogSlice
│   │   │   └── sagas/         # authSaga, tripSaga, bookingSaga, searchSaga, rootSaga
│   │   ├── services/
│   │   │   └── api.js         # Axios instance with interceptors
│   │   ├── styles/
│   │   │   ├── global.css     # CSS with parallax, gradients, animations
│   │   │   ├── variables.css  # CSS custom properties (--primary-color, etc.)
│   │   │   └── animations.css # Keyframe animations
│   │   ├── utils/
│   │   │   ├── currencyConverter.js
│   │   │   ├── dateHelpers.js
│   │   │   ├── validation.js  # RegExp validation
│   │   │   └── formatters.js
│   │   ├── App.jsx            # Main app with routing
│   │   └── index.js           # Entry point with Redux Provider
│   └── package.json
├── server/                    # Node.js + Express Backend
│   ├── config/db.js           # MongoDB connection
│   ├── controllers/           # Route handler logic
│   │   ├── authController.js
│   │   ├── destinationController.js
│   │   ├── tripController.js
│   │   ├── bookingController.js
│   │   ├── blogController.js
│   │   ├── reviewController.js
│   │   └── weatherController.js
│   ├── middleware/
│   │   ├── auth.js            # JWT verification middleware
│   │   ├── errorHandler.js    # Global error handler
│   │   └── upload.js          # Multer file upload config
│   ├── models/                # Mongoose schemas
│   │   ├── User.js
│   │   ├── Destination.js
│   │   ├── Itinerary.js
│   │   ├── Booking.js
│   │   ├── Review.js
│   │   ├── Blog.js
│   │   └── UserPreference.js
│   ├── routes/                # Express routers
│   ├── services/              # Mock third-party APIs
│   │   ├── flightService.js   # Simulated flight search
│   │   ├── hotelService.js    # Simulated hotel search
│   │   ├── weatherService.js  # Simulated weather data
│   │   └── currencyService.js # Simulated currency rates
│   ├── seeds/seedData.js      # Database seeder
│   └── server.js              # Express app entry point
├── .env.example               # Environment variable template
├── .gitignore
├── package.json               # Root with concurrently scripts
└── README.md
```

---

## 🔧 Environment Variables

### Required

These variables are needed for the app to start and function:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string (local or [Atlas](https://www.mongodb.com/atlas)) | `mongodb://localhost:27017/travelbuddy` |
| `JWT_SECRET` | Secret key for JWT signing - use any long random string | None (must be set) |
| `JWT_EXPIRE` | JWT token expiry duration | `30d` |
| `NODE_ENV` | Environment (`development` / `production`) | `development` |
| `CLIENT_URL` | Frontend URL for CORS | `http://localhost:3000` |

### Optional (Third-Party Services)

> **No external API keys are required to run TravelBuddy.** The app includes built-in mock services for flights, hotels, weather, and currency conversion. The optional keys below enable real third-party integrations — if they are not set, the app will gracefully fall back to mock/demo mode.

| Variable | Service | Purpose | Fallback if not set |
|----------|---------|---------|---------------------|
| `STRIPE_SECRET_KEY` | [Stripe](https://stripe.com) | Process real payments | Mock payment IDs are generated |
| `STRIPE_PUBLISHABLE_KEY` | [Stripe](https://stripe.com) | Client-side Stripe integration | Mock payment mode |
| `EMAIL_HOST` | SMTP provider | Send email notifications | Emails are skipped and logged to console |
| `EMAIL_PORT` | SMTP provider | SMTP port | Emails are skipped and logged to console |
| `EMAIL_SECURE` | SMTP provider | Use TLS | Emails are skipped and logged to console |
| `EMAIL_USER` | SMTP provider | SMTP username | Emails are skipped and logged to console |
| `EMAIL_PASS` | SMTP provider | SMTP password / app password | Emails are skipped and logged to console |
| `EMAIL_FROM` | SMTP provider | "From" address on emails | Emails are skipped and logged to console |
| `TWILIO_ACCOUNT_SID` | [Twilio](https://twilio.com) | Send SMS notifications | SMS skipped and logged to console |
| `TWILIO_AUTH_TOKEN` | [Twilio](https://twilio.com) | Twilio authentication | SMS skipped and logged to console |
| `TWILIO_PHONE_NUMBER` | [Twilio](https://twilio.com) | Sender phone number | SMS skipped and logged to console |

---

## 🗄️ Viewing the Database

TravelBuddy uses **MongoDB**. Here are several ways to view and manage your data:

### Option 1 — MongoDB Compass (Recommended GUI)
1. Download and install [MongoDB Compass](https://www.mongodb.com/products/compass) (free).
2. Open Compass and enter your connection string (the same `MONGO_URI` from your `.env` file):
   ```
   mongodb://localhost:27017/travelbuddy
   ```
3. Click **Connect**. You will see the `travelbuddy` database with collections such as `users`, `destinations`, `itineraries`, `bookings`, `reviews`, `blogs`, and `userpreferences`.

### Option 2 — `mongosh` (Mongo Shell)
```bash
# Connect to the database
mongosh "mongodb://localhost:27017/travelbuddy"

# List all collections
show collections

# View all destinations
db.destinations.find().pretty()

# View all users (passwords are hashed)
db.users.find().pretty()

# Count documents in a collection
db.bookings.countDocuments()
```

### Option 3 — MongoDB Atlas (Cloud)
If you are using [MongoDB Atlas](https://www.mongodb.com/atlas) instead of a local database:
1. Log in to your Atlas dashboard at https://cloud.mongodb.com.
2. Navigate to **Database → Browse Collections** to view your data in the browser.
3. Use the Atlas connection string in your `.env` file:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/travelbuddy
   ```

---

## 🎨 Design Features

- **Parallax hero sections** with CSS3 background-attachment: fixed
- **Gradient backgrounds** using CSS3 linear-gradient
- **CSS custom properties** for consistent theming
- **Keyframe animations** for page entrance and loading states
- **Bootstrap 5 components**: Carousel, Cards, Tabs, Modals, Grid
- **jQuery AJAX** for debounced live destination search
- **Fully responsive** — mobile-first design approach
- **Font Awesome 6** icon system throughout

---

## 🗃️ MongoDB Models

### User
Fields: `name`, `email`, `password` (hashed with bcrypt), `avatar`, `role`, `createdAt`

### Destination
Fields: `name`, `country`, `description`, `images[]`, `coordinates`, `popularActivities[]`, `averageCost`, `bestTimeToVisit`, `rating`, `category`

### Itinerary
Fields: `user` (ref), `title`, `destination` (ref), `startDate`, `endDate`, `days[{dayNumber, activities[], notes}]`, `budget`, `status`

### Booking
Fields: `user` (ref), `type` (flight/hotel), `details{}`, `status`, `totalCost`, `confirmationCode`

### Review
Fields: `user` (ref), `destination` (ref), `rating`, `title`, `content`, `images[]`, `createdAt`

### Blog
Fields: `author` (ref), `title`, `content`, `coverImage`, `destination` (ref), `tags[]`, `likes`, `comments[{user, text, date}]`

### UserPreference
Fields: `user` (ref), `favoriteDestinations[]`, `travelStyle`, `budgetRange`, `preferredActivities[]`

---

## 🤝 Contributing

1. **Fork** the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a **Pull Request**

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Demo Credentials

After running the seed script, you can log in with the admin credentials configured via environment variables (`ADMIN_EMAIL` and `ADMIN_PASSWORD` in your `.env` file).

---

<p align="center">Made with ❤️ using the MERN Stack</p>

