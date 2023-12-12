import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages and components
// import Home from './pages/Home'
import Login from './pages/Login'
// import Navbar from './components/Navbar'

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Navbar />
//         <div className="pages">
//           <Routes>
//             <Route
//               path="/"
//               element={<Login />}
//             />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// }

function App() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={<Login />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
export default App;
