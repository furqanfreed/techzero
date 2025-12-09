# TechZero

e-commerce sleak setup with Laravel and React, featuring product marketplace with shopping cart, order management, and user authentication.

## 🚀 Features

- **Product Catalog**: Browse and search technology products with categories
- **Shopping Cart**: Add products to cart and manage quantities
- **Order Management**: Place orders, view order history, and track order details
- **User Authentication**: Secure authentication
- **Dashboard**: Admin dashboard for managing the platform
- **Responsive Design**: Modern UI
- **Multi-domain Architecture**: Separate landing and application domains - customers on main domain, admins and suppliers on app domain

## 🛠️ Tech Stack

- **Laravel 12**: PHP framework
- **React 19**: UI library
- **Tailwind CSS 4**: Utility-first CSS framework
- **Vite**: Build tool and dev server

## 📋 Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 22+ and npm
- MySQL/PostgreSQL database
- Git

## 🔧 Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/furqanfreed/techzero.git
    cd techzero
    ```

2. **Install PHP dependencies**

    ```bash
    composer install
    ```

3. **Install Node dependencies**

    ```bash
    npm install
    ```

4. **Environment setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. **Configure database**
   Update your `.env` file with database credentials:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=techzero
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```

6. **Run migrations**

    ```bash
    php artisan migrate
    ```

7. **Build assets**

    ```bash
    npm run build
    ```

8. **Start development server**

    ```bash
    composer run dev
    ```

    Or run separately:

    ```bash
    php artisan serve
    npm run dev
    ```

## 🌐 Domain Configuration

The application uses a **two-domain architecture**:

1. **Main Domain** - Public website for customers
2. **App Domain** - Management dashboard for admins and suppliers

### Environment Variables

Add these to your `.env` file:

**For Local Development:**

```env
DOMAIN_MAIN=techzero.test
DOMAIN_APP=app.techzero.test
DOMAIN_SESSION=.techzero.test
DOMAIN_EMAIL=info@techzero.test
```

**For Production:**

```env
DOMAIN_MAIN=techzero.store
DOMAIN_APP=app.techzero.store
DOMAIN_SESSION=.techzero.store
DOMAIN_EMAIL=info@techzero.store
```

> **Note:** The app domain uses the `app.` prefix. For production, you can use any domain with the `app.` prefix (e.g., `app.yourdomain.com`).

### Domain Architecture

- **Main Domain** (`DOMAIN_MAIN`):
    - Public-facing e-commerce website
    - Used by customers for browsing products, shopping cart, and placing orders
    - Example: `techzero.test` (local) or `techzero.store` (production)

- **App Domain** (`DOMAIN_APP`):
    - Admin and supplier dashboard
    - Management system for platform administration
    - Example: `app.techzero.test` (local) or `app.techzero.store` (production)

### Role-Based Access

The app domain (`DOMAIN_APP`) serves both admins and suppliers with role-based data filtering:

- **Admins**: See all data across the platform (all products, orders, users, and total revenue)
- **Suppliers**: See only their own data (their products, orders containing their products, customers who ordered from them, and revenue from their products)
- **Customers**: Automatically redirected to the main domain when accessing the app domain

### Local Setup

Configure your local domains with Laravel Valet:

```bash
valet link techzero
valet secure techzero
valet link app.techzero
valet secure app.techzero
```

Then access:

- `techzero.test` - Website (for customers)
- `app.techzero.test` - Dashboard (for admins and suppliers)

## 🚪 How to Access the App

After completing the installation and running the database seeders, here's how to access different parts of the application:

### Accessing the Admin Panel

Navigate to the app domain (dashboard) to access the admin panel:

- **Local:** `https://app.techzero.test`
- **Production:** `https://app.techzero.store`

**Admin Credentials:**

- **Email:** `admin@techzero.store`
- **Password:** `techzero#`

The admin panel provides full access to all platform data including:

- All products across all suppliers
- All orders and order details
- All customers and user management
- Complete revenue statistics and analytics

### Accessing the Supplier Dashboard

Suppliers also access the dashboard through the app domain:

- **Local:** `https://app.techzero.test`
- **Production:** `https://app.techzero.store`

**Supplier Credentials:**

**Supplier 1:**

- **Email:** `supplier1@techzero.store`
- **Password:** `techzero#`

**Supplier 2:**

- **Email:** `supplier2@techzero.store`
- **Password:** `techzero#`

Suppliers have access to:

- Their own products and inventory
- Orders containing their products
- Customers who have purchased from them
- Revenue from their products only

### Accessing the Customer Website

Navigate to the main domain to access the public e-commerce website:

- **Local:** `https://techzero.test`
- **Production:** `https://techzero.store`

**For Customers:**

The database seeders create **20 existing customers** who have already made purchases. You can:

1. **Browse Products:** View the product catalog with items from both suppliers
2. **Add to Cart:** Add products to your shopping cart
3. **Checkout:** Complete purchases and place orders
4. **Sign In:** Use the "Sign In" button in the top right corner to login with existing customer credentials
5. **Register:** Click "Sign In" and then register a new account if you want to create your own customer account

> **Note:** All seeded customers use the password `techzero#` for testing. You can find customer emails in the `CustomerSeeder.php` file or check the database after seeding.

## 🔐 Test Credentials Summary

Quick reference for all test accounts created by the seeders:

| Role       | Email                      | Password    | Access URL                                                      |
| ---------- | -------------------------- | ----------- | --------------------------------------------------------------- |
| Admin      | `admin@techzero.store`     | `techzero#` | `app.techzero.test` (local) / `app.techzero.store` (production) |
| Supplier 1 | `supplier1@techzero.store` | `techzero#` | `app.techzero.test` (local) / `app.techzero.store` (production) |
| Supplier 2 | `supplier2@techzero.store` | `techzero#` | `app.techzero.test` (local) / `app.techzero.store` (production) |
| Customers  | Register Yourself          | `N/A`       | `techzero.test` (local) / `techzero.store` (production)         |

> **Note:** All accounts are created automatically when you run `php artisan db:seed`. The seeders also create 20 customers with 5 orders each (100 total orders) for testing purposes.

## Author

**Furqan Freed**

- GitHub: [@furqanfreed](https://github.com/furqanfreed)
- Repository: [techzero](https://github.com/furqanfreed/techzero)

## Acknowledgments

- Built with [Laravel](https://laravel.com)
- UI components from [Radix UI](https://www.radix-ui.com)
- Icons from [Lucide](https://lucide.dev)
