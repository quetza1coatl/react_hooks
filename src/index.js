import React, {useEffect, useState} from 'react'
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
                <PlanetInfo id={value} />
            </div>
        );
    } else {
        return (
            <button
            onClick={() => setVisible(true)}>show</button>
        );
    }
};

const usePlanetInfo = (id) => {
    const [planetName, setPlanetName] = useState(null)
    useEffect(() => {
        let cancelled = false;
        fetch(`https://swapi.dev/api/planets/${id}`)
            .then(res => res.json())
            .then(data => !cancelled && setPlanetName(data.name));
        return () => cancelled = true;
    },[id]);
    return planetName;
};

const PlanetInfo = ({id}) => {
    const planetName = usePlanetInfo(id);
    return <p>{id} - {planetName}</p>
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