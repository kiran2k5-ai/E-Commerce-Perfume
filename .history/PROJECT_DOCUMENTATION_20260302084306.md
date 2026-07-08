# Perfume E-Commerce Platform - Project Documentation

## 📋 Project Overview

A full-stack e-commerce platform for perfumes with advanced features including AI-powered chatbot recommendations, personality quiz, JWT authentication, payment integration, and comprehensive user management.

**Live Application**: http://localhost:5173/  
**Backend API**: http://localhost:5000/

---

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library with hooks
- **Vite 7.2.4** - Fast build tool and dev server
- **React Router DOM 7.13.0** - Client-side routing
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Modern icon library
- **React Multi Carousel** - Product carousel component

### Backend
- **Node.js & Express 5.2.1** - Server framework
- **MongoDB Atlas** - Cloud database
- **Mongoose 9.1.6** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcryptjs** - Password hashing
- **Razorpay 2.9.6** - Payment gateway integration
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### State Management
- **React Context API** - Global state (Auth, Cart)
- **localStorage** - Persistent cart and user data

---

## 💡 Key Features Implemented

### 1. Authentication System (JWT-based)
- ✅ User registration with email validation
- ✅ Secure login with password hashing (bcrypt, 12 rounds)
- ✅ JWT token generation (30-day expiry)
- ✅ Protected routes with middleware
- ✅ Role-based access control (user/admin)
- ✅ User profile management
- ✅ Auto-login after registration

### 2. Product Management
- ✅ Product browsing with filtering
- ✅ Multi-category support (Men, Women, Unisex)
- ✅ Product details page
- ✅ Related products recommendation
- ✅ Product search functionality

### 3. Shopping Features
- ✅ **Wishlist** (Heart icon) - Save items for later
- ✅ **Favorites** (Star icon) - Mark preferred items
- ✅ Multi-item cart with quantity controls
- ✅ Persistent cart using localStorage
- ✅ Real-time total calculation
- ✅ Add to cart with automatic redirect

### 4. Review & Rating System
- ✅ 5-star rating system
- ✅ Text reviews with comments
- ✅ Average rating calculation
- ✅ Review storage in MongoDB
- ✅ Real-time review display on product pages
- ✅ User authentication required for reviews

### 5. Order Management
- ✅ Order creation with shipping details
- ✅ Order history in user profile
- ✅ Order status tracking (pending, processing, shipped, delivered, cancelled)
- ✅ Admin order management dashboard
- ✅ Payment integration with Razorpay

### 6. Payment Integration
- ✅ Razorpay test mode integration
- ✅ Secure payment flow
- ✅ Order confirmation after successful payment
- ✅ Cart clearing post-payment

### 7. AI Chatbot (Personalized Recommendations)
- ✅ Conversational interface
- ✅ 4-step questionnaire (scent family, occasion, gender, budget)
- ✅ Smart product filtering
- ✅ Flexible matching (shows alternatives if exact match not found)
- ✅ Product card display with prices
- ✅ Floating chat button (bottom-right)

### 8. Personality Quiz
- ✅ 4-step interactive quiz
- ✅ Questions about occasion, personality, notes, season
- ✅ Scent profile calculation
- ✅ Progress indicator
- ✅ Result-based product recommendations

### 9. Admin Dashboard
- ✅ Product inventory view
- ✅ Order management (view all orders, update status)
- ✅ Newsletter subscriber management
- ✅ Tabbed interface (Products/Orders/Subscribers)
- ✅ Admin-only access control

### 10. Newsletter System
- ✅ Email subscription
- ✅ Unique email validation
- ✅ Subscribe form on homepage
- ✅ Admin view of all subscribers

### 11. Responsive Design
- ✅ Mobile-friendly navbar with hamburger menu
- ✅ Grid layouts for different screen sizes
- ✅ Responsive forms and buttons
- ✅ Touch-friendly UI elements

---

## 🔥 Major Challenges & Solutions

### Challenge 1: Registration Error - "next is not a function"
**Problem**: Registration was failing due to Mongoose middleware error
```
TypeError: next is not a function
```

