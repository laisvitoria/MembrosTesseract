export default function Member({login, avatar}){
    return(
        <div>
            <img src={avatar} alt="avatar"/>
            <p>{login}</p>
        </div>
    )
}