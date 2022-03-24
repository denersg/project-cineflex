import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./style.css";

function BuildSchedule({ id, name }){
    return(
        <div>
            <Link to={`/seats/${id}`}>
                <button className="schedule">{name}</button>
            </Link>
        </div>
    );
}

function Session({ session }){
    const { id, weekday, date, showtimes} = session;

    return(
        <div className="individual-session">
            <div>
                <span className="week-date">{weekday} - {date}</span>
            </div>
            <div className="schedules">
                {showtimes.map(s => {
                    return <BuildSchedule key={s.id} schedule={s} />
                })}
            </div>
        </div>
    );
}

function FetchMovieSessionsFromServer(){
    const { idMovie } = useParams();
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`);
        
        // Em caso de sucesso
        promise.then(response => {
            setSessions(response.data.days);
        });
    }, []);

    return(
        <section className="session-box">
            {sessions.map(session => {
                return <Session key={session.id} session={s} />
            })}
        </section>
    );
}

export default function Sessions(){
    return(
        <>
            <h3 className="top-status">Selecione o horário</h3>

            <FetchMovieSessionsFromServer />
        </>
    );
}

// Vou tentar fazer o 'Footer' (que aparece somente em algumas telas)
// como um componente separado e importá-lo somente onde eu precisar.

/*
Também vou substituir as URLs por variáveis globais, já que são
quase fixas, e mudar somente o caminho com 'template-strings'
*/

/*Tenho que tratar os erros com o 'catch'*/