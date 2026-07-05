import { Suspense, lazy, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ToastContainer } from 'react-toastify'
import AOS from 'aos'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/layout/CustomCursor'
import LoadingScreen from './components/layout/LoadingScreen'
import FloatingButtons from './components/layout/FloatingButtons'
import ProtectedRoute from './components/admin/ProtectedRoute'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Solutions = lazy(() => import('./pages/Solutions'))
const Products = lazy(() => import('./pages/Products'))
const Projects = lazy(() => import('./pages/Projects'))
const Calculator = lazy(() => import('./pages/Calculator'))
const Reviews = lazy(() => import('./pages/Reviews'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminForgotPassword = lazy(() => import('./pages/admin/AdminForgotPassword'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'))
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects'))
const AdminEnquiries = lazy(() => import('./pages/admin/AdminEnquiries'))
const AdminReviews = lazy(() => import('./pages/admin/AdminReviews'))

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
    </div>
  )
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-24">{children}</main>
      <Footer />
      <FloatingButtons />
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 60, easing: 'ease-out-cubic' })
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      <LoadingScreen visible={loading} />
      {!isAdmin && <CustomCursor />}
      <ToastContainer theme="dark" position="top-right" autoClose={4000} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Suspense fallback={<PageFallback />}>
            <Routes location={location}>
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/solutions" element={<PublicLayout><Solutions /></PublicLayout>} />
              <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
              <Route path="/projects" element={<PublicLayout><Projects /></PublicLayout>} />
              <Route path="/calculator" element={<PublicLayout><Calculator /></PublicLayout>} />
              <Route path="/reviews" element={<PublicLayout><Reviews /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
              <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
              <Route path="/admin/enquiries" element={<ProtectedRoute><AdminEnquiries /></ProtectedRoute>} />
              <Route path="/admin/reviews" element={<ProtectedRoute><AdminReviews /></ProtectedRoute>} />

              <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
