import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./style.css";

const MOVIE_URL = "https://mock-api.driven.com.br/api/v5/cineflex/movies/";

export default function Footer(){
    const { idMovie } = useParams();
    const [footerMovies, setFooterMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get(`${MOVIE_URL}${idMovie}/showtimes`);

        //Quando sucesso
        promise.then(response => {
            setFooterMovies(response.data);
        });
        //Quando erro
        promise.catch(error => {
            console.log("Status code: " + error.response.status);
            console.log("Opa! Ocorreu um erro: " + error.response.data);
        });
    }, []);

    return(
        <footer className="footer-box">
            <div className="img-box">
                <div className="frame">
                    <img src={footerMovies.posterURL} alt={footerMovies.title} />
                </div>
            </div>

            <div className="text-box">
                <div className="order-status">
                    {footerMovies.title}
                </div>
            </div>
        </footer>
    );
}