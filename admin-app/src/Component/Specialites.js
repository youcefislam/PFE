import React from 'react';
import Breadcrumb from './Breadcrumb';
import '../styles.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Specialites extends React.Component {

    
    constructor(props) {
        super(props);
        this.colors = [{
            header: "#40CE5F",
            body: '#30FF5D',
            cards: '#52C66C'
        }, {
            header: "#CE408D",
            body: '#FF30A0',
            cards: '#C6527C'
        }, {
            header: "#4092CE",
            body: '#30A8FF',
            cards: '#5273C6'
        }, {
            header: "#B240CE",
            body: '#BD30FF',
            cards: '#9A52C6'
        }, {
            header: "#CE4040",
            body: '#FF3030',
            cards: '#C65252'
        }]
        this.currentColor = -1;
        this.state = {
            specialities: [
            ],
            ToShowData: []
        }
    }


    SousSpecilaite = ({ sspecialite, colors, Sname}) => {
        return (
            <NavLink to={{
                pathname:"/specialites/" + sspecialite.id,
                aboutProps:{
                    name:sspecialite.name,
                    nameS:Sname
                }
            }} >
                <button Style={"background-color: " + colors.cards + ";"} className='SousSpecialiteCardContainer d-flex flex-row mx-auto my-3'>
                    <div className='ImageSSpecialite'>
                        <img src={"http://localhost:3000"+sspecialite.photo} alt="specialite Photo" Style="width:100%;height:100%;object-fit: cover;border-radius: 15px 0 15px 15px;" />
                    </div>
                    <div className='SSpecialiteName'>
                        {sspecialite.name}
                    </div>
                </button>
            </NavLink>
        );
    }


    Specialite = ({ specialite, colors }) => {
        return (
            <div className='col-lg-6 col-xl-4 p-3 SpecialiteCardContainer'>
                <div Style={"background-color: " + colors.body} className="h-100 SpecialiteCard d-flex flex-column">
                    <div Style={`background-color:  ${colors.header};`} className='SpecialiteCardHeader d-flex align-items-center p-3'>
                        <span className='SpecialiteHeaderTxt'>{specialite.name.substr(0, 30) + (specialite.name.length > 30 ? ".." : '')}</span>
                        <button className='ml-auto' data-toggle="modal" data-name={specialite.name} data-nbrss={specialite.nbrSs} data-nbrdocument={specialite.nbrDocument} data-nbrflowers={specialite.nbrFlowers} data-target="#InfoSpeicialiteModal">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="white" />
                            </svg>
                        </button>
                    </div>
                    <div className='SpecialiteCardBody'>
                        {
                            specialite.sousSpecialities.map((sspecialite, index) => <this.SousSpecilaite key={index} sspecialite={sspecialite} colors={colors} Sname={specialite.name} />)
                        }
                    </div>
                    <div className='SpecialiteCardFooter d-flex align-items-center justify-content-center'>
                        <button className='SpecialityFooterTxt p-2' data-toggle="modal" data-target="#AddSSpecialiteModal">
                            <svg className='mx-2' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.71349 0H22.2863C22.7584 0 23.1869 0.192578 23.4971 0.502734C23.8074 0.812891 23.9998 1.2416 23.9998 1.71348V22.2863C23.9998 22.7582 23.8074 23.1867 23.4971 23.4971C23.1869 23.8072 22.7584 23.9998 22.2863 23.9998H1.71349C1.24161 23.9998 0.812897 23.8072 0.502738 23.4971C0.19258 23.1869 0 22.7582 0 22.2863V1.71348C0 1.24141 0.19258 0.812891 0.502738 0.502734C0.812897 0.192578 1.24161 0 1.71349 0ZM11.304 6.02578C11.304 5.64141 11.6157 5.32969 11.9999 5.32969C12.3845 5.32969 12.6958 5.64141 12.6958 6.02578V11.3039H17.974C18.3585 11.3039 18.6699 11.6156 18.6699 11.9998C18.6699 12.384 18.3584 12.6957 17.974 12.6957H12.696V17.9738C12.696 18.3584 12.3843 18.6697 12.0001 18.6697C11.6159 18.6697 11.3042 18.3582 11.3042 17.9738V12.6959H6.02583C5.64145 12.6959 5.32993 12.3844 5.32993 12C5.32993 11.6156 5.64165 11.3041 6.02583 11.3041H11.304V6.02578ZM22.2863 1.39238H1.71349C1.62579 1.39238 1.54572 1.42871 1.48712 1.48711C1.42853 1.5457 1.3922 1.62578 1.3922 1.71348V22.2863C1.3922 22.3738 1.42853 22.4541 1.48712 22.5127C1.54572 22.5711 1.62579 22.6074 1.71349 22.6074H22.2863C22.374 22.6074 22.4543 22.5709 22.5127 22.5127C22.5713 22.4541 22.6076 22.3738 22.6076 22.2863V1.71348C22.6076 1.62578 22.5711 1.5457 22.5127 1.48711C22.4545 1.42871 22.3742 1.39238 22.2863 1.39238Z" fill="white" />
                            </svg>
                            Ajouté une Sous - spécialité
                        </button>
                    </div>
                </div>
            </div>
        )
    }


    chooseImg = (event) => {
        if (event.target.files[0]) {
            window.$('#ImageName').text(event.target.files[0].name.substr(0, 20) + '..')
        }
    }

    SearhValue = () => {
        let val = window.$('#SearchInput').val();
        let listTemp = val ? this.state.specialities.filter(value => (value.name.toLowerCase().search(val.toLowerCase()) !== -1)) : this.state.specialities;
        this.setState({ ToShowData: listTemp })
    }

    componentDidMount() {
        axios.get("/speicialites")
            .then(res => {
                this.setState({ ToShowData: res.data, specialities: res.data })
                window.$('#InfoSpeicialiteModal').on('show.bs.modal', function (event) {
                    var modal = window.$(this);
                    var button = window.$(event.relatedTarget)
                    modal.find('.infoModalTitle').text(button.data('name'));
                    modal.find('.modal-title-input').attr('placeholder', button.data('name'))
                    window.$("#modify").removeClass('d-none');
                    window.$('#submit').addClass('d-none');
                    window.$('.modal-title-input').addClass('d-none');
                    window.$('.modal-title').removeClass('d-none');
                    modal.find('#SSpecialiteLable').text(button.data('nbrss') + ' Sous-spécialités');
                    modal.find('#nbrDocument').text(button.data('nbrdocument') + ' Documents');
                    modal.find('#nbrFlowers').text(button.data('nbrflowers') + ' suiveurs/suiveuses');
                    window.$('.ModifyTitle').attr('disabled', "");
                })
                window.$('.modal').on('show.bs.modal', function (event) {
                    window.$("input[type!='submit']").val('');
                    window.$("#ImageName").text('Ajouter une photo..');
                })
                var forms = document.getElementsByClassName('needs-validation');
                Array.prototype.filter.call(forms, function (form) {
                    form.addEventListener('submit', function (event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
            });
    }

    modify = () => {
        window.$("#modify").addClass('d-none');
        window.$('#submit').removeClass('d-none');
        window.$('.modal-title-input').removeClass('d-none');
        window.$('.infoModalTitle').addClass('d-none')
    }

    render() {
        return (
            <>
                <Breadcrumb Title={['Spécialités']} />
                <div className="continer">
                    <div className='my-4 mx-4 position-relative w-50'>
                        <input className='form-control w-100 px-4 pr-5  rounded-pill' onInput={this.SearhValue} id='SearchInput' type="text" placeholder='Rechercher..' />
                        <span className='SearchSvg'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.45178 0.381409C8.2334 0.381409 9.84611 1.04928 11.0137 2.12913C12.1812 3.20899 12.9033 4.7007 12.9033 6.34852C12.9033 7.93038 12.2378 9.36813 11.1519 10.436C11.1716 10.4495 11.1907 10.4644 11.2087 10.481L15.8534 14.7709C16.0479 14.9498 16.049 15.241 15.8553 15.4211C15.6618 15.6011 15.3469 15.6019 15.1524 15.4229L10.5077 11.133C10.4782 11.1059 10.4532 11.0762 10.4326 11.0447C9.33591 11.8409 7.9538 12.3157 6.45165 12.3157C4.67003 12.3157 3.05705 11.6479 1.88951 10.568C0.722102 9.48817 0 7.99633 0 6.34852C0 4.7007 0.722102 3.20899 1.88964 2.12913C3.05718 1.0494 4.67016 0.381409 6.45178 0.381409ZM10.2924 2.79638C9.30948 1.88733 7.95166 1.32505 6.45178 1.32505C4.9519 1.32505 3.59395 1.88733 2.61108 2.79638C1.6282 3.70544 1.02026 4.96128 1.02026 6.34852C1.02026 7.73575 1.6282 8.99171 2.61108 9.90077C3.59382 10.8098 4.95176 11.3721 6.45178 11.3721C7.95166 11.3721 9.30948 10.8098 10.2924 9.90077C11.2752 8.99184 11.8832 7.73588 11.8832 6.34852C11.8832 4.96128 11.2752 3.70544 10.2924 2.79638Z" fill="#C1C1C1" />
                            </svg>
                        </span>
                    </div>
                    <div className='row justify-content-center mx-3'>
                        {

                            this.state.ToShowData.map((specialite, index) => {
                                this.currentColor++;
                                if (this.currentColor === this.colors.length) this.currentColor = 0;
                                return (
                                    <this.Specialite key={index} specialite={specialite} colors={this.colors[this.currentColor]} />
                                )
                            })
                        }
                        <div className='col-lg-6 col-xl-4 p-4 SpecialiteCardContainer'>
                            <button className="h-100 w-100 AddSpecialiteCard" data-toggle="modal" data-target="#AddSpecialiteModal">
                                <div className='h-100 d-flex flex-column align-items-center justify-content-center'>
                                    <svg className='my-4' width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.71349 0H22.2863C22.7584 0 23.1869 0.192578 23.4971 0.502734C23.8074 0.812891 23.9998 1.2416 23.9998 1.71348V22.2863C23.9998 22.7582 23.8074 23.1867 23.4971 23.4971C23.1869 23.8072 22.7584 23.9998 22.2863 23.9998H1.71349C1.24161 23.9998 0.812897 23.8072 0.502738 23.4971C0.19258 23.1869 0 22.7582 0 22.2863V1.71348C0 1.24141 0.19258 0.812891 0.502738 0.502734C0.812897 0.192578 1.24161 0 1.71349 0ZM11.304 6.02578C11.304 5.64141 11.6157 5.32969 11.9999 5.32969C12.3845 5.32969 12.6958 5.64141 12.6958 6.02578V11.3039H17.974C18.3585 11.3039 18.6699 11.6156 18.6699 11.9998C18.6699 12.384 18.3584 12.6957 17.974 12.6957H12.696V17.9738C12.696 18.3584 12.3843 18.6697 12.0001 18.6697C11.6159 18.6697 11.3042 18.3582 11.3042 17.9738V12.6959H6.02583C5.64145 12.6959 5.32993 12.3844 5.32993 12C5.32993 11.6156 5.64165 11.3041 6.02583 11.3041H11.304V6.02578ZM22.2863 1.39238H1.71349C1.62579 1.39238 1.54572 1.42871 1.48712 1.48711C1.42853 1.5457 1.3922 1.62578 1.3922 1.71348V22.2863C1.3922 22.3738 1.42853 22.4541 1.48712 22.5127C1.54572 22.5711 1.62579 22.6074 1.71349 22.6074H22.2863C22.374 22.6074 22.4543 22.5709 22.5127 22.5127C22.5713 22.4541 22.6076 22.3738 22.6076 22.2863V1.71348C22.6076 1.62578 22.5711 1.5457 22.5127 1.48711C22.4545 1.42871 22.3742 1.39238 22.2863 1.39238Z" fill="white" />
                                    </svg>
                                    <span className='AddSpecialiteTxt'>Ajouté une spécialité</span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <form className="modal fade needs-validation" noValidate id="InfoSpeicialiteModal" tabIndex="-1" aria-labelledby="InfoSpeicialiteModalLabel" aria-hidden="true" action="/specialites"  >
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title infoModalTitle" id="InfoSpeicialiteModalLabel">specialité</h5>
                                    <input className='d-none form-control rounded-pill p-1 px-2 w-50 modal-title-input' onChange={() => window.$('.ModifyTitle').removeAttr('disabled')} autoFocus={true} autoComplete='off' required />
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div id='SSpecialiteLable'></div>
                                    <div id='nbrDocument'></div>
                                    <div id='nbrFlowers'></div>
                                </div>
                                <div className="modal-footer">
                                    <input type="submit" value='Sauvgarder' className="btn btn-primary mr-auto d-none ModifyTitle" id='submit' />
                                    <button type="button" id='modify' className="btn btn-primary mr-auto" onClick={this.modify} >Modifier</button>
                                    <button type="button" className="btn btn-danger" >Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="modal fade needs-validation" noValidate id="AddSpecialiteModal" tabIndex="-1" aria-labelledby="AddSpecialiteModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="AddSpecialiteModalLabel">Ajouter une Spécialité</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input className='rounded p-2 px-2 w-75 form-control' autoComplete='off' placeholder="Nom" autoFocus={true} required />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" >Ajouter</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="modal fade needs-validation" noValidate id="AddSSpecialiteModal" tabIndex="-1" aria-labelledby="AddSSpecialiteModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="AddSSpecialiteModalLabel">Ajouter une Sous-spécialité</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input name="SspecialiteName" autoComplete='off' className='rounded p-2 px-2 w-75 form-control' placeholder="Nom" autoFocus={true} required />
                                    <div className='rounded-pill w-75 mx-auto bg-light my-3'>
                                        <input name="image" type="file" id='image' accept='image/*' className='form-control-file m-2 d-none' onChange={this.chooseImg} required ></input>
                                        <label htmlFor="image" id='ImageInput' className='d-flex text-secondary justify-content-between mx-auto p-2 px-2 overflow-hidden' >
                                            <span id='ImageName'>
                                                Ajouter Une Photo
                                            </span>
                                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 5V7.99C16 7.99 14.01 8 14 7.99V5H11C11 5 11.01 3.01 11 3H14V0H16V3H19V5H16ZM13 9V6H10V3H2C0.9 3 0 3.9 0 5V17C0 18.1 0.9 19 2 19H14C15.1 19 16 18.1 16 17V9H13ZM2 17L5 13L7 16L10 12L14 17H2Z" fill="#A3A3A3" />
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" >Ajouter</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default Specialites;