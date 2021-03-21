import './styles.css'

export default function Member({login, avatar, onClick}){
    return (
        <div className="member" onClick={onClick}>
            <img src={avatar} alt="avatar"/>
            <h3>{login}</h3>
        </div>
    )
}