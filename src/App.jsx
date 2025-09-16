import CoffeeForm from "./components/CoffeeForm"
import Hero from "./components/Hero"
import History from "./components/History"
import Layout from "./components/Layout"
import Stats from "./components/Stats"
import { useAuth } from "./context/AuthContext"
import { coffeeConsumptionHistory } from "./utils"

function App() {
  const {globalUser, globalData, isLoading} = useAuth()
  //let globalData = coffeeConsumptionHistory
  const isAuthenticated = globalUser
  const isData = globalData && !!Object.keys(globalData || {}).length //with !! we convert it into a boolean forcefully


  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  )

  return (
    <Layout>
      <Hero />
      <CoffeeForm isAuthenticated={isAuthenticated}/>
      {(isLoading && isAuthenticated) && (
        <p>Loading data...</p>
      )}
      {/* if is authenticated true render the content */}
      {(isAuthenticated && isData) && (authenticatedContent)} 
    </Layout>
  )
}

export default App
