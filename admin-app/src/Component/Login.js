import React from 'react';
import "../styles.css";
import $ from "jquery";
import Logo from "../Image/Logo.jpg";

class LoginPage extends React.Component {
    componentDidMount() {
        $("#root").addClass("containerImg");
    }

    render() {
        return (
            <form className="container-md bg-white loginContainer">
                <div className='row justify-content-center'>
                    <div className='col-12'>
                        <h1 className='text-center'>Tredoc</h1>
                    </div>
                    <img src={Logo} alt='logo..' />
                </div>
                <div className="row justify-content-center">
                    <div className='col-9 col-md-5'>
                        <div className="position-relative my-3">
                            <input className='LogInfoInput w-100' type="text" id="usernameInput" name="username" placeholder="Admin" required autoComplete='off' />
                            <svg className='InputSvg' width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.125 3.54167V13.4583C2.125 14.2375 2.75542 14.875 3.54167 14.875H13.4583C14.2375 14.875 14.875 14.2375 14.875 13.4583V3.54167C14.875 2.7625 14.2375 2.125 13.4583 2.125H3.54167C2.75542 2.125 2.125 2.7625 2.125 3.54167ZM10.625 6.375C10.625 7.55083 9.67583 8.5 8.5 8.5C7.32417 8.5 6.375 7.55083 6.375 6.375C6.375 5.19917 7.32417 4.25 8.5 4.25C9.67583 4.25 10.625 5.19917 10.625 6.375ZM4.25 12.0417C4.25 10.625 7.08333 9.84583 8.5 9.84583C9.91667 9.84583 12.75 10.625 12.75 12.0417V12.75H4.25V12.0417Z" fill="#5C5C5C" />
                            </svg>
                        </div>
                        <div className='position-relative'>
                            <input className='LogInfoInput w-100' type="password" id="passwordInput" name="password" placeholder="Password" required />
                            <svg className='InputSvg' width="17" height="19" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.01667 4.83543H1.35396V3.91196C1.35396 2.83931 1.81865 1.86293 2.56748 1.154C3.31923 0.441903 4.35734 0 5.5 0C6.64277 0 7.68077 0.441903 8.43275 1.1539C9.18147 1.86283 9.64615 2.83931 9.64615 3.91185V4.83533H9.98345C10.2633 4.83533 10.5176 4.93901 10.7016 5.10616C10.8857 5.27332 11 5.50405 11 5.75807V12.0772C11 12.3312 10.8858 12.562 10.7016 12.7291C10.5175 12.8961 10.2633 12.9999 9.98345 12.9999H1.01667C0.736713 12.9999 0.482517 12.8962 0.298368 12.7291C0.114219 12.5619 0 12.3314 0 12.0773V5.75817C0 5.50416 0.114336 5.27332 0.298368 5.10627C0.482517 4.93922 0.736713 4.83543 1.01667 4.83543ZM5.12821 9.23595L4.63986 10.3975H6.36037L5.90769 9.21997C6.19499 9.08561 6.39138 8.81372 6.39138 8.50025C6.39138 8.05348 5.99219 7.69124 5.50012 7.69124C5.00793 7.69124 4.60874 8.05359 4.60874 8.50025C4.60862 8.82663 4.82156 9.10794 5.12821 9.23595ZM2.06911 4.83543H8.931V3.91196C8.931 3.01154 8.54336 2.19428 7.91865 1.60289C7.2972 1.01446 6.44114 0.64926 5.5 0.64926C4.55886 0.64926 3.7028 1.01446 3.08135 1.60278C2.45676 2.19417 2.069 3.01143 2.069 3.91185V4.83543H2.06911ZM9.98345 5.48469H1.01667C0.934149 5.48469 0.858974 5.51558 0.804196 5.56531C0.749417 5.61503 0.715385 5.68337 0.715385 5.75817V12.0773C0.715385 12.1521 0.749417 12.2204 0.804196 12.27C0.858974 12.3198 0.934266 12.3506 1.01667 12.3506H9.98357C10.0661 12.3506 10.1414 12.3198 10.196 12.27C10.2508 12.2203 10.2848 12.1521 10.2848 12.0773V5.75817C10.2848 5.68337 10.2508 5.61503 10.196 5.56531C10.1411 5.51558 10.066 5.48469 9.98345 5.48469Z" fill="#5C5C5C" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="row my-4 ">
                    <input className='btn btn-outline-secondary m-auto LoginBtn' type="submit" value="Login"></input>
                </div>
            </form>
        )
    }
}

export default LoginPage;