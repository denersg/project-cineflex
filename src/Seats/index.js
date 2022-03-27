import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "../Footer";
import "./style.css";

const SHOWTIME_URL = "https://mock-api.driven.com.br/api/v5/cineflex/showtimes/";

function Seat({ id, name, isAvailable, selectSeat, selected}){
    return(
        <div
            className={
                `seat-number cursor
                ${!isAvailable ? "unavailable" : ""}
                ${selected.find(e => e.id === id) ? "selected" : ""}
            `}
            onClick={() => selectSeat({ id, name, isAvailable})}
        >
            {name}
        </div>
    );
}

function SearchSeatListForASession(){
    const { idSession } = useParams();
    const [seats, setSeats] = useState([]);
    const [selected, setSelected] = useState([]);

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

    function selectSeat(props){
        if(props.isAvailable === false){
            alert("Esse assento não está disponível");
            return;
        }
        // Verifica se já está selecionado e remove a seleção
        if(selected.find(e => e.id === props.id)){
            setSelected(selected.filter(selected => selected.id !== props.id));
            return;
        }
        
        setSelected([...selected, props]);
    }

    return(
        <section className="seats-and-description">
            <section className="seat-box">
                {seats.map(seat => {
                    return <Seat key={seat.id} {...seat} selectSeat={selectSeat} selected={selected} />
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

// Entrada dos dados e reserva do comprador
function BuyerRegistration(){
    const [buyerName, setBuyerName] = useState("");
    const [buyerCpf, setBuyerCpf] = useState("");

    // useEffect(() => {
    //     const promise = post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", );
    // });

    function createBuyerSeatReservation(){
        const booking = {buyerName, buyerCpf};
    }

    return(//PAREI EM 01:18:00
        <section className="booking-buyer">
            <div className="name">
                Nome do comprador:
            </div>
            <input 
                type="text" 
                placeholder="Digite seu nome..." 
                onChange={event => setBuyerName(event.target.value)}
                value={buyerName}
            />
            {/* --------------------------------------------------- */}
            <div className="cpf">
                CPF do comprador:
            </div>
            <input 
                type="text" 
                placeholder="Digite seu CPF..." 
                onChange={event => setBuyerCpf(event.target.value)}
                value={buyerCpf}
            />
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