import { ThemeProvider } from '@/components/theme-provider'
import Dashboard from '@/pages/dashboard/Dashboard'
import './index.css'
import { RecoilRoot } from 'recoil'

function App() {

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <RecoilRoot>
        <Dashboard />
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default App
