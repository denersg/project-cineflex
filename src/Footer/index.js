import "./style.css";

export default function Footer(props){
    // Rodapé da tela de assentos
    if(props.weekday !== undefined){
        return(
            <footer className="footer-box">
                <div className="img-box">
                    <div className="frame">
                        <img
                            src={props.movieImage}
                            alt={props.movieTitle}
                        />
                    </div>
                </div>

                <div className="text-box">
                    <div className="order-status">
                        <span>
                            <p>{props.movieTitle}</p>
                            <p>{props.weekday} - {props.time}</p>
                        </span>
                    </div>
                </div>
            </footer>
        );
    }
    
    // Rodapé da tela de sessões
    return(
        <footer className="footer-box">
            <div className="img-box">
                <div className="frame">
                    <img
                        src={props.image}
                        alt={props.title}
                    />
                </div>
            </div>

            <div className="text-box">
                <div className="order-status">
                    <span>{props.title}</span>
                </div>
            </div>
        </footer>
    );
}