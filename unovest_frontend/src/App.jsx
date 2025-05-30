import './App.css'
import DemoExp from './DemoExp'
import AllRoutes from './routing/AllRoutes'
import './assets/css/main.scss'

function App() {
  return (
    <div className='font-Montserrat bg-primary-gradient min-h-screen md:min-h-auto'> {/* bg-primary-gradient dark:bg-secondary-gradient */}
      {/* <div className="max-w-[1440px] mx-auto"> */}
      <AllRoutes />
    </div>
  )
}

export default App
