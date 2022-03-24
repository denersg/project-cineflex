import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "../Footer";
import "./style.css";

const SHOWTIME_URL = "https://mock-api.driven.com.br/api/v5/cineflex/showtimes/";

function SearchSeatListForASession(){
    const { idSession } = useParams();
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        const promise = axios.get(`${SHOWTIME_URL}${idSession}/seats`);
        
        promise.then(response => {
            setSessions(response.data.days);
        });
        promise.catch(error => {
            console.log("Status code: " + error.response.status);
            console.log("Opa! Ocorreu um erro: " + error.response.data);
        });
    }, []);
}

export default function Seats(){
    return(
        <>
            <h3 className="top-status">Selecione o(s) assento(s)</h3>
            <SearchSeatListForASession />
        </>
    );
}