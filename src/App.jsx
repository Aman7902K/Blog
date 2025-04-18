import { useEffect,useState } from "react"
import { useDispatch } from "react-redux"
import authSlice, { login, logout } from "./store/authSlice"
import authService from "./appwrite/auth"
import { Outlet } from "react-router-dom"
import Footer from "./component/Footer/Footer"
import Header from "./component/Header/Header"
import PostCard from "./component/PostCard"


function App() {

  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getUserAcc()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))     
      } else {
        dispatch(logout())
      }
    }).
    catch(() => {
      dispatch(logout()); // ⛑️ fallback if 401 or error
    })
    .finally( () => setLoading(false) )
  },[])
  
  console.log("siuuu");
  

  return loading ? (
    <div className="flex flex-wrap min-h-screen content-between bg-gray-500 ">
      <div className="w-full block">
        <Header/>
        <main>
          {/* <Outlet/> */}
          <PostCard/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
