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
DOMAIN_MAIN=techzero.com
DOMAIN_APP=app.techzero.com
DOMAIN_SESSION=.techzero.com
DOMAIN_EMAIL=info@techzero.com
```

> **Note:** The app domain uses the `app.` prefix. For production, you can use any domain with the `app.` prefix (e.g., `app.yourdomain.com`).

### Domain Architecture

- **Main Domain** (`DOMAIN_MAIN`):
    - Public-facing e-commerce website
    - Used by customers for browsing products, shopping cart, and placing orders
    - Example: `techzero.test` (local) or `techzero.com` (production)

- **App Domain** (`DOMAIN_APP`):
    - Admin and supplier dashboard
    - Management system for platform administration
    - Example: `app.techzero.test` (local) or `app.techzero.com` (production)

### Role-Based Access

The app domain (`DOMAIN_APP`) serves both admins and suppliers with role-based data filtering:

- **Admins**: See all data across the platform (all products, orders, users, and total revenue)
- **Suppliers**: See only their own data (their products, orders containing their products, customers who ordered from them, and revenue from their products)
- **Customers**: Automatically redirected to the main domain when accessing the app domain

### Local Setup

Configure your local domains with Laravel Valet:

```bash
valet link techzero
```

Then access:

- `techzero.test` - Website (for customers)
- `app.techzero.test` - Dashboard (for admins and suppliers)

## 👤 Author

**Furqan Freed**

- GitHub: [@furqanfreed](https://github.com/furqanfreed)
- Repository: [techzero](https://github.com/furqanfreed/techzero)

## 🙏 Acknowledgments

- Built with [Laravel](https://laravel.com)
- UI components from [Radix UI](https://www.radix-ui.com)
- Icons from [Lucide](https://lucide.dev)
