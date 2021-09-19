import React, {Component, useEffect, useState} from 'react'
import ReactDOM from "react-dom";

const App = () => {
    const [value, setValue] = useState(0);
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
                <HookCounter value={value} />
                <ClassCounter value={value} />
                <Notification />

            </div>
        );
    } else {
        return (
            <button
            onClick={() => setVisible(true)}>show</button>
        );
    }
};

const HookCounter = ({ value }) => {
    useEffect(() => {
        console.log('useEffect');
        return () => console.log('clear');  // is used before next useEffect call, incl before component did unmount
    },
        [value]);  // useEffect will be called only if value will be changed
    return <p>{value}</p>
}

const Notification = () => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => setVisible(false), 2500);
        return () => clearTimeout(timeout)
    }, []);
    return (
        <div>
            { visible && <p>Hello</p>}
        </div>
    );
}

class ClassCounter extends Component{
    componentDidMount() {
        console.log('class: mount')
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
       console.log('class: update')
    }
    componentWillUnmount() {
        console.log('class: unmount')
    }
    render() {
        return <p>{this.props.value}</p>
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));