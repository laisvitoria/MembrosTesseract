import './styles.css'

export default function SelectedMember({avatar, login, name, repositories, followers, created_at}){
    let date = new Date(created_at)

    return (
        <div className="container__selectedMember">
            <img src={avatar} alt={login}/>
            <div>
                <div>
                    <h2>{name}</h2>
                    <h3>{login}</h3>
                </div>
                <div>
                    <p>Repositórios: {repositories}</p>
                    <p>Seguidores: {followers}</p>
                    <p>Entrou em:
                        {` 
                            ${(date.getDate()) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear()}
                            às ${date.getHours()}h`
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}