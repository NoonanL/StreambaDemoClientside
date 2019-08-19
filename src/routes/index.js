import React from 'react';

import async from '../components/Async';

import {
  Sliders,
  Users,
  Package,
  Clipboard,
  ShoppingCart,
  Truck,
  Heart,
  BarChart2,
  Archive,
  Navigation
} from 'react-feather';

import {
  Store,
} from '@material-ui/icons'

/**
 * Imports for components
 * Uses Async function to keep everything tidy, shows loading bar until ready
 */
const SignIn = async(() => import('../components/pages/SignIn'));
const Blank = async(() => import('../components/pages/Blank'));
const Home = async(() => import('../components/pages/dashboard/Dashboard'));
const Brands = async(() => import('../components/pages/Brands'));
const Customers = async(() => import('../components/pages/Customers'));
const Departments = async(() => import('../components/pages/Departments'));
const Suppliers = async(() => import('../components/pages/Suppliers'));
const Products = async(() => import('../components/Products'));
const CreateProduct = async(() => import('../components/CreateProduct'));


/**
 * Declare the routes for each page and their appropriate name, Icon, Component, etc.
 */
const authRoutes = {
  id: 'Auth',
  path: '/auth',
  icon: <Users />,
  children: [
    {
      path: '/auth/sign-in',
      name: 'Sign In',
      component: SignIn
    }
  ]
};

const dashboardsRoutes = {
  id: 'Dashboard',
  path: '/',
  header: 'Welcome!',
  icon: <Sliders />,
  component: Home,
  children: null
};

const productsRoutes = {
  id: 'Products',
  path: '/products',
  icon: <Package />,
  children: [
    {
      path: '/products',
      name: 'All',
      component: Products
    },
    {
      path: '/products/add',
      name: 'Add New',
      component: CreateProduct
    }
  ]
};

const customerRoutes = {
  id: 'Customers',
  path: '/customers',
  icon: <Users />,
  children: [
    {
      path: '/customers',
      name: 'All',
      component: Customers
    },
    {
      path: '/add',
      name: 'Add New',
      component: Blank
    }
  ]
};

const transactionRoutes = {
  id: 'Transactions',
  path: '/transactions',
  icon: <ShoppingCart />,
  children: [
    {
      path: '/transactions',
      name: 'History',
      component: Blank
    }
  ]
};

const stockRoutes = {
  id: 'Stock',
  path: '/stock',
  icon: <Clipboard />,
  children: [
    {
      path: '/stock-take',
      name: 'Stock Take',
      component: Blank
    },
    {
      path: '/purhcase-order',
      name: 'Purchase Order',
      component: Blank
    },
    {
      path: '/goods-in',
      name: 'Goods In',
      component: Blank
    },
    {
      path: '/branch-transfer',
      name: 'Branch Transfer',
      component: Blank
    }
  ]
};

const departmentsRoutes = {
  id: 'Departments',
  path: '/departments',
  icon: <Archive />,
  component: Departments,
  children: null
};

const branchRoutes = {
  id: 'Branches',
  path: '/branches',
  icon: <Navigation />,
  component: Blank,
  children: null
};

const suppliersRoutes = {
  id: 'Suppliers',
  path: '/suppliers',
  icon: <Truck />,
  component: Suppliers,
  children: null
};

const brandsRoutes = {
  id: 'Brands',
  path: '/brands',
  icon: <Store />,
  component: Brands,
  children: null
};

const staffRoutes = {
  id: 'Staff',
  path: '/staff',
  icon: <Heart />,
  component: Blank,
  children: [
    {
      path: '/staff/all',
      name: 'Staff',
      component: Blank
    },
    {
      path: '/staff/rota',
      name: 'Rota',
      component: Blank
    }
  ]
};

const reportsRoutes = {
  id: 'Reports',
  path: '/reports',
  icon: <BarChart2 />,
  component: Blank,
  children: [
    {
      path: '/reports',
      name: 'Reports',
      component: Blank
    }
  ]
};


/**
 * Exports for Routes
 */
export const auth = [authRoutes];

export const dashboard = [
  dashboardsRoutes,
  productsRoutes,
  customerRoutes,
  transactionRoutes,
  stockRoutes,
  departmentsRoutes,
  branchRoutes,
  suppliersRoutes,
  brandsRoutes,
  reportsRoutes,
  staffRoutes
];

export default [
  dashboardsRoutes,
  productsRoutes,
  customerRoutes,
  transactionRoutes,
  stockRoutes,
  departmentsRoutes,
  branchRoutes,
  suppliersRoutes,
  brandsRoutes,
  reportsRoutes,
  staffRoutes
];
