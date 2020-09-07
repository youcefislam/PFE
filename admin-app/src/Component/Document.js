import React from 'react';
import Breadcrumb from './Breadcrumb';
import '../styles.css';
import { NavLink } from 'react-router-dom';



class Document extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            QuizzJson: {
                Questions: []
            },
            nameFile: 'Ajouter Un Fichier',
            document: {
                id: 1,
                name: 'Document 1',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae gravida leo. Suspendisse consequat egestas pretium. Quisque ultrices lorem at massa tincidunt, sit amet venenatis quam dictum. Nunc elit tortor, blandit eu bibendum sed, facilisis et purus. Cras pulvinar felis sed libero tristique, non accumsan turpis faucibus. Nullam vulputate arcu sit amet laoreet porttitor. Duis scelerisque ligula eu augue molestie aliquet. Donec posuere dictum lacinia',
                path: 'www.localhost.com/3000/public/Documents/document1.pdf',
                quizz: [{
                    id: 1,
                    name: 'Quizz 1',
                    rate: 5,
                    nbrRates: 9999,
                    valider: true
                }, {
                    id: 2,
                    name: 'Quizz 2',
                    rate: 5,
                    nbrRates: 9999,
                    valider: false
                }, {
                    id: 3,
                    name: 'Quizz 3',
                    rate: 5,
                    nbrRates: 9999,
                    valider: false
                }, {
                    id: 4,
                    name: 'Quizz 4',
                    rate: 5,
                    nbrRates: 9999
                }, {
                    id: 5,
                    name: 'Quizz 5',
                    rate: 5,
                    nbrRates: 9999,
                    valider: true
                }, {
                    id: 6,
                    name: 'Quizz 6',
                    rate: 5,
                    nbrRates: 9999,
                    valider: true
                }]
            },
            choice: 3,
            nbrQuestion: 0
        }
        this.addQuestions = false;
    }


    AddQuestionsContent = () => {
        return (
            <>
                <div id='Choices'>
                    <textarea id='QuestionText' placeholder='Question' className='form-control my-2' rows='3' Style='resize:none;' required />
                    <input className='form-control my-2 w-75' placeholder='Choix 1..' id='choix1' autoComplete='off' required />
                    <input className='form-control my-2 w-75' placeholder='Choix 2..' id='choix2' autoComplete='off' required />
                </div>
                {
                    this.state.choice <= 4 ?
                        <button id='AddDoc' className='my-4 mx-4  d-flex align-items-center justify-content-center ml-auto' onClick={this.AjouterChoix}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5707 0H20.4291C20.8619 0 21.2547 0.17653 21.539 0.46084C21.8235 0.74515 21.9998 1.13813 21.9998 1.57069V20.4291C21.9998 20.8617 21.8235 21.2545 21.539 21.539C21.2547 21.8233 20.8619 21.9998 20.4291 21.9998H1.5707C1.13814 21.9998 0.745156 21.8233 0.460844 21.539C0.176531 21.2547 0 20.8617 0 20.4291V1.57069C0 1.13796 0.176531 0.74515 0.460844 0.46084C0.745156 0.17653 1.13814 0 1.5707 0ZM10.362 5.52363C10.362 5.17129 10.6477 4.88555 10.9999 4.88555C11.3524 4.88555 11.6378 5.17129 11.6378 5.52363V10.3619H16.4761C16.8287 10.3619 17.1141 10.6477 17.1141 10.9998C17.1141 11.352 16.8285 11.6377 16.4761 11.6377H11.638V16.476C11.638 16.8285 11.3523 17.1139 11.0001 17.1139C10.6479 17.1139 10.3622 16.8284 10.3622 16.476V11.6379H5.52368C5.17133 11.6379 4.88577 11.3523 4.88577 11C4.88577 10.6477 5.17151 10.3621 5.52368 10.3621H10.362V5.52363ZM20.4291 1.27635H1.5707C1.49031 1.27635 1.41691 1.30965 1.36319 1.36318C1.30948 1.41689 1.27618 1.4903 1.27618 1.57069V20.4291C1.27618 20.5093 1.30948 20.5829 1.36319 20.6366C1.41691 20.6902 1.49031 20.7235 1.5707 20.7235H20.4291C20.5095 20.7235 20.5831 20.69 20.6366 20.6366C20.6903 20.5829 20.7236 20.5093 20.7236 20.4291V1.57069C20.7236 1.4903 20.6902 1.41689 20.6366 1.36318C20.5833 1.30965 20.5097 1.27635 20.4291 1.27635Z" fill="#57B6FB" />
                            </svg>
                            <span className='ml-2 AddDoc'>
                                Ajouter Un Choix
                        </span>
                        </button> : null
                }
                <div className="form-group">
                    <label htmlFor="SelectCorrect">La bonne reponse :</label>
                    <select className="form-control" defaultValue={'0'} id="SelectCorrect" required >
                        <option value='0' disabled  > Choisir la bonne reponse</option>
                        <option value="1" >Choix 1</option>
                        <option value="2">Choix 2</option>
                    </select>
                </div>
            </>
        )
    }

    addToListQuestion = () => {
        let data = {};

        let question = window.$('#QuestionText').val()
        if (!question || question.replace(/\s\s+/g, ' ') === ' ') {
            window.$('#QuestionText').addClass('is-invalid');
            return false;
        } else {
            data.question = question.replace(/\s\s+/g, ' ');
            window.$('#QuestionText').removeClass('is-invalid');
        }

        let reponse = window.$('#SelectCorrect').val();
        if (reponse) {
            data.reponse = window.$('#SelectCorrect').val();
            window.$('#SelectCorrect').removeClass('is-invalid');
        }
        else {
            window.$('#SelectCorrect').addClass('is-invalid')
            return false;
        }

        for (let i = 1; i < this.state.choice; i++) {
            let choice = window.$('#choix' + i).val();
            if (!choice || choice.replace(/\s\s+/g, ' ') === ' ') {
                window.$('#choix' + i).addClass('is-invalid')
                return false;
            } else {
                data['choice' + i] = choice.replace(/\s\s+/g, ' ');
                window.$('#choix' + i).removeClass('is-invalid')
            }
            if (i > 2) {
                window.$('#Choice' + i + 'Container').remove();
                window.$('#Option' + i).remove();
            }
        }

        this.state.QuizzJson.Questions.push(data);
        return true;
    }

    suivant = () => {
        if (this.state.nbrQuestion === 0) {
            let titre = window.$('#titreQuizz').val();
            if (titre && titre.replace(/\s\s+/g, ' ') !== ' ') {
                this.setState({ nbrQuestion: this.state.nbrQuestion + 1, QuizzJson: { ...this.state.QuizzJson, titre: titre.replace(/\s\s+/g, ' ') } });
                this.addQuestions = true;
            }
            else window.$('#titreQuizz').addClass('is-invalid')
        } else if (this.state.nbrQuestion > 0) {

            let done = this.addToListQuestion();
            if (done) {
                this.setState({ nbrQuestion: this.state.nbrQuestion + 1, choice: 3 });
                window.$('input').val('').removeClass('is-invalid');
                window.$('select').val("0").removeClass('is-invalid');
                window.$('textarea').val('').removeClass('is-invalid');
            }
        }
    }

    chooseFile = (event) => {
        if (event.target.files[0]) {
            this.setState({ nameFile: event.target.files[0].name });
            window.$('.submitBtn').removeAttr('disabled')
        }
    }

    AjouterChoix = () => {
        window.$('#SelectCorrect').append(`<option value="${this.state.choice}" data-choix='${this.state.choice}' id='Option${this.state.choice}'>Choix ${this.state.choice}</option>`);
        window.$("#Choices").append(`<div id='Choice${this.state.choice}Container' class='d-flex justify-content-between '>
                                <input class='form-control my-2 w-75' placeholder='Choix ${this.state.choice}..' required id='choix${this.state.choice}' autoComplete='off' />
                                <button type="button" data-choix='${this.state.choice}' id='Delete${this.state.choice}' class="close DeleteChoice">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
    
        `);
        window.$(`#Delete${this.state.choice}`).on('click', { dis: this }, function (event) {
            window.$('select option:last-child').remove();
            if (window.$(this).data('choix') === 4 || (window.$(this).data('choix') === 3 && event.data.dis.state.choice === 5)) window.$('#Choice4Container').remove();
            else window.$('#Choice3Container').remove()
            if (event.data.dis.state.choice > 3) event.data.dis.setState(prev => ({ choice: prev.choice - 1 }))
            return null;
        })
        this.setState({ choice: this.state.choice + 1 })
    }


    confirm = () => {
        let done = this.addToListQuestion();
        if (done) {
            window.$('#AddQuizzModal').modal('hide');
            window.$('#ValidateQuizzModal').modal('show');
        }
    }

    componentDidMount() {
        window.$('#AddQuizzModal').on('show.bs.modal', () => {
            this.setState({ nbrQuestion: 0 })
        })
        window.$('.modal').on('show.bs.modal', () => {
            window.$("input[type!='submit']").val('');
            window.$("#NameFile").text('Ajouter un fichier..');
            var forms = document.getElementsByClassName('needs-validation');
            Array.prototype.filter.call(forms, function (form) {
                form.classList.remove('was-validated');
            });
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

        window.$('#ModifyDescriptionModal').on('show.bs.modal', () => {
            window.$('.submitBtn').attr('disabled', "");
            window.$('#TempDescription').val(this.state.document.description);
        })

        window.$('#ModifyTitreModal').on('show.bs.modal', () => {
            window.$('.submitBtn').attr('disabled', "");
            window.$('#TempTitle').val(this.state.document.name)
        })
        window.$('#ModifyFilenModal').on('show.bs.modal', () => {
            window.$('.submitBtn').attr('disabled', "");
        })
        window.$('#ValidateQuizzModal').submit((event) => {
            // var form = window.$(this).closest('form');
            // console.log(form)
            // console.log(event.originalEvent.submitter.dataset.validation);   //this is the value of validation 
            // event.preventDefault();
            // form = form.serializeArray();

            // form = form.concat([
            //     { name: "customer_id", value: window.username },
            //     { name: "post_action", value: "Update Information" }
            // ]);

            // $.post('/change-user-details', form, function (d) {
            //     if (d.error) {
            //         alert("There was a problem updating your user details")
            //     }
            // });
            // $('body').append(form);     
            // $(form).submit();
        })
    }



    render() {
        return (
            <>
                <Breadcrumb Title={['specialités', 'Sous-spécialité 1', 'Document 1']} />
                <div className='container'>
                    <div className='row justify-content-between mx-3 my-5'>
                        <div className='w-25 d-flex border-dark justify-content-between border-bottom'>
                            <h3 className='DocumentTitleHeader d-inline'>
                                {this.state.document.name}
                            </h3>
                            <button data-toggle="modal" data-target="#ModifyTitreModal">
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.125 17.9687V21.875H7.03125L18.5521 10.3542L14.6458 6.44792L3.125 17.9687ZM6.16667 19.7917H5.20833V18.8333L14.6458 9.39583L15.6042 10.3542L6.16667 19.7917ZM21.5729 5.86458L19.1354 3.42708C18.9271 3.21875 18.6667 3.125 18.3958 3.125C18.125 3.125 17.8646 3.22917 17.6667 3.42708L15.7604 5.33333L19.6667 9.23958L21.5729 7.33333C21.9792 6.92708 21.9792 6.27083 21.5729 5.86458Z" fill="#757575" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <button className='h-100 mx-2 rounded-pill px-3 text-white' Style="background :#FF6C6C" data-toggle="modal" data-target="#DeleteDocumentModal">
                                Supprimer
                            </button>
                            <button className='h-100 mx-2 rounded-pill px-3' Style='background :#4CD071;'>
                                <NavLink to={"/specialites/" + this.props.match.params.id_ss + '/' + this.props.match.params.id_doc +'/commentaire/'} className='text-white'>
                                    Commentaires
                            </NavLink>
                            </button>
                        </div>
                    </div>
                    <div className='row m-3'>
                        <div className='w-100 d-flex justify-content-between'>
                            <span className='DescriptionHeader my-2'>
                                Déscription :
                            </span>
                            <button className='mx-3' data-toggle="modal" data-target="#ModifyDescriptionModal">
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.125 17.9687V21.875H7.03125L18.5521 10.3542L14.6458 6.44792L3.125 17.9687ZM6.16667 19.7917H5.20833V18.8333L14.6458 9.39583L15.6042 10.3542L6.16667 19.7917ZM21.5729 5.86458L19.1354 3.42708C18.9271 3.21875 18.6667 3.125 18.3958 3.125C18.125 3.125 17.8646 3.22917 17.6667 3.42708L15.7604 5.33333L19.6667 9.23958L21.5729 7.33333C21.9792 6.92708 21.9792 6.27083 21.5729 5.86458Z" fill="#757575" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <p className='DescriptionTxt'>
                                {this.state.document.description}
                            </p>
                        </div>
                    </div>
                    <div className='row m-3 justify-content-between'>
                        <div>
                            <span className='FichierHeader'>
                                Fichier :
                            </span>
                            <a className='FichierTxt' rel="noopener noreferrer" href={"https://" + this.state.document.path} target="_blank" >
                                <span>
                                    {this.state.document.path}
                                </span>
                            </a>
                        </div>
                        <button className='mx-3' data-toggle="modal" data-target="#ModifyFilenModal">
                            <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.125 17.9687V21.875H7.03125L18.5521 10.3542L14.6458 6.44792L3.125 17.9687ZM6.16667 19.7917H5.20833V18.8333L14.6458 9.39583L15.6042 10.3542L6.16667 19.7917ZM21.5729 5.86458L19.1354 3.42708C18.9271 3.21875 18.6667 3.125 18.3958 3.125C18.125 3.125 17.8646 3.22917 17.6667 3.42708L15.7604 5.33333L19.6667 9.23958L21.5729 7.33333C21.9792 6.92708 21.9792 6.27083 21.5729 5.86458Z" fill="#757575" />
                            </svg>
                        </button>
                    </div>
                    <div className='container'>
                        <div className='row justify-content-between'>
                            <span className='mx-4 my-auto'>
                                Quizz :
                            </span>
                            <button id='AddDoc' className='my-4 mx-4 w-25 d-flex align-items-center justify-content-center' onClick={() => { this.addQuestions = false; this.setState({ choice: 3, QuizzJson: { Questions: [] } }) }} data-toggle="modal" data-target="#AddQuizzModal">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5707 0H20.4291C20.8619 0 21.2547 0.17653 21.539 0.46084C21.8235 0.74515 21.9998 1.13813 21.9998 1.57069V20.4291C21.9998 20.8617 21.8235 21.2545 21.539 21.539C21.2547 21.8233 20.8619 21.9998 20.4291 21.9998H1.5707C1.13814 21.9998 0.745156 21.8233 0.460844 21.539C0.176531 21.2547 0 20.8617 0 20.4291V1.57069C0 1.13796 0.176531 0.74515 0.460844 0.46084C0.745156 0.17653 1.13814 0 1.5707 0ZM10.362 5.52363C10.362 5.17129 10.6477 4.88555 10.9999 4.88555C11.3524 4.88555 11.6378 5.17129 11.6378 5.52363V10.3619H16.4761C16.8287 10.3619 17.1141 10.6477 17.1141 10.9998C17.1141 11.352 16.8285 11.6377 16.4761 11.6377H11.638V16.476C11.638 16.8285 11.3523 17.1139 11.0001 17.1139C10.6479 17.1139 10.3622 16.8284 10.3622 16.476V11.6379H5.52368C5.17133 11.6379 4.88577 11.3523 4.88577 11C4.88577 10.6477 5.17151 10.3621 5.52368 10.3621H10.362V5.52363ZM20.4291 1.27635H1.5707C1.49031 1.27635 1.41691 1.30965 1.36319 1.36318C1.30948 1.41689 1.27618 1.4903 1.27618 1.57069V20.4291C1.27618 20.5093 1.30948 20.5829 1.36319 20.6366C1.41691 20.6902 1.49031 20.7235 1.5707 20.7235H20.4291C20.5095 20.7235 20.5831 20.69 20.6366 20.6366C20.6903 20.5829 20.7236 20.5093 20.7236 20.4291V1.57069C20.7236 1.4903 20.6902 1.41689 20.6366 1.36318C20.5833 1.30965 20.5097 1.27635 20.4291 1.27635Z" fill="#57B6FB" />
                                </svg>
                                <span className='ml-2 AddDoc'>
                                    Ajouter Un Quizz
                            </span>
                            </button>
                        </div>
                        {
                            this.state.document.quizz.length > 0 ?
                                this.state.document.quizz.map((val, index) =>
                                    <NavLink key={index} to={"/specialites/" + this.props.match.params.id_ss + '/' + this.props.match.params.id_doc + '/' + val.id} className='row p-2 my-2'>
                                        <button className='documentContainer d-flex w-100 p-3  flex-column flex-lg-row align-items-center justify-content-lg-between'>
                                            <div>
                                                <strong className='DocumentTxt text-bold'>
                                                    {val.name}
                                                </strong>
                                            </div>
                                            <div className='d-flex flex-column flex-lg-row'>
                                                {
                                                    val.valider ? null :
                                                        <span className='mx-3 DocumentTxt pasValider font-weight-normal'>
                                                            Pas encore valider
                                                        </span>
                                                }
                                                <span className='mx-3 DocumentTxt font-weight-normal'>
                                                    {'Rate :' + val.rate}
                                                </span>
                                                <span className='mx-3 DocumentTxt font-weight-normal'>
                                                    {'Nombre de noteurs :' + val.nbrRates}
                                                </span>
                                            </div>
                                        </button>
                                    </NavLink>
                                ) :
                                <div className='text-center display-4 text-muted '>
                                    No Result
                            </div>
                        }
                    </div>
                    <form className="modal fade needs-validation" noValidate id="ModifyTitreModal" tabIndex="-1" aria-labelledby="ModifyTitreModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModifyTitreModalLabel">Modifier le titre du document</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input className='rounded p-2 px-2 w-75 form-control' id='TempTitle' onChange={() => window.$('.submitBtn').removeAttr('disabled')} autoComplete='off' autoFocus={true} required />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary submitBtn" >Modifier</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="modal fade needs-validation" noValidate id="ModifyDescriptionModal" tabIndex="-1" aria-labelledby="ModifyDescriptionModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModifyDescriptionModalLabel">Modifier la déscription du document</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <textarea className='rounded p-2 px-2 form-control' rows="6" Style='resize:none;' onChange={() => window.$('.submitBtn').removeAttr('disabled')} id='TempDescription' autoFocus={true} required />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary submitBtn" >Modifier</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="modal fade needs-validation" noValidate id="ModifyFilenModal" tabIndex="-1" aria-labelledby="ModifyFilenModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModifyFilenModalLabel">Modifier le fichier du document</h5>
                                    <button type="button" className="close" data-dismiss="modasupprimerl" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className='rounded-pill w-75 mx-auto bg-light my-3'>
                                        <input name="file" type="file" id='filePdf' className='form-control-file m-2 d-none' onChange={this.chooseFile} required ></input>
                                        <label htmlFor="filePdf" id='ImageInput' className='d-flex text-secondary justify-content-between mx-auto p-2 px-2 overflow-hidden'>
                                            <span id='#NameFile' >
                                                {this.state.nameFile.substr(0, 20) + '..'}
                                            </span>
                                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 5V7.99C16 7.99 14.01 8 14 7.99V5H11C11 5 11.01 3.01 11 3H14V0H16V3H19V5H16ZM13 9V6H10V3H2C0.9 3 0 3.9 0 5V17C0 18.1 0.9 19 2 19H14C15.1 19 16 18.1 16 17V9H13ZM2 17L5 13L7 16L10 12L14 17H2Z" fill="#A3A3A3" />
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary submitBtn" >Modifier</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="modal fade" id="DeleteDocumentModal" tabIndex="-1" aria-labelledby="DeleteDocumentModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="DeleteDocumentModalLabel">Supprimer document</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <span>
                                        voulez-vous vraiment supprimer ce document ?
                                    </span>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-danger" >Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="modal fade" id="AddQuizzModal" tabIndex="-1" aria-labelledby="AddQuizzModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="AddQuizzModalLabel">{!this.addQuestions ? 'Ajouter Un Quizz' : `Ajouter question numéro ${this.state.QuizzJson.Questions.length + 1}`}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {
                                        !this.addQuestions ?
                                            <input className='form-control w-75' placeholder='Titre' id='titreQuizz' autoComplete='off' /> :
                                            <div id='AddQuestionsContainer'>
                                                <this.AddQuestionsContent />
                                            </div>
                                    }
                                </div>
                                <div className="modal-footer">
                                    {
                                        this.state.nbrQuestion >= 2 ?
                                            <button type="button" className="btn btn-success mr-auto" onClick={this.confirm}>confirmer</button>
                                            : null
                                    }
                                    <button type='button' className="btn btn-primary" onClick={this.suivant} >Ajouter une question</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className="modal fade" id="ValidateQuizzModal" tabIndex="-1" aria-labelledby="ValidateQuizzModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ValidateQuizzModalLabel">Validating Quizz</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <span>
                                        voulez-vous valider ce quiz ? ( Valider signifie qu'il sera visible par tous les utilisateurs )
                                    </span>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success" data-validation='true'  >Valider</button>
                                    <button type="submit" className="btn btn-secondary" data-validation='false' >Ne pas valider</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </>
        )
    }
}

export default Document;