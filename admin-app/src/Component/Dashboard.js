import React from 'react';
import Breadcrumb from './Breadcrumb';
import '../styles.css';
import axios from 'axios';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nbrUsers: 9999,
            nbrCmnt: 9999,
            nbrSpe: 9999,
            nbrSspe: 9999,
            nbrDoc: 9999,
            nbrQuiz: 9999
        }
        this.GetInfo = this.GetInfo.bind(this);
    }

    GetInfo = () => {
        axios.get("/Dashboard")
            .then(res => this.setState(res.data))
    }

    componentDidMount() {
        this.GetInfo()
    }

    render() {
        return (
            <>
                <Breadcrumb Title={['Dashboard']} />
                <div className='container'>
                    <div className='row justify-content-center mx-3'>
                        <div className='col-lg-4 p-4 DashbordCardContainer'>
                            <div className="h-100 DashbordCard">
                                <div className='h-25 d-flex align-items-center justify-content-center'>
                                    <span className='InfoHeaderTxt'>Nombre d’utilisateures :</span>
                                </div>
                                <div className='h-50 d-flex align-items-center justify-content-center'>
                                    <span className='InfoNumberTxt'>{this.state.nbrUsers}</span>
                                </div>
                                {/* <div className='d-flex align-items-center justify-content-center'>
                                    <span className='InfoWeaklyTxt'>+9999 cette semaine</span>
                                </div> */}
                            </div>
                        </div>
                        <div className='col-lg-4 p-4 DashbordCardContainer'>
                            <div className="h-100 DashbordCard">
                                <div className='h-25 d-flex align-items-center justify-content-center'>
                                    <span className='InfoHeaderTxt'>Nombre de commentaires :</span>
                                </div>
                                <div className='h-50 d-flex align-items-center justify-content-center'>
                                    <span className='InfoNumberTxt'>{this.state.nbrCmnt}</span>
                                </div>
                                {/* <div className='d-flex align-items-center justify-content-center'>
                                    <span className='InfoWeaklyTxt'>+9999 cette semaine</span>
                                </div> */}
                            </div>
                        </div>
                        <div className='col-lg-4 p-4 DashbordCardContainer'>
                            <div className="h-100 DashbordCard">
                                <div className='h-25 d-flex align-items-center justify-content-center'>
                                    <span className='InfoHeaderTxt'>Nombre de spécialités :</span>
                                </div>
                                <div className='h-50 d-flex align-items-center justify-content-center'>
                                    <span className='InfoNumberTxt'>{this.state.nbrSpe}</span>
                                </div>
                                {/* <div className='d-flex align-items-center justify-content-center'>
                                    <span className='InfoWeaklyTxt'>+9999 cette semaine</span>
                                </div> */}
                            </div>
                        </div>
                        <div className='col-lg-4 p-4 DashbordCardContainer'>
                            <div className="h-100 DashbordCard">
                                <div className='h-25 d-flex align-items-center justify-content-center'>
                                    <span className='InfoHeaderTxt'>Nombre de sous-spécialités :</span>
                                </div>
                                <div className='h-50 d-flex align-items-center justify-content-center'>
                                    <span className='InfoNumberTxt'>{this.state.nbrSspe}</span>
                                </div>
                                {/* <div className='d-flex align-items-center justify-content-center'>
                                    <span className='InfoWeaklyTxt'>+9999 cette semaine</span>
                                </div> */}
                            </div>
                        </div>
                        <div className='col-lg-4 p-4 DashbordCardContainer'>
                            <div className="h-100 DashbordCard">
                                <div className='h-25 d-flex align-items-center justify-content-center'>
                                    <span className='InfoHeaderTxt'>Nombre de documents :</span>
                                </div>
                                <div className='h-50 d-flex align-items-center justify-content-center'>
                                    <span className='InfoNumberTxt'>{this.state.nbrDoc}</span>
                                </div>
                                {/* <div className='d-flex align-items-center justify-content-center'>
                                    <span className='InfoWeaklyTxt'>+9999 cette semaine</span>
                                </div> */}
                            </div>
                        </div>
                        <div className='col-lg-4 p-4 DashbordCardContainer'>
                            <div className="h-100 DashbordCard">
                                <div className='h-25 d-flex align-items-center justify-content-center'>
                                    <span className='InfoHeaderTxt' >Nombre de quizzs :</span>
                                </div>
                                <div className='h-50 d-flex align-items-center justify-content-center'>
                                    <span className='InfoNumberTxt'>{this.state.nbrQuiz}</span>
                                </div>
                                {/* <div className='d-flex align-items-center justify-content-center'>
                                    <span className='InfoWeaklyTxt'>+9999 cette semaine</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default Dashboard;