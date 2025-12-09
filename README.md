# TechZero

e-commerce sleak setup with Laravel and React, featuring product marketplace with shopping cart, order management, and user authentication.

## 🚀 Features

- **Product Catalog**: Browse and search technology products with categories
- **Shopping Cart**: Add products to cart and manage quantities
- **Order Management**: Place orders, view order history, and track order details
- **User Authentication**: Secure authentication
- **Dashboard**: Admin dashboard for managing the platform
- **Responsive Design**: Modern UI
- **Multi-domain Architecture**: Separate landing and application domains for customers, suppliers and admins

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

The application uses a multi-domain setup:

- **Landing Domain** (`techzero.test`): Public-facing e-commerce site
- **App Domain** (`app.techzero.test`): Admin dashboard management system
- **Supplier Domain** (`supplier.techzero.test`): Supplier dashboard and management system

Configure your local domains with Larvel Valet

```
 techzero.test
 app.techzero.test
 supplier.techzero.test
```

## 👤 Author

**Furqan Freed**

- GitHub: [@furqanfreed](https://github.com/furqanfreed)
- Repository: [techzero](https://github.com/furqanfreed/techzero)

## 🙏 Acknowledgments

- Built with [Laravel](https://laravel.com)
- UI components from [Radix UI](https://www.radix-ui.com)
- Icons from [Lucide](https://lucide.dev)
