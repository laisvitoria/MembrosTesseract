import { useState, useEffect } from 'react'
import Member from '../../components/Member'
import api from '../../services/api'
import './styles.css'

export default function Index(){
    const [members, setMembers] = useState({})
    const [loading, isLoading] = useState(true)

    useEffect(() => {
        async function getTesseractMembers(){
            await api.get('/orgs/grupotesseract/public_members')
            .then((response) => {
                setMembers(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
            isLoading(false)
        }
        getTesseractMembers()
    },[])

    return(
        <div className="container">
            <header>
                <div>
                    <img
                        src="https://avatars.githubusercontent.com/u/21321212?s=280&v=4"
                        alt="logo-tesseract"
                    />
                    <h1>Desafio Front-end</h1>
                </div>
            </header>
            <section>
                <article>
                    <h2>Listagem de membros</h2>
                    { loading === true ? <p>Carregando ...</p> :
                        members.map((item)=> <Member key={item.login} avatar={item.avatar_url} login={item.login}/>
                    )}
                </article>
                <article>

                </article>
            </section>
        </div>
    )
}