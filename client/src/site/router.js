import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import SignupPage from './pages/SignupPage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import CatalogPage from './pages/CatalogPage.vue'
import AdminLayout from './components/admin/Layout.vue'
import FrontendOneColLayout from './components/frontend/layouts/OneColLayout.vue'
// import FrontendFullPageLayout from './components/frontend/layouts/FullPageLayout.vue'
import AdminDashboard from './components/admin/dashboard/Dashboard.vue'
import AdminUsersList from './components/admin/users/UsersListView.vue'
import AdminUserView from './components/admin/users/UserDetails.vue'
import AdminCoursesList from './components/admin/courses/CoursesListView.vue'
import AdminMessagesList from './components/admin/messages/MessagesListView.vue'
import CourseDetailsView from './components/frontend/CourseDetailsView.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: FrontendOneColLayout,
      children: [
        { path: '', name: 'home', component: HomePage },
        { path: 'browse', name: 'catalog', component: CatalogPage },
        { path: 'courses/:slug', name: 'course-details', component: CourseDetailsView }
      ]
    },
    {
      path: '/auth',
      component: FrontendOneColLayout,
      children: [
        {
          path: 'login',
          component: LoginPage,
          name: 'login',
          meta: { requiresAuth: false }
        },
        {
          path: 'signup',
          component: SignupPage,
          name: 'signup',
          meta: { requiresAuth: false }
        }
      ]
    },
    {
      path: '/admin',
      component: AdminLayout,
      name: 'admin',
      meta: { adminOnly: true },
      children: [
        { path: 'dashboard', name: 'admin-dashboard', component: AdminDashboard },
        { path: 'users', name: 'admin-users', component: AdminUsersList },
        { path: 'users/:id', name: 'admin-user-view', component: AdminUserView },
        { path: 'courses', name: 'admin-courses', component: AdminCoursesList },
        { path: 'messages', name: 'admin-messages', component: AdminMessagesList }
      ]
    },
    {
      path: '*',
      component: FrontendOneColLayout,
      children: [
        { path: '', name: 'page-404', component: NotFoundPage }
      ]
    }
  ]
})

var MyUser = { admin: true }

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.adminOnly)) {
    if (!MyUser.admin) {
      next({
        path: '/'
        // query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
