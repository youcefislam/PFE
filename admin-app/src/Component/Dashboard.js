import React from 'react';
import Breadcrumb from './Breadcrumb';
import '../styles.css';

class Dashboard extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

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
                                    <span className='InfoNumberTxt'>9999</span>
                                </div>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <span className='InfoWeaklyTxt'>+9999 cette semaine</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 p-4 DashbordCardContainer'>
                            <div className="h-100 DashbordCard">
                                <div className='h-25 d-flex align-items-center justify-content-center'>
                                    <span className='InfoHeaderTxt'>Nombre de commentaires :</span>
                                </div>
                                <div className='h-50 d-flex align-items-center justify-content-center'>
                                    <span className='InfoNumberTxt'>9999</span>
                                </div>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <span className='InfoWeaklyTxt'>+9999 cette semaine</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 p-4 DashbordCardContainer'>
                            <div className="h-100 DashbordCard">
                                <div className='h-25 d-flex align-items-center justify-content-center'>
                                    <span className='InfoHeaderTxt'>Nombre de spécialités :</span>
                                </div>
                                <div className='h-50 d-flex align-items-center justify-content-center'>
                                    <span className='InfoNumberTxt'>9999</span>
                                </div>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <span className='InfoWeaklyTxt'>+9999 cette semaine</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 p-4 DashbordCardContainer'>
                            <div className="h-100 DashbordCard">
                                <div className='h-25 d-flex align-items-center justify-content-center'>
                                    <span className='InfoHeaderTxt'>Nombre de sous-spécialités :</span>
                                </div>
                                <div className='h-50 d-flex align-items-center justify-content-center'>
                                    <span className='InfoNumberTxt'>9999</span>
                                </div>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <span className='InfoWeaklyTxt'>+9999 cette semaine</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 p-4 DashbordCardContainer'>
                            <div className="h-100 DashbordCard">
                                <div className='h-25 d-flex align-items-center justify-content-center'>
                                    <span className='InfoHeaderTxt'>Nombre de documents :</span>
                                </div>
                                <div className='h-50 d-flex align-items-center justify-content-center'>
                                    <span className='InfoNumberTxt'>9999</span>
                                </div>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <span className='InfoWeaklyTxt'>+9999 cette semaine</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 p-4 DashbordCardContainer'>
                            <div className="h-100 DashbordCard">
                                <div className='h-25 d-flex align-items-center justify-content-center'>
                                    <span className='InfoHeaderTxt' >Nombre de quizzs :</span>
                                </div>
                                <div className='h-50 d-flex align-items-center justify-content-center'>
                                    <span className='InfoNumberTxt'>9999</span>
                                </div>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <span className='InfoWeaklyTxt'>+9999 cette semaine</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default Dashboard;