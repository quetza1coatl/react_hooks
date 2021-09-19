import React, {useCallback, useEffect, useMemo, useState} from 'react'
import ReactDOM from "react-dom";

const App = () => {
    const [value, setValue] = useState(1);
    const [visible, setVisible] = useState(true);
    if (visible) {
        return (
            <div>
                <button
                    onClick={() => setValue((v) => v + 1)}>+
                </button>
                <button
                    onClick={() => setVisible(false)}>hide
                </button>
                <PlanetInfo id={value}/>
            </div>
        );
    } else {
        return (
            <button
                onClick={() => setVisible(true)}>show</button>
        );
    }
};

const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}`)
        .then(res => res.json())
        .then(data => data);
};

const useRequest = (request) => {
    const initialState = useMemo( () => ({
        data: null,
        loading: true,
        error: null
    }), []);
    const [dataState, setDataState] = useState(initialState);
    useEffect(() => {
        setDataState(initialState);
        let cancelled = false;
        request()
            .then(data => !cancelled && setDataState({
                data,
                loading: false,
                error: null
            }))
            .catch(error => !cancelled && setDataState({
                data: null,
                loading: false,
                error
            }));
        return () => cancelled = true;
        }, [request, initialState]);
        return dataState;
    };

    const usePlanetInfo = (id) => {
        const request = useCallback(
            () => getPlanet(id), [id]);
        return useRequest(request);
    };

    const PlanetInfo = ({id}) => {
        const { data, loading, error } = usePlanetInfo(id);
        if(error){
            console.log("error");
            return <div>Something is wrong</div>
        }
        if(loading){
            console.log("loading");
            return <div>Loading...</div>
        }
        return <p>{id} - {data && data.name}</p>
    }

// const Notification = () => {
//     const [visible, setVisible] = useState(true);
//     useEffect(() => {
//         const timeout = setTimeout(() => setVisible(false), 2500);
//         return () => clearTimeout(timeout)
//     }, []);
//     return (
//         <div>
//             { visible && <p>Hello</p>}
//         </div>
//     );
// }

// class ClassCounter extends Component{
//     componentDidMount() {
//         console.log('class: mount')
//     }
//     componentDidUpdate(prevProps, prevState, snapshot) {
//        console.log('class: update')
//     }
//     componentWillUnmount() {
//         console.log('class: unmount')
//     }
//     render() {
//         return <p>{this.props.value}</p>
//     }
// }


    ReactDOM.render(<App/>, document.getElementById('root'));