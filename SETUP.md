# Perfume E-Commerce - Setup Instructions

## 🎉 Features Added

### Authentication & User Management
- ✅ JWT-based authentication
- ✅ User registration and login
- ✅ Protected routes with middleware
- ✅ User profiles with order history
- ✅ Role-based access (admin/user)

### Shopping Features
- ✅ Wishlist functionality
- ✅ Enhanced multi-item cart with persistent storage
- ✅ Product reviews and ratings
- ✅ Advanced search and filters
- ✅ Related product recommendations

### AI & Personalization
- ✅ AI Chatbot for perfume selection
- ✅ Perfume personality quiz
- ✅ Scent profile preferences
- ✅ Smart product recommendations

### Order Management
- ✅ Complete order tracking system
- ✅ Order status updates
- ✅ Order history
- ✅ Shipping address management

### Marketing & Communication
- ✅ Newsletter subscription
- ✅ Email collection system

### Admin Panel
- ✅ Product management view
- ✅ Order management with status updates
- ✅ Newsletter subscriber list

## 📦 Backend Setup

### 1. Install Backend Dependencies

Navigate to the backend folder and install:

```bash
cd src/backend
npm install
```

The required dependencies are:
- bcryptjs (for password hashing)
- jsonwebtoken (for JWT authentication)
- cors
- express
- mongoose
- dotenv
- nodemailer
- razorpay

### 2. Environment Variables

Create a `.env` file in `src/backend/`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here_change_this_in_production
PORT=5000
```

### 3. Start Backend Server

```bash
cd src/backend
npm start
```

## 🎨 Frontend Setup

All frontend dependencies are already in your `package.json`. No new external libraries were added - everything uses Tailwind CSS as requested.

### Existing Dependencies Used:
- React 19.2.0
- React Router DOM
- Axios
- Lucide React (icons - already installed)
- Tailwind CSS

## 🚀 Running the Application

1. **Backend** - Start the backend server (from `src/backend`):
```bash
cd src/backend
npm install
npm start
```

Server will run on http://localhost:5000

2. **Frontend** - Start the frontend (from root):
```bash
npm run dev
```

Frontend will run on http://localhost:5173 (or 5174)

## 📝 How Authentication Works & Database Saving

### Registration Flow:
1. User fills the registration form (`/register` page - no navbar/footer for clean UX)
2. Frontend sends POST request to `http://localhost:5000/api/auth/register`
3. Backend (`authController.js`) receives the data
4. Password is hashed using bcryptjs (in User model pre-save hook)
5. New user document is created in MongoDB `users` collection
6. JWT token is generated and returned
7. User data + token saved to localStorage
8. User is redirected to home page

### Login Flow:
1. User fills login form (`/login` page)
2. Frontend sends POST request to `http://localhost:5000/api/auth/login`
3. Backend finds user by email in MongoDB
4. Password is compared with hashed password using bcrypt
5. If valid, JWT token is generated
6. User data + token returned and saved to localStorage
7. Token is used for all protected API requests (via Authorization header)

### Protected Routes:
- All requests to protected endpoints send: `Authorization: Bearer <token>`
- Backend middleware (`authMiddleware.js`) verifies the token
- If valid, user data is attached to `req.user`
- Database operations proceed with authenticated user

### What Gets Saved to Database:

**Users Collection:**
- Name, Email, Hashed Password
- Role (user/admin)
- Wishlist (array of product IDs)
- Scent profile preference
- Created date

**Orders Collection:**
- User ID reference
- Items purchased (product details, quantity, price)
- Total amount
- Payment ID
- Shipping address
- Order status
- Created date

**Reviews Collection:**
- Product ID reference
- User ID reference
- Rating (1-5 stars)
- Comment text
- Created date

**Newsletter Collection:**
- Email address
- Subscribed date

## 🔑 Default Admin Account

To create an admin user, you need to manually update a user in MongoDB:

```javascript
// In MongoDB, update a user document:
db.users.updateOne(
  { email: "admin@perfume.com" },
  { $set: { role: "admin" } }
)
```

Or register normally and manually change the role in the database.

## 📱 New Routes Added

### Public Routes:
- `/login` - User login
- `/register` - User registration
- `/quiz` - Perfume personality quiz

### Protected Routes (require login):
- `/profile` - User profile & order history
- `/wishlist` - User's saved products
- `/admin` - Admin dashboard (admin only)

## 🎯 Key Features Usage

### 1. Chatbot
- Click the floating chat icon in the bottom right
- Answer questions about preferences
- Get personalized recommendations
- Available on all pages

### 2. Wishlist
- Click the heart icon on any product (must be logged in)
- View all saved items in `/wishlist`
- Add to cart from wishlist

### 3. Cart
- Supports multiple items
- Persistent storage (localStorage)
- Quantity management
- Real-time total calculation

### 4. Reviews
- Available on product detail pages
- Requires login to submit
- Star rating + comment
- Shows average rating

### 5. Admin Panel
- Manage products (view inventory)
- Update order status
- View newsletter subscribers
- Access via `/admin` (admin role required)

### 6. Profile Quiz
- Find your scent profile
- Get personalized recommendations
- Save preferences to profile

## 🔒 Authentication Flow

1. User registers → JWT token created
2. Token stored in localStorage
3. Token sent with protected API requests
4. Backend verifies token via middleware
5. Access granted/denied based on role

## 💳 Payment Integration

Razorpay is already integrated. Orders are created after successful payment with:
- Order items
- Payment ID
- Shipping address
- Order status tracking

## 📊 Context Providers

Two new contexts manage global state:

1. **AuthContext** - User authentication state
2. **CartContext** - Shopping cart state

Both wrap the entire app in `App.jsx`.

## 🎨 Styling

All components use Tailwind CSS as requested:
- Gradient backgrounds (pink-purple theme)
- Responsive design
- Hover animations
- Clean, modern UI

**Clean Authentication Pages:**
- Login & Register pages have NO navbar/footer
- "Back to Home" link in top-left corner
- Focused, distraction-free login experience
- Chatbot also hidden on auth pages

## 🐛 Troubleshooting

### Backend won't start:
- Check MongoDB connection
- Verify .env file exists
- Install all dependencies

### Login/Register not working:
- Ensure backend is running
- Check API endpoints match
- Verify CORS is enabled

### Cart not persisting:
- Check browser localStorage
- Clear localStorage if needed

### Admin panel not accessible:
- Verify user role is "admin" in database
- Check JWT token is valid

## 📝 Notes

- No new npm packages were added to frontend (only used existing ones)
- All styling done with Tailwind CSS
- Backend requires new packages: bcryptjs, jsonwebtoken
- JWT secret should be changed in production
- MongoDB connection required

## 🎉 You're All Set!

The application now includes:
- Complete authentication system
- AI chatbot
- Wishlist & reviews
- Multi-item cart
- Order management
- Admin panel
- Newsletter system
- Perfume quiz
- And much more!

Happy coding! 🚀
