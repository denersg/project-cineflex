import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Footer from "../Footer";
import "./style.css";

const MOVIE_URL = "https://mock-api.driven.com.br/api/v5/cineflex/movies/";

function BuildSchedule({ id, name }){
    return(
        <div>
            <Link to={`/seats/${id}`}>
                <button className="schedule">{name}</button>
            </Link>
        </div>
    );
}

function Session({ weekday, date, showtimes}){
    return(
        <div className="individual-session">
            <div>
                <span className="week-date">{weekday} - {date}</span>
            </div>
            <div className="schedules">
                {showtimes.map(schedule => {
                    return <BuildSchedule key={schedule.id} {...schedule} />
                })}
            </div>
        </div>
    );
}

function FetchMovieSessionsFromServer(){
    const { idMovie } = useParams();
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const promise = axios.get(`${MOVIE_URL}${idMovie}/showtimes`);
        
        // Em caso de sucesso
        promise.then(response => {
            setSessions(response.data.days);
        });
        //Em caso de falha
        promise.catch(error => {
            console.log("Status code: " + error.response.status);
            console.log("Opa! Ocorreu um erro: " + error.response.data);
        });
    }, []);

    return(
        <section className="session-box">
            {sessions.map(session => {
                return <Session key={session.id} {...session} />
            })}
        </section>
    );
}

export default function Sessions(){
    const { idMovie } = useParams();
    const [footerMovies, setFooterMovies] = useState([]);

    const { posterURL, title } = footerMovies;

    useEffect(() => {
        const promise = axios.get(`${MOVIE_URL}${idMovie}/showtimes`);

        promise.then(response => {
            setFooterMovies(response.data);
        });
        promise.catch(error => {
            console.log("Status code: " + error.response.status);
            console.log("Opa! Ocorreu um erro: " + error.response.data);
        });
    }, []);
    
    return(
        <>
            <h3 className="top-status">Selecione o horário</h3>
            <FetchMovieSessionsFromServer />
            <Footer image={posterURL} title={title} />
        </>
    );
}