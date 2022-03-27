import "./style.css";

export default function Success({ title, date, time, seats, name, cpf }){
    return(
        <div className="recipient">
            <h3 className="top-status-success">Pedido feito com sucesso!</h3>

            <section className="content-success">
                <div className="buyer-data">
                    <section className="movie-session">
                        <h3 className="movie-session-title">
                            Filme e sessão
                        </h3>
                        <p>{title}</p>
                        <p>{date} {time}</p>
                    </section>
                    <section className="tickets">
                        <h3 className="tickets-title">
                            Ingressos
                        </h3>
                        {seats.map(e => (
                            <p key={e.id} >Assento {e.name}</p>
                        ))}
                    </section>
                    <section className="buyer">
                        <h3 className="buyer-title">
                            Comprador
                        </h3>
                        <p>Nome: {name}</p>
                        <p>CPF: {cpf}</p>
                    </section>
                </div>

                <div className="home-button-box">
                    <button>Voltar pra Home</button>
                </div>
            </section>
        </div>
    );
}