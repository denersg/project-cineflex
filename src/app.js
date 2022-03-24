import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Movies from "./Movies";
import Sessions from "./Sessions";
import Seats from "./Seats";

export default function App(){
    return(
        <div className="content">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Movies/>}></Route>
                    <Route path="/sessions/:idMovie" element={<Sessions/>}></Route>
                    <Route path="/seats/:idSession" element={<Seats/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}