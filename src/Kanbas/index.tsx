import { Routes, Route, Navigate } from "react-router-dom";
import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import store from "./store";
import { Provider } from "react-redux";
import Account from "./Account";

function Kanbas() {
   return (
      <Provider store={store}>
         <div className="d-flex">
            <div className="d-none d-md-block">
               <div style={{ paddingRight: "90px" }}>
                  <KanbasNavigation />
               </div>
            </div>
            <div style={{ flexGrow: 1 }}>
               <Routes>
                  <Route path="/" element={<Navigate to="Dashboard" />} />
                  <Route path="/Account/*" element={<Account />} />
                  <Route path="Dashboard" element={<Dashboard />} />
                  <Route path="Courses/:courseId/*" element={<Courses />} />
               </Routes>
            </div>
         </div>
      </Provider>
   );
}
export default Kanbas;