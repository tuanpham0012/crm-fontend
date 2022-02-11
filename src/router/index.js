import {createRouter, createWebHistory} from 'vue-router'

import Page404 from '../views/errors/404Page.vue';

import Login from '../views/Login.vue';

import Staffs from '../views/Staffs/Staffs.vue';

import Home from '../views/Home.vue';

import Departments from '../views/departments/Departments.vue';

import Customers from '../views/customers/Customers.vue';
import CustomerDetail from '../views/customers/CustomerDetail.vue';
import CustomerUpdate from '../views/customers/CustomerUpdate.vue';

import store from '../stores/store';

import {user} from '../config';

import axios from 'redaxios';

const routes = [
    { 
        path: '/Not_found',
        name: 'error_404',
        component: Page404,
    },
    { 
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        component: Home,
        name: 'home',
        meta: { requiresAuth: true }
    },
    {
        path: '/staff',
        component: Staffs,
        name: 'staffs',
        meta: { requiresAuth: true }
    },
    {
        path: '/departments',
        name: 'departments',
        component: Departments,
        meta: { requiresAuth: true }
    },
    {
        path: '/customers',
        component: Customers,
        name: 'customers',
        meta: { requiresAuth: true },
    },
    {
        path: '/customers/detail/:id',
        name: 'customer_detail',
        component: CustomerDetail,
        meta: { requiresAuth: true },
    },
    {
        path: '/customers/update/:id',
        name: 'customer_update',
        component: CustomerUpdate,
        meta: { requiresAuth: true },
    }
  ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach( (to, from, next) =>{
    if(to.name !== 'login' && to.matched.some((record) => record.meta.requiresAuth)){
        if(!localStorage.getItem('token')){
            next({
                name: 'login'
            });
        }else{
            axios.get(user.USER_INFO,
                { headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'),}
            }).then(res =>{
                next();
            }).catch(err =>{
                localStorage.removeItem('token');
                next({ name: 'login'});
            })
        }
    }else if(to.name == 'login'){
        if(localStorage.getItem('token')){
            next({
                name: from.name,
            });
        }else{
            next();
        }
    }else{
        next();
    }
})

export default router;
