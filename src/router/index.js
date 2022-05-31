import {createRouter, createWebHistory} from 'vue-router'

import Page404 from '../views/errors/404Page.vue';

import Login from '../views/Login.vue';

import Staffs from '../views/Staffs/Staffs.vue';
import StaffDetail from '../views/Staffs/StaffDetail.vue';
import StaffUpdate from '../views/Staffs/StaffUpdate.vue';

import Home from '../views/Home.vue';

import Departments from '../views/departments/Departments.vue';
import DepartmentDetail from '../views/departments/DepartmentDetail.vue';
import MyDepartment from '../views/departments/MyDepartment.vue';

import Customers from '../views/customers/Customers.vue';
import CustomerDetail from '../views/customers/CustomerDetail.vue';
import CustomerUpdate from '../views/customers/CustomerUpdate.vue';
import MyCustomerList from '../views/customers/MyCustomerList.vue';

import Projects from '../views/projects/Projects.vue';
import ProjectDetail from '../views/projects/ProjectDetail.vue';

import AccountDetail from '../views/account/Detail.vue';
import AccountUpdate from '../views/account/Update.vue';

import Tasks from '../views/tasks/Tasks.vue';

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
        path: '/staffs',
        component: Staffs,
        name: 'staffs',
        meta: { requiresAuth: true }
    },
    {
        path: '/staffs/detail/:id',
        component: StaffDetail,
        name: 'staff-detail',
        meta: { requiresAuth: true }
    },
    {
        path: '/staffs/update/:id',
        component: StaffUpdate,
        name: 'staff-update',
        meta: { requiresAuth: true }
    },
    {
        path: '/departments',
        name: 'departments',
        component: Departments,
        meta: { requiresAuth: true }
    },
    {
        path: '/departments/detail/:id',
        name: 'department-detail',
        component: DepartmentDetail,
        meta: { requiresAuth: true }
    },
    {
        path: '/department',
        name: 'my-department',
        component: MyDepartment,
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
        name: 'customer-detail',
        component: CustomerDetail,
        meta: { requiresAuth: true },
    },
    {
        path: '/customers/update/:id',
        name: 'customer-update',
        component: CustomerUpdate,
        meta: { requiresAuth: true },
    },
    {
        path: '/account/detail',
        name: 'account-detail',
        component: AccountDetail,
        meta: { requiresAuth: true },
    },
    {
        path: '/account/update',
        name: 'account-update',
        component: AccountUpdate,
        meta: { requiresAuth: true },
    },
    {
        path: '/personal/tasks',
        name: 'tasks',
        component: Tasks,
        meta: { requiresAuth: true },
    },
    {
        path: '/personal/my_customer_list',
        name: 'my-customer',
        component: MyCustomerList,
        meta: { requiresAuth: true },
    },

    {
        path: '/projects',
        name: 'projects',
        component: Projects,
        meta: { requiresAuth: true },
    },
    {
        path: '/project/detail/:id',
        name: 'project-detail',
        component: ProjectDetail,
        meta: { requiresAuth: true },
    },
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
