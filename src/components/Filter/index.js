import './styles.css'

export default function Filter({value, onChange}){
    return (
        <input type="text" placeholder="Buscar..." value={value} onChange={onChange}/>
    )
}