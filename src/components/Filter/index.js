import { Formik } from 'formik'
import './styles.css'

export default function Filter({value, onChange}){
    return (
        <Formik>
            <input type="text" placeholder="Buscar..." value={value} onChange={onChange}/>
        </Formik>
    )
}