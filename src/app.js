import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Movies from "./Movies";

export default function App(){
    return(
        <div className="content">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Movies/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}