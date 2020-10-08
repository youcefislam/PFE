import React from 'react';
import Breadcrumb from './Breadcrumb';
import '../styles.css';
import { NavLink } from 'react-router-dom';


class Feedback extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Breadcrumb Title={['FeedBack']} />
                
            </>
        )
    }
}

export default Feedback;