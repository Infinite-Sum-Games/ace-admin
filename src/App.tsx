import { ThemeProvider } from '@/components/theme-provider'
import './index.css'
import { RecoilRoot } from 'recoil'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DashboardPage from './pages/dashboard/DashboardPage'
import Layout from '@/pages/Layout'
import LoginPage from './pages/login/LoginPage'
import EventsPage from './pages/events/EventsPage'
import SuggestionsPage from './pages/suggestions/SuggestionsPage'
import Error404 from './pages/errors/Error404'
import BlogsPage from './pages/blogs/BlogsPage'
import AdminPage from './pages/admin/AdminPage'
import CampaignsPage from './pages/campaigns/CampaignsPage'
import NewEvent from './pages/events/NewEvent'
import EventAnalytics from './pages/events/EventAnalytics'
function App() {

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RecoilRoot>

        { /* Routing logic */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path='/events/new' element={<NewEvent />}/>
            <Route path="/events/analytics/:eventId" element={<EventAnalytics />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/suggestions" element={<SuggestionsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default App
