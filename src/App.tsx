import Router from "./shared/routes";
import {AuthProvider} from "./shared/context/Auth";


function App() {

  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  )
}

export default App
