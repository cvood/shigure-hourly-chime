import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'timereader',
            component: require('@/components/timereader').default
        },
        {
            path: '/timeline',
            name: 'timeline',
            component: require('@/components/timeline').default
        },
        {
            path: '/commit',
            name: 'commit',
            component: require('@/components/addItem').default
        }
    ]
})