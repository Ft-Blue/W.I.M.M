import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Transactions from '../views/Transactions.vue'
import Categories from '../views/Categories.vue'

Vue.prototype.api = "http://localhost:3000"
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/transactions',
        name: 'Transactions',
        component: Transactions
    },
    {
        path: '/categories',
        name: 'Categories',
        component: Categories
    }
]

const router = new VueRouter({
    routes
})

export default router