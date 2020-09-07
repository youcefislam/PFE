import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles.css';

class SideBar extends React.Component {

    render() {
        return (
            <div className='d-flex flex-column h-100 w-100 SideBarContainer'>
                <div className='border-bottom SidebarHeader py-2 d-flex align-items-center'>
                    <svg className='col-3' width="59" height="36" viewBox="0 0 59 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0)">
                            <g filter="url(#filter0_d)">
                                <path d="M30.1619 34.1053C43.7911 34.1053 54.8398 26.8947 54.8398 18C54.8398 9.10532 43.7911 1.89474 30.1619 1.89474C16.5327 1.89474 5.48401 9.10532 5.48401 18C5.48401 26.8947 16.5327 34.1053 30.1619 34.1053Z" fill="#05DBF2" />
                                <path d="M30.1619 34.1053C43.7911 34.1053 54.8398 26.8947 54.8398 18C54.8398 9.10532 43.7911 1.89474 30.1619 1.89474C16.5327 1.89474 5.48401 9.10532 5.48401 18C5.48401 26.8947 16.5327 34.1053 30.1619 34.1053Z" fill="url(#paint0_linear)" />
                            </g>
                            <path d="M23.2744 27.6614L32.2258 17.9228C32.2522 17.894 32.2868 17.8742 32.325 17.8659L49.1134 14.2392C49.1421 14.233 49.169 14.2202 49.1919 14.2019L55.7168 8.96304C55.873 8.83752 55.753 8.58656 55.5574 8.63025L36.8974 12.7998C36.7141 12.8407 36.5897 12.618 36.7204 12.483L40.8504 8.21252C40.9801 8.07835 40.8583 7.85692 40.6758 7.89523L0.808286 16.2646C0.611631 16.3059 0.606445 16.5853 0.801435 16.6339L10.6389 19.0847C10.6658 19.0914 10.6939 19.0921 10.7211 19.0866L28.9719 15.4822C29.1513 15.4468 29.2714 15.6618 29.1476 15.7965L13.9505 32.3195C13.8057 32.4769 13.9918 32.7164 14.1797 32.6143L23.2254 27.6997C23.2438 27.6899 23.2602 27.6768 23.2744 27.6614Z" fill="white" />
                        </g>
                        <defs>
                            <filter id="filter0_d" x="-4.51599" y="-8.10526" width="69.3558" height="52.2105" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                <feOffset />
                                <feGaussianBlur stdDeviation="5" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                            </filter>
                            <linearGradient id="paint0_linear" x1="51.4359" y1="-1.79999" x2="0.866823" y2="39.2187" gradientUnits="userSpaceOnUse">
                                <stop offset="0.00325249" stopColor="#5F33EC" />
                                <stop offset="1" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                            <clipPath id="clip0">
                                <rect width="59" height="36" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span className='col-6 '>Tredoc Admin</span>
                    <button className='d-block d-md-none d-lg-none toggleMenue p-O col-2' onClick={this.props.toggleMenu}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                                <path d="M0.185892 1.08284C-0.0616384 0.835319 -0.0616384 0.433887 0.185892 0.18623C0.433422 -0.0614258 0.834861 -0.0614258 1.08252 0.18623L8.00021 7.10381L14.9179 0.18623C15.1654 -0.0614258 15.5669 -0.0614258 15.8147 0.18623C16.0622 0.433756 16.0622 0.835319 15.8147 1.08284L8.89671 8.00029L15.8145 14.918C16.0621 15.1655 16.0621 15.567 15.8145 15.8146C15.5669 16.0623 15.1654 16.0623 14.9178 15.8146L8.00008 8.89704L1.08252 15.8146C0.834991 16.0623 0.433552 16.0623 0.185892 15.8146C-0.0616384 15.5671 -0.0616384 15.1657 0.185892 14.918L7.10358 8.00029L0.185892 1.08284Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>
                <div className='ml-4 mt-4'>
                    <div className='my-3'>
                        <NavLink exact to="/" activeClassName="active" className="link">
                            <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.75 16.25H13.75V3.75H3.75V16.25ZM3.75 26.25H13.75V18.75H3.75V26.25ZM16.25 26.25H26.25V13.75H16.25V26.25ZM16.25 3.75V11.25H26.25V3.75H16.25Z" fill="white" />
                            </svg>
                            <span>Dashboard</span>
                        </NavLink>
                    </div>
                    <div className='my-3'>
                        <NavLink to="/utilisateurs" activeClassName="active" className="link">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.5 13C15.3 13 13.43 13.34 12 14C10.57 13.33 8.7 13 7.5 13C5.33 13 1 14.08 1 16.25V19H23V16.25C23 14.08 18.67 13 16.5 13ZM12.5 17.5H2.5V16.25C2.5 15.71 5.06 14.5 7.5 14.5C9.94 14.5 12.5 15.71 12.5 16.25V17.5ZM21.5 17.5H14V16.25C14 15.79 13.8 15.39 13.48 15.03C14.36 14.73 15.44 14.5 16.5 14.5C18.94 14.5 21.5 15.71 21.5 16.25V17.5ZM7.5 12C9.43 12 11 10.43 11 8.5C11 6.57 9.43 5 7.5 5C5.57 5 4 6.57 4 8.5C4 10.43 5.57 12 7.5 12ZM7.5 6.5C8.6 6.5 9.5 7.4 9.5 8.5C9.5 9.6 8.6 10.5 7.5 10.5C6.4 10.5 5.5 9.6 5.5 8.5C5.5 7.4 6.4 6.5 7.5 6.5ZM16.5 12C18.43 12 20 10.43 20 8.5C20 6.57 18.43 5 16.5 5C14.57 5 13 6.57 13 8.5C13 10.43 14.57 12 16.5 12ZM16.5 6.5C17.6 6.5 18.5 7.4 18.5 8.5C18.5 9.6 17.6 10.5 16.5 10.5C15.4 10.5 14.5 9.6 14.5 8.5C14.5 7.4 15.4 6.5 16.5 6.5Z" fill="white" />
                            </svg>

                            <span>Utilisateurs</span>
                        </NavLink>
                    </div>
                    <div className='my-3'>
                        <NavLink to="/specialites" activeClassName="active" className="link">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 8H6V15C6 16.1 6.9 17 8 17H17V15H8V8Z" fill="white" />
                                <path d="M20 3H12C10.9 3 10 3.9 10 5V11C10 12.1 10.9 13 12 13H20C21.1 13 22 12.1 22 11V5C22 3.9 21.1 3 20 3ZM20 11H12V7H20V11Z" fill="white" />
                                <path d="M4 12H2V19C2 20.1 2.9 21 4 21H13V19H4V12Z" fill="white" />
                            </svg>
                            <span>Spécialités</span>
                        </NavLink>
                    </div>
                    <div className='my-3'>
                        <NavLink to="/feedback" activeClassName="active" className="link">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 2H4C2.9 2 2.01 2.9 2.01 4L2 22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4.58 16.59L4 17.17V4H20V16ZM11 12H13V14H11V12ZM11 6H13V10H11V6Z" fill="white" />
                            </svg>
                            <span>FeedBack</span>
                        </NavLink>
                    </div>
                </div>
                <div className='ml-4 py-5 mt-auto'>
                    <button className="link LogoutBtn">
                        <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0)">
                                <path d="M15.1325 12.0947H7.65694C7.33522 12.0947 7.07441 11.8283 7.07441 11.4998C7.07441 11.1711 7.33522 10.9048 7.65694 10.9048H15.1321L12.6907 8.07752C12.4786 7.83232 12.501 7.45778 12.7409 7.24103C12.981 7.0241 13.3477 7.04693 13.56 7.29213L16.8545 11.1073C17.0517 11.3349 17.0465 11.6743 16.8525 11.8953L13.5598 15.7077C13.3477 15.9531 12.9808 15.9759 12.7407 15.7588C12.5008 15.542 12.4784 15.1673 12.6905 14.9221L15.1325 12.0947ZM13.1131 18.648C13.1131 18.3193 13.3765 18.053 13.7014 18.053C14.0265 18.053 14.2899 18.3193 14.2899 18.648V21.3137C14.2899 21.777 14.1016 22.1989 13.7997 22.5042C13.4974 22.8096 13.0802 22.9998 12.6224 22.9998H1.66763C1.20949 22.9998 0.792071 22.81 0.489792 22.5046C0.188068 22.1995 0 21.7781 0 21.3137V1.68625C0 1.22206 0.187513 0.800358 0.489422 0.494889C0.791331 0.189608 1.20838 0 1.66763 0H12.6222C13.0811 0 13.498 0.190169 13.7999 0.495264C14.1022 0.80092 14.2897 1.22319 14.2897 1.68625V4.35181C14.2897 4.6803 14.0263 4.94665 13.7012 4.94665C13.3764 4.94665 13.113 4.6803 13.113 4.35181V1.68625C13.113 1.55112 13.0572 1.42702 12.9676 1.33643C12.8784 1.24621 12.7559 1.18987 12.6221 1.18987H1.66763C1.53324 1.18987 1.41051 1.24602 1.32148 1.33624C1.23207 1.42627 1.17672 1.55037 1.17672 1.68625V21.3137C1.17672 21.4493 1.23244 21.573 1.32166 21.6632C1.41125 21.7538 1.53398 21.8101 1.66763 21.8101H12.6222C12.7555 21.8101 12.8779 21.7536 12.9675 21.663C13.0572 21.5724 13.1131 21.4485 13.1131 21.3137V18.648Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect width="17" height="23" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        )
    }
}

export default SideBar;