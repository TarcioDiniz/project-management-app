import {AuthProvider} from "./shared/context/Auth";
import Layouts from "./shared/layouts";


function App() {

  return (
    <AuthProvider>
      <Layouts/>
    </AuthProvider>
  )
}

export default App
