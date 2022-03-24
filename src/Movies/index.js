import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./style.css";

function Movie({ movie }){
    const { id, title, posterURL } = movie;
    return(
        <section className="movie">
            <Link to={`/sessoes/${id}`}>
                <img src={posterURL} alt={title} />
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
        // Faz uma requisição e espera uma reposta q/ será armazenada
        // no 'promise'
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");

        // Quando a resposta chegar, é pra ele executar a 'Arrow-function'
        // e chamar a outra função 'setMovies'.
        promise.then((response) => {
            setMovies(response.data);
        });
    }, [] );
    
    return(
        <div className="catalog">
            {movies.map((m) => {
                return <Movie key={m.id} movie={m} /> /*Aqui eu estou enviando o objeto completo com todos os suas propriedades:
                                                        id, title, posterURL, overview e releaseDate. Tudo tá sendo enviado
                                                        dentro de 'm' e lá em cima eu desestruturo.*/
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