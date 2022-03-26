import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "../Footer";
import "./style.css";

const SHOWTIME_URL = "https://mock-api.driven.com.br/api/v5/cineflex/showtimes/";

function Seat({ id, name, isAvailable }){
    return(
        <div className="seat-number">
            <span>{name}</span>
        </div>
    );
}

function SearchSeatListForASession(){
    const { idSession } = useParams();
    const [seats, setSeats] = useState([]);

    useEffect(() => {
        const promise = axios.get(`${SHOWTIME_URL}${idSession}/seats`);
        
        promise.then(response => {
            setSeats(response.data.seats);
        });
        promise.catch(error => {
            console.log("Status code: " + error.response.status);
            console.log("Opa! Ocorreu um erro: " + error.response.data);
        });
    }, []);

    return(
        <section className="seats-and-description">
            <section className="seat-box">
                {seats.map(seat => {
                    return <Seat key={seat.id} {...seat} />
                })}
            </section>

            <div className="description">
                <div className="box-selected">
                    <div></div>
                    <p>Selecionado</p>
                </div>
                <div className="box-available">
                    <div></div>
                    <p>Disponível</p>
                </div>
                <div className="box-unavailable">
                    <div></div>
                    <p>Indisponível</p>
                </div>
            </div>
        </section>
    );
}

function BuyerRegistration(){
    return(
        <section className="booking-buyer">
            <div className="name">
                Nome do comprador:
            </div>
            <input type="text" placeholder="Digite seu nome..." />
            {/* --------------------------------------------------- */}
            <div className="cpf">
                CPF do comprador:
            </div>
            <input type="text" placeholder="Digite seu CPF..." />
            {/* --------------------------------------------------- */}
            <div className="book-button">
                <button>Reservar assento(s)</button>
            </div>
        </section>
    );
}

export default function Seats(){
    const { idSession } = useParams();
    const [seats, setSeats] = useState([]);

    const attributeDay = {...seats.day};
    const attributeMovie = {...seats.movie};

    useEffect(() => {
        const promise = axios.get(`${SHOWTIME_URL}${idSession}/seats`);
        
        promise.then(response => {
            setSeats(response.data);
        });
        promise.catch(error => {
            console.log("Status code: " + error.response.status);
            console.log("Opa! Ocorreu um erro: " + error.response.data);
        });
    }, []);

    return(
        <>
            <h3 className="top-status">Selecione o(s) assento(s)</h3>
            <SearchSeatListForASession />
            <BuyerRegistration />
            <Footer
                weekday={attributeDay.weekday}
                movieImage={attributeMovie.posterURL}
                movieTitle={attributeMovie.title}
                time={seats.name}
            />
        </>
    );
}