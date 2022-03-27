import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Movies from "./Movies";
import Sessions from "./Sessions";
import Seats from "./Seats";
import Success from "./Success";

export default function App(){
    const [bookingData, setBookingData] = useState(null);
    return(
        <div className="content">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Movies />}></Route>
                    <Route path="/sessions/:idMovie" element={<Sessions />}></Route>
                    <Route path="/seats/:idSession" element={<Seats setBookingData={setBookingData} />}></Route>
                    <Route path="/success" element={<Success {...bookingData} />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}