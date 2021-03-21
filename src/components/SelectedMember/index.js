export default function SelectedMember({avatar, login, name, repositories, followers, created_at}){
    return (
        <div className="container__selectedMember">
            <div>
                <img src={avatar} alt={login}/>
                <div>
                    <h2>{name}</h2>
                    <h3>{login}</h3>
                </div>
            </div>
            <div>
                <p>{repositories}</p>
                <p>{followers}</p>
                <p>{created_at}</p>
            </div>
        </div>
    )
}