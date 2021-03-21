import { useState, useEffect } from 'react'
import { FaGithub } from 'react-icons/fa'

import Member from '../../components/Member'
import SelectedMember from '../../components/SelectedMember'
import Filter from '../../components/Filter'

import api from '../../services/api'
import './styles.css'

export default function Index(){
    const [members, setMembers] = useState({})
    const [filteredMembers, setFilteredMembers] = useState(members)
    const [memberSelected, setMemberSelected] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [loading, isLoading] = useState(true)

    useEffect(() => {
        async function getTesseractMembers(){
            await api.get('/orgs/grupotesseract/public_members')
            .then((response) => {
                setMembers(response.data)
                setFilteredMembers(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
            isLoading(false)
        }
        getTesseractMembers()
    },[])

    async function getMemberData(login){
        await api.get(`/users/${login}`)
        .then((response) => {
            setMemberSelected(response.data)
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    function onChangeText(event){
        setInputValue(event.target.value)
        setFilteredMembers(members?.filter(member => {
            return member.login.indexOf(event.target.value) !== -1
        }))
    }

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
                    <Filter value={inputValue} onChange={event => onChangeText(event)}/>
                    { loading === true ? <p>Carregando ...</p> :
                        filteredMembers.map((item)=> <Member
                        onClick={() => getMemberData(item.login)}
                        key={item.login}
                        avatar={item.avatar_url}
                        login={item.login}
                    />
                    )}
                </article>
                <article>
                    {!memberSelected ? <h2>Selecione um membro para saber mais sobre ele</h2> :
                    <>
                        <SelectedMember
                            avatar={memberSelected.avatar_url}
                            login={memberSelected.login}
                            name={memberSelected.name}
                            repositories={memberSelected.public_repos}
                            followers={memberSelected.followers}
                            created_at={memberSelected.created_at}
                        />
                        <a href={memberSelected.html_url} target="blank">
                            <FaGithub  fontSize={20} style={{marginRight: '1rem'}}/>
                            Visualizar no GitHub
                        </a>
                    </>
                    }
                </article>
            </section>
        </div>
    )
}