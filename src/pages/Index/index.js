import { useState, useEffect } from 'react'
import Member from '../../components/Member'
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
        })
        .catch((err) => {
            console.log(err)
            })
    }

    function onChangeText(event){
        console.log(event.target.value)
        setInputValue(event.target.value)
    }

    useEffect(() => {
        setFilteredMembers(members.filter(member => member.login.indexOf(inputValue) !== -1))
    }, [inputValue, members])

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

                </article>
            </section>
        </div>
    )
}