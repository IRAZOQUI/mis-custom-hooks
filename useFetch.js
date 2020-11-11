import { useEffect, useRef, useState } from "react"


export const useFetch = (url) => {

    const isMounted = useRef(true)//con este hook hacemos referencia y lo usaremos para asegurar que se monte el componente para evitar errores de montado
    const [state, setState] = useState({data:null,loading:true,error:null})

    useEffect(() => {
 
        return ()=>{
            isMounted.current= false;
        }

    }, [])//aqui indicamos que se afectara solo al inicio del componente
    //osea si no se inicia el componente no cambia el estado por lo tanto abajo en el
    //setSatete no se manda los datos evitando un error
    useEffect( () =>{

        setState({data:null,loading:true,error:null,});//para que se esten limpiando y recargando al momento de uno nuevo

        fetch(url)
        .then(resp => resp.json())
        .then(data =>{

            if(isMounted.current){//si 
                setState({
                    loading:false,
                    error:null,
                    data
                })
            }//if

        })
    },[url])
    return state;
}