**Root Cause**: Using callback-style `next()` in async pre-save hook (Mongoose 9.x doesn't support it)

**Original Code** (src/backend/model/User.js):
```javascript
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})
```

**Solution**:
```javascript
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password, 12)
})
```

**Learning**: Modern Mongoose with async functions doesn't require `next()` callback.

---

### Challenge 2: Chatbot Not Showing Product Recommendations
**Problem**: Chatbot returned "No products found" even when products existed in database

**Root Causes**:
1. Budget filtering was too strict (exact range matching)
2. Gender/category case-sensitivity issues
3. No fallback when filters don't match

**Solution** (src/components/Chatbot.jsx):
```javascript
// More flexible gender filtering
if (prefs.gender && prefs.gender !== 'Unisex' && prefs.gender !== 'Not sure') {
    filtered = filtered.filter(p => 
        p.category?.toLowerCase() === prefs.gender.toLowerCase() || 
        p.category === 'Unisex'
    )
}

// Flexible budget with proper number conversion
const [min, max] = budgetRanges[prefs.budget] || [0, Infinity]
filtered = filtered.filter(p => {
    const productPrice = Number(p.price)
    return productPrice >= min && productPrice < max
})

// Fallback to show products even if filters don't match
const recommendations = filtered.length > 0 ? filtered.slice(0, 3) : products.slice(0, 3)
```

**Learning**: Always provide fallback options for better UX; handle case-sensitivity in comparisons.

---

### Challenge 3: Hardcoded API URLs Throughout Codebase
**Problem**: 20+ files using production URL `https://e-commerce-perfume-backend.onrender.com`

**Issues**:
- Can't run locally without editing multiple files
- Deployment environment switching was manual
- Error-prone during development

**Solution**:
1. Created centralized config (src/config/api.js):
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
export default API_URL
```

2. Added .env file:
```
VITE_API_URL=http://localhost:5000
```

3. Updated all 20+ files to import and use `API_URL`:
```javascript
import API_URL from '../config/api'
const { data } = await axios.get(`${API_URL}/api/product`)
```

**Files Updated**: Shopping.jsx, Home.jsx, Wishlist.jsx, Profile.jsx, ReviewForm.jsx, ReviewList.jsx, Chatbot.jsx, Admin.jsx, Newsletter.jsx, Cart.jsx, Checkout.jsx, Contact.jsx, AuthContext.jsx, Gridbox.jsx

**Learning**: Centralize configuration early to avoid technical debt.

---

### Challenge 4: React Router Warning - "navigate() in useEffect"
**Problem**: Console warnings about calling `navigate()` during component render

**Warning Message**:
```
You should call navigate() in a React.useEffect(), not when your component is first rendered.
```

**Root Cause**: Missing `navigate` in useEffect dependency array

**Solution** (Applied to Favorites.jsx, Wishlist.jsx, Admin.jsx):
```javascript
// Before
useEffect(() => {
    if (!user) {
        navigate('/login')
        return
    }
    fetchData()
}, [user])

// After
useEffect(() => {
    if (!user) {
        navigate('/login')
        return
    }
    fetchData()
}, [user, navigate])
```

**Learning**: Always include all dependencies in useEffect to avoid stale closures and warnings.

---

### Challenge 5: Checkout Page Not Working
**Problem**: Payment integration failed with module import error

**Root Cause**: Missing API_URL import in Checkout.jsx

**Solution**:
```javascript
import API_URL from '../config/api'

const { data } = await axios.post(`${API_URL}/api/payment/create-order`, {
    amount: product.totalPrice || product.price
})
```

**Learning**: Consistent import patterns prevent runtime errors.

---

### Challenge 6: Reviews Not Saving/Displaying
**Problem**: Reviews submitted but not appearing on product details page

**Root Causes**:
1. Missing API_URL import in Cart.jsx
2. ReviewList not refreshing after new review submission

**Solution** (src/pages/Cart.jsx):
```javascript
const [reviewKey, setReviewKey] = useState(0)

<ReviewForm 
    productId={singleProduct.id} 
    onReviewAdded={() => setReviewKey(prev => prev + 1)}
/>
<ReviewList key={reviewKey} productId={singleProduct.id} />
```

**Learning**: Use key prop to force component re-render when data changes.

---

### Challenge 7: Navbar/Footer on Login/Register Pages
**Problem**: Auth pages were cluttered with navbar and footer

**Solution** (src/App.jsx):
```javascript
function AppContent() {
    const location = useLocation()
    const hideNavbarRoutes = ['/login', '/register']
    const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname)

    return (
        <>
            {shouldShowNavbar && <Navbar />}
            <Routes>...</Routes>
            {shouldShowNavbar && <Chatbot />}
        </>
    )
}
```

**Added**: "Back to Home" links on auth pages for navigation

**Learning**: Conditional rendering improves UX for specific pages.

---

### Challenge 8: Favorites vs Wishlist Confusion
**Problem**: Users couldn't differentiate between wishlist and favorites

**Solution**: Created distinct visual themes
- **Wishlist**: ❤️ Heart icon (red/pink theme)
- **Favorites**: ⭐ Star icon (yellow/gold theme)
- Separate backend routes, controllers, and database fields
- Different page designs with themed decorations

**Implementation**:
```javascript
// User Model
wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]
favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]

// Gridbox Component - Two separate buttons
<Heart className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
<Star className={favorited ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'} />
```

**Learning**: Visual differentiation is key for similar features.

---

### Challenge 9: Add to Cart Not Redirecting
**Problem**: Users added items but didn't see immediate feedback

**Solution** (src/components/Gridbox.jsx):
```javascript
const handleAddToCart = () => {
    const numericPrice = typeof price === 'string' 
        ? Number(price.replace('₹', ''))
        : price

    addToCart({ id, image, name, description, price: numericPrice, category })
    navigate('/cart') // Auto-redirect to cart page
}
```

**Learning**: Immediate navigation provides better user feedback.

---

### Challenge 10: Server Startup Typo
**Problem**: Backend couldn't start - "Cannot find module sever.js"

**Root Cause**: Typo in package.json
```json
"scripts": {
    "start": "node sever.js"  // Wrong spelling
}
```

**Solution**:
```json
"scripts": {
    "start": "node server.js"  // Correct spelling
}
```

**Learning**: Typos in configuration files can cause frustrating debugging sessions.

---

## 📁 Project Structure

```
perfume-ecommerce/
├── src/
│   ├── backend/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection
│   │   ├── controller/
│   │   │   ├── authController.js     # Register, login, profile
│   │   │   ├── reviewController.js   # Create, get, delete reviews
│   │   │   ├── wishlistController.js # Wishlist CRUD
│   │   │   ├── favoritesController.js# Favorites CRUD
│   │   │   ├── orderController.js    # Order management
│   │   │   ├── productController.js  # Product operations
│   │   │   ├── paymentController.js  # Razorpay integration
│   │   │   ├── newsletterController.js
│   │   │   └── contactController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js     # JWT verification, admin check
│   │   ├── model/
│   │   │   ├── User.js               # User schema with bcrypt
│   │   │   ├── Review.js             # Review schema
│   │   │   ├── Order.js              # Order schema
│   │   │   ├── Newsletter.js
│   │   │   └── products.js           # Product schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── reviewRoutes.js
│   │   │   ├── wishlistRoutes.js
│   │   │   ├── favoritesRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── paymentRoutes.js
│   │   │   ├── newsletterRoutes.js
│   │   │   └── contactRouter.js
│   │   ├── .env                      # Environment variables
│   │   ├── package.json
│   │   └── server.js                 # Express server setup
│   │
│   ├── components/
│   │   ├── Navbar.jsx                # Responsive nav with auth
│   │   ├── Footer.jsx
│   │   ├── Gridbox.jsx               # Product card component
│   │   ├── Chatbot.jsx               # AI recommendation bot
│   │   ├── Newsletter.jsx
│   │   ├── ReviewForm.jsx            # 5-star rating form
│   │   └── ReviewList.jsx            # Review display
│   │
│   ├── pages/
│   │   ├── Home.jsx                  # Landing page
│   │   ├── Shopping.jsx              # Product listing with filters
│   │   ├── Cart.jsx                  # Shopping cart + product details
│   │   ├── Checkout.jsx              # Order + payment
│   │   ├── Login.jsx                 # Login form
│   │   ├── Register.jsx              # Registration form
│   │   ├── Profile.jsx               # User profile + order history
│   │   ├── Wishlist.jsx              # Heart icon items
│   │   ├── Favorites.jsx             # Star icon items
│   │   ├── PerfumeQuiz.jsx           # Personality quiz
│   │   ├── Admin.jsx                 # Admin dashboard
│   │   ├── About.jsx
│   │   ├── Blog.jsx
│   │   └── Contact.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx           # User authentication state
│   │   └── CartContext.jsx           # Shopping cart state
│   │
│   ├── config/
│   │   └── api.js                    # Centralized API URL
│   │
│   ├── images/                       # Static assets
│   ├── App.jsx                       # Main app with routing
│   ├── main.jsx                      # React entry point
│   └── index.css                     # Tailwind imports
│
├── .env                              # Frontend env variables
├── package.json
├── vite.config.js
├── tailwind.config.js
├── eslint.config.js
└── README.md
```

---

## 🔐 Authentication Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. Register/Login
       ▼
┌─────────────────────────────┐
│  AuthContext.jsx (Frontend) │
│  - Captures form data       │
│  - Sends to API_URL         │
└──────┬──────────────────────┘
       │ 2. POST /api/auth/register
       ▼
┌─────────────────────────────┐
│  authController.js (Backend)│
│  - Validates input          │
│  - Checks duplicate email   │
└──────┬──────────────────────┘
       │ 3. Create user
       ▼
┌─────────────────────────────┐
│  User.js Model (Mongoose)   │
│  - Pre-save hook triggered  │
│  - Hashes password (bcrypt) │
│  - Saves to MongoDB         │
└──────┬──────────────────────┘
       │ 4. User created
       ▼
┌─────────────────────────────┐
│  authController.js          │
│  - Generates JWT token      │
│  - Returns user + token     │
└──────┬──────────────────────┘
       │ 5. Response
       ▼
┌─────────────────────────────┐
│  AuthContext.jsx            │
│  - Saves user + token       │
│  - Stores in localStorage   │
│  - Updates global state     │
└──────┬──────────────────────┘
       │ 6. Redirect to home
       ▼
┌─────────────┐
│  Dashboard  │
└─────────────┘
```

---

## 🛒 Cart & Order Flow

```
User browses → Clicks "Add to Cart" → Cart Context updates → localStorage persists
                                                               ↓
User views cart → Modifies quantities → Updates total → Proceeds to checkout
                                                               ↓
Checkout form → Shipping details → Razorpay payment → Payment success
                                                               ↓
Order created in DB → Cart cleared → User redirected to profile → Order history visible
```

---

## 💾 Database Schema

### User Collection
```javascript
{
    _id: ObjectId,
    name: String,
    email: String (unique, lowercase),
    password: String (bcrypt hashed),
    role: String (enum: 'user', 'admin'),
    wishlist: [ObjectId] (ref: 'products'),
    favorites: [ObjectId] (ref: 'products'),
    scentProfile: String (enum: ['floral', 'woody', 'citrus', 'oriental', 'fresh']),
    createdAt: Date
}
```

### Review Collection
```javascript
{
    _id: ObjectId,
    product: ObjectId (ref: 'products'),
    user: ObjectId (ref: 'User'),
    userName: String,
    rating: Number (1-5),
    comment: String,
    createdAt: Date
}
```

### Order Collection
```javascript
{
    _id: ObjectId,
    user: ObjectId (ref: 'User'),
    items: [{
        product: ObjectId,
        name: String,
        image: String,
        price: Number,
        quantity: Number
    }],
    totalAmount: Number,
    paymentId: String,
    status: String (enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
    shippingAddress: {
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    createdAt: Date
}
```

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Razorpay test account

### Backend Setup
```bash
cd src/backend
npm install
# Create .env file with:
# MONGODB=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# RAZORPAY_KEY_ID=your_razorpay_key
# RAZORPAY_KEY_SECRET=your_razorpay_secret
# EMAIL_USER=your_email
# EMAIL_PASS=your_email_password

npm start
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
cd ../..  # Back to root
npm install
# Create .env file with:
# VITE_API_URL=http://localhost:5000

npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📊 API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile (protected)
- PUT `/api/auth/profile` - Update profile (protected)

### Products
- GET `/api/product` - Get all products
- GET `/api/product/:id` - Get single product
- POST `/api/product/related` - Get related products

### Reviews
- POST `/api/reviews` - Create review (protected)
- GET `/api/reviews/product/:productId` - Get product reviews
- DELETE `/api/reviews/:id` - Delete review (protected)

### Wishlist
- POST `/api/wishlist` - Add to wishlist (protected)
- DELETE `/api/wishlist/:productId` - Remove from wishlist (protected)
- GET `/api/wishlist` - Get user wishlist (protected)

### Favorites
- POST `/api/favorites` - Add to favorites (protected)
- DELETE `/api/favorites/:productId` - Remove from favorites (protected)
- GET `/api/favorites` - Get user favorites (protected)

### Orders
- POST `/api/orders` - Create order (protected)
- GET `/api/orders/myorders` - Get user orders (protected)
- GET `/api/orders/all` - Get all orders (admin only)
- PUT `/api/orders/:id/status` - Update order status (admin only)

### Payment
- POST `/api/payment/create-order` - Create Razorpay order

### Newsletter
- POST `/api/newsletter/subscribe` - Subscribe to newsletter
- GET `/api/newsletter/subscribers` - Get all subscribers (admin only)

---

## 🎯 Key Learnings & Best Practices

1. **Error Handling**: Always add try-catch blocks and meaningful error messages
2. **Logging**: Console logs help debug issues quickly (removed before production)
3. **Environment Variables**: Never hardcode sensitive data or URLs
4. **Middleware**: JWT middleware simplifies route protection
5. **Schema Validation**: Mongoose schemas prevent invalid data
6. **Password Security**: Always hash passwords, never store plain text
7. **React Keys**: Use unique keys for dynamic lists to prevent bugs
8. **Context API**: Great for small-medium apps (Auth, Cart state)
9. **Component Reusability**: Gridbox used across multiple pages
10. **Centralized Configuration**: api.js prevents URL management headaches

---

## 🏆 Achievements

- ✅ Built full-stack e-commerce platform from scratch
- ✅ Implemented secure authentication with JWT
- ✅ Integrated payment gateway (Razorpay)
- ✅ Created AI chatbot for product recommendations
- ✅ Developed dual system (Wishlist + Favorites)
- ✅ Implemented review & rating system with real-time updates
- ✅ Built responsive UI with Tailwind CSS
- ✅ Managed complex state with Context API
- ✅ Created admin dashboard for order management
- ✅ Debugged and resolved 10+ major issues

---

## 🔮 Future Enhancements

1. **Image Upload**: Allow users to upload profile pictures
2. **Advanced Filtering**: Price range slider, multiple category selection
3. **Search**: Product search with autocomplete
4. **Email Notifications**: Order confirmation emails
5. **Social Login**: Google/Facebook authentication
6. **Product Comparison**: Compare up to 3 products
7. **Wishlist Sharing**: Share wishlist via link
8. **Inventory Management**: Stock tracking and alerts
9. **Analytics Dashboard**: Sales charts for admin
10. **Multi-language Support**: i18n implementation

---

## 📝 Presentation Tips

### When Explaining:

1. **Start with Demo**: Show live application first
2. **Highlight Unique Features**: AI chatbot, dual wishlist/favorites system
3. **Discuss Architecture**: Frontend-Backend-Database flow
4. **Show Code Snippets**: Key implementations (JWT middleware, bcrypt hashing)
5. **Explain Challenges**: Share the 10 struggles and solutions
6. **Technical Decisions**: Why MongoDB? Why Context API vs Redux?
7. **Security**: Password hashing, JWT tokens, protected routes
8. **User Experience**: Responsive design, instant feedback, error handling
9. **Testing**: Manual testing approach, API testing with curl
10. **Deployment Ready**: Environment variable setup, production considerations

### Questions You Might Face:

**Q: Why did you use Context API instead of Redux?**
A: For this medium-sized app with 2 global states (Auth, Cart), Context API is simpler and requires less boilerplate. Redux would be overkill and add unnecessary complexity.

**Q: How do you handle security?**
A: Passwords are hashed with bcrypt (12 rounds), JWT tokens for authentication, CORS enabled, protected routes with middleware, role-based access control for admin features.

**Q: What was the most challenging part?**
A: The "next is not a function" error during registration took time to debug because it was related to Mongoose version compatibility. Also, centralizing API URLs across 20+ files taught me the importance of planning configuration early.

**Q: How would you scale this application?**
A: Add caching (Redis), implement pagination for products, optimize database queries with indexes, use CDN for images, implement lazy loading for routes, add server-side rendering with Next.js.

**Q: How did you test the application?**
A: Manual testing through browser, API testing with curl, console logging for debugging, tested edge cases (empty cart, duplicate emails, invalid tokens), cross-browser testing.

---

## 📞 Contact & Demo

- **Live Demo**: http://localhost:5173/
- **API Endpoints**: http://localhost:5000/
- **Test Account**: 
  - User: testuser@example.com / 123456
  - Admin: (create via MongoDB and set role='admin')

---

**Built with ❤️ using React, Node.js, MongoDB, and Tailwind CSS**
