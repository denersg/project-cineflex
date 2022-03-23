import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./style.css";

function Movie({ movie }){
    return(
        <section className="movie">
            <Link to={`/sessoes/${movie.id}`}>
                <img src={movie.posterURL} alt={movie.title} />
            </Link>
        </section>
    );
}

function FetchMovieCatalogFromServer(){
    const [movies, setMovies] = useState([]);
    /*Usamos o 'useState' e iniciamos ele com uma array vazia. Depois,
    usamos o 'useEffect' para visualizar qualquer mudança ocorrida
    nessa array. Quando houver uma mudança array, o 'useEffect' é
    atualizado e executa a função dentro dele.*/
    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

        promise.then((response) => {
            setMovies(response.data);
        });
    }, [] );
    
    return(
        <div className="catalog">
            {movies.map((m) => {
                return <Movie key={m.id} movie={m} />
            })}
        </div>
    );
}

export default function Movies(){
    return(
        <>
            <h3 className="top-status">Selecione o filme</h3>

            <FetchMovieCatalogFromServer />
        </>
    );
}