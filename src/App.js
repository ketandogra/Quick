import "./style.scss";
import Routers from "./routers/Routers";
import { useValue } from "./context/AuthContext";

function App() {
  // const {currentUser} = useValue()
  return (
    <>
      <Routers />
    </>
  );
}

export default App;
