import React from 'react'
import Breadcrumb from './Breadcrumb';
import '../styles.css';
import axios from 'axios';

class Reponse extends React.Component {
    render() {
        return (
            (this.props.keyReponse[0] === 'r') ?
                <div className='row mx-5 w-75 '>
                    <div className='w-100 d-flex justify-content-between'>
                        <span className='ReponseHeader my-2'>
                            {'Reponse ' + this.props.keyReponse[this.props.keyReponse.length - 1] + ":"}
                        </span>
                        <button className='mx-3' data-toggle="modal" data-question={this.props.keyQuestion} data-reponse={this.props.keyReponse} data-target="#ModifReponseModal">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.125 17.9687V21.875H7.03125L18.5521 10.3542L14.6458 6.44792L3.125 17.9687ZM6.16667 19.7917H5.20833V18.8333L14.6458 9.39583L15.6042 10.3542L6.16667 19.7917ZM21.5729 5.86458L19.1354 3.42708C18.9271 3.21875 18.6667 3.125 18.3958 3.125C18.125 3.125 17.8646 3.22917 17.6667 3.42708L15.7604 5.33333L19.6667 9.23958L21.5729 7.33333C21.9792 6.92708 21.9792 6.27083 21.5729 5.86458Z" fill="#757575" />
                            </svg>
                        </button>
                    </div>
                    <div className='w-100'>
                        <p className='ReponseTxt text-wrap'>
                            {this.props.value}
                        </p>
                    </div>
                </div>
                : null
        )
    };
}


class Question extends React.Component {
    render() {
        return (
            <div className="row m-2 mt-5 p-2 border border-dark QuestionContainer">
                <div className='row mt-2 w-100 align-items-end'>
                    <button className='h-100 ml-auto rounded-pill px-3 text-white' Style="background :#FF6C6C" data-toggle="modal" data-target="#DeleteQuestionModal">
                        Supprimer
                    </button>
                </div>
                <div className='row m-4'>
                    <div className='w-100 d-flex justify-content-between'>
                        <span className='QuestionHeader my-2'>
                            {'Question ' + (this.props.questionKey + 1)}
                        </span>
                        <button className='mx-3' data-toggle="modal" data-question={this.props.questionKey} data-target="#ModifyQuestionModal">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.125 17.9687V21.875H7.03125L18.5521 10.3542L14.6458 6.44792L3.125 17.9687ZM6.16667 19.7917H5.20833V18.8333L14.6458 9.39583L15.6042 10.3542L6.16667 19.7917ZM21.5729 5.86458L19.1354 3.42708C18.9271 3.21875 18.6667 3.125 18.3958 3.125C18.125 3.125 17.8646 3.22917 17.6667 3.42708L15.7604 5.33333L19.6667 9.23958L21.5729 7.33333C21.9792 6.92708 21.9792 6.27083 21.5729 5.86458Z" fill="#757575" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        <p className='QuestionTxt'>
                            {this.props.val.question}
                        </p>
                    </div>
                </div>
                {
                    Object.entries(this.props.val).map(([key, value], index) =>
                        value ? <Reponse key={index} value={value} keyReponse={key} keyQuestion={this.props.questionKey} /> : null
                    )
                }
                <div className='row my-3 mx-5 w-100 justify-content-between'>
                    <strong className='my-2 CorrecAnswerTxt'>
                        {'La bonne réponse : Reponse ' + this.props.val.correct}
                    </strong>
                    <button className='mx-3' data-toggle="modal" data-question={this.props.questionKey} data-target="#ModifCorrectModal">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.125 17.9687V21.875H7.03125L18.5521 10.3542L14.6458 6.44792L3.125 17.9687ZM6.16667 19.7917H5.20833V18.8333L14.6458 9.39583L15.6042 10.3542L6.16667 19.7917ZM21.5729 5.86458L19.1354 3.42708C18.9271 3.21875 18.6667 3.125 18.3958 3.125C18.125 3.125 17.8646 3.22917 17.6667 3.42708L15.7604 5.33333L19.6667 9.23958L21.5729 7.33333C21.9792 6.92708 21.9792 6.27083 21.5729 5.86458Z" fill="#757575" />
                        </svg>
                    </button>
                </div>
            </div>
        )
    };
}

class Quizz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            choice: 3,
            Quizz: {
                valid: 0,
                id: 1,
                name: 'Quizz 1',
                questions: []
            }
        }
    }

    AjouterChoix = () => {
        // window.$('#SelectCorrect').append(`<option value="${this.state.choice}" data-choix='${this.state.choice}' id='Option${this.state.choice}'>Choix ${this.state.choice}</option>`);
        window.$('#SelectCorrectToADD').append(`<option value="${this.state.choice}" id='Option${this.state.choice}'>Reponse ${this.state.choice}</option>`);
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

    componentDidMount() {
        axios.get("/quiz/" + this.props.match.params.id_quiz)
            .then(res => {
                console.log(res.data)
                this.setState({ Quizz: res.data });
                window.$('.modal').on('show.bs.modal', () => {
                    window.$("input[type!='submit']").val('');
                    var forms = document.getElementsByClassName('needs-validation');
                    Array.prototype.filter.call(forms, function (form) {
                        form.classList.remove('was-validated');
                    });
                })
                window.$('#ModifyQuestionModal').on('show.bs.modal', (event) => {
                    let button = window.$(event.relatedTarget).data('question')
                    window.$('#ModifyQuestionModalLabel').text('Modifier la question ' + (button + 1));
                    window.$('#TempQuestion').val(this.state.Quizz.questions[button].question);
                    window.$('.submitTitre').attr('disabled', "");
                })
                window.$('#ModifReponseModal').on('show.bs.modal', (event) => {
                    let question = window.$(event.relatedTarget).data('question');
                    let reponse = window.$(event.relatedTarget).data('reponse');
                    window.$('#ModifReponseModalLabel').text('Modifier la reponse ' + reponse[7] + ' du question ' + (question + 1));
                    window.$('#TempReponse').val(this.state.Quizz.questions[question][reponse]);
                    window.$('.submitTitre').attr('disabled', "");
                })
                window.$('#ModifyTitreModal').on('show.bs.modal', () => {
                    window.$('#TempTitle').val(this.state.Quizz.name)
                    window.$('.submitTitre').attr('disabled', "");
                })
                window.$('#ModifCorrectModal').on('show.bs.modal', (event) => {
                    window.$('.submitTitre').attr('disabled', "");
                    let button = window.$(event.relatedTarget).data('question')
                    window.$('#ModifCorrectModalLabel').text('Modifier la bonne reponse du question ' + (button + 1));
                    let question = this.state.Quizz.questions[button]
                    window.$('#SelectCorrect').empty()
                    Object.entries(question).map(([key, value]) =>
                        (key[0] === 'r') ?
                            window.$('#SelectCorrect').append(`<option value="${key[7]}" id='Option${this.state.choice}' ${key[7] === this.state.Quizz.questions[button].correct.toString() ? "selected" : ""} >Reponse ${key[7]}</option>`)
                            : null
                    )
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
                window.$('#AddQuestionModal').submit((event) => {
                    if (!window.$('#SelectCorrectToADD').val()) {
                        window.$('#SelectCorrectToADD').get(0).setCustomValidity('Invalid');
                        // event.preventDefault();
                    }
                })
            })

    }

    render() {
        return (
            <>
                <Breadcrumb Title={[this.props.location.aboutProps.name, this.props.location.aboutProps.nameS, this.props.location.aboutProps.nameD,this.props.location.aboutProps.nameQ]} />
                <div className='container'>
                    <div className='row justify-content-between mx-3 my-5'>
                        <div className='w-25 d-flex border-dark justify-content-between border-bottom'>
                            <h3 className='DocumentTitleHeader d-inline '>
                                {this.state.Quizz.name}
                            </h3>
                            <button className='' data-toggle="modal" data-target="#ModifyTitreModal">
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.125 17.9687V21.875H7.03125L18.5521 10.3542L14.6458 6.44792L3.125 17.9687ZM6.16667 19.7917H5.20833V18.8333L14.6458 9.39583L15.6042 10.3542L6.16667 19.7917ZM21.5729 5.86458L19.1354 3.42708C18.9271 3.21875 18.6667 3.125 18.3958 3.125C18.125 3.125 17.8646 3.22917 17.6667 3.42708L15.7604 5.33333L19.6667 9.23958L21.5729 7.33333C21.9792 6.92708 21.9792 6.27083 21.5729 5.86458Z" fill="#757575" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            <button className='h-100 mx-2 rounded-pill px-3 text-white' Style="background :#FF6C6C" data-toggle="modal" data-target="#DeleteQuizzModal">
                                Supprimer
                            </button>
                            {
                                this.state.Quizz.valider==0 ?
                                    <button className='h-100 mx-2 rounded-pill px-3 text-white' Style="background :#4CD071" data-toggle="modal" data-target="#ValidQuizzModal">
                                        Valider
                                    </button> : null
                            }
                        </div>
                    </div>
                    {
                        this.state.Quizz.questions.map((val, questionIndex) =>
                            <Question key={questionIndex} questionKey={questionIndex} val={val} />
                        )
                    }
                    <div className='row justify-content-end'>
                        <button id='AddDoc' className='my-4 mx-4 w-25 d-flex align-items-center justify-content-center' data-toggle="modal" data-target="#AddQuestionModal">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5707 0H20.4291C20.8619 0 21.2547 0.17653 21.539 0.46084C21.8235 0.74515 21.9998 1.13813 21.9998 1.57069V20.4291C21.9998 20.8617 21.8235 21.2545 21.539 21.539C21.2547 21.8233 20.8619 21.9998 20.4291 21.9998H1.5707C1.13814 21.9998 0.745156 21.8233 0.460844 21.539C0.176531 21.2547 0 20.8617 0 20.4291V1.57069C0 1.13796 0.176531 0.74515 0.460844 0.46084C0.745156 0.17653 1.13814 0 1.5707 0ZM10.362 5.52363C10.362 5.17129 10.6477 4.88555 10.9999 4.88555C11.3524 4.88555 11.6378 5.17129 11.6378 5.52363V10.3619H16.4761C16.8287 10.3619 17.1141 10.6477 17.1141 10.9998C17.1141 11.352 16.8285 11.6377 16.4761 11.6377H11.638V16.476C11.638 16.8285 11.3523 17.1139 11.0001 17.1139C10.6479 17.1139 10.3622 16.8284 10.3622 16.476V11.6379H5.52368C5.17133 11.6379 4.88577 11.3523 4.88577 11C4.88577 10.6477 5.17151 10.3621 5.52368 10.3621H10.362V5.52363ZM20.4291 1.27635H1.5707C1.49031 1.27635 1.41691 1.30965 1.36319 1.36318C1.30948 1.41689 1.27618 1.4903 1.27618 1.57069V20.4291C1.27618 20.5093 1.30948 20.5829 1.36319 20.6366C1.41691 20.6902 1.49031 20.7235 1.5707 20.7235H20.4291C20.5095 20.7235 20.5831 20.69 20.6366 20.6366C20.6903 20.5829 20.7236 20.5093 20.7236 20.4291V1.57069C20.7236 1.4903 20.6902 1.41689 20.6366 1.36318C20.5833 1.30965 20.5097 1.27635 20.4291 1.27635Z" fill="#57B6FB" />
                            </svg>
                            <span className='ml-2 AddDoc'>
                                Ajouter une question
                            </span>
                        </button>
                    </div>
                    <form className="modal fade needs-validation" noValidate id="ModifyTitreModal" tabIndex="-1" aria-labelledby="ModifyTitreModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModifyTitreModalLabel">Modifier le nom du quiz</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input className='rounded p-2 px-2 w-75 form-control' onChange={() => window.$('.submitTitre').removeAttr('disabled')} autoComplete='off' id='TempTitle' autoFocus={true} required />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary submitTitre" >Modifier</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="modal fade" id="DeleteQuizzModal" tabIndex="-1" aria-labelledby="DeleteQuizzModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="DeleteQuizzModalLabel">Supprimer quiz</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <span>
                                        voulez-vous vraiment supprimer ce quiz ?
                                    </span>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-danger" >Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="modal fade" id="DeleteQuestionModal" tabIndex="-1" aria-labelledby="DeleteQuestionModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="DeleteQuestionModalLabel">Supprimer question</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <span>
                                        voulez-vous vraiment supprimer cette question ?
                                    </span>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-danger" >Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="modal fade needs-validation" noValidate id="ModifyQuestionModal" tabIndex="-1" aria-labelledby="ModifyQuestionModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModifyQuestionModalLabel">Quesion</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <textarea className='rounded p-2 px-2 form-control' onChange={() => window.$('.submitTitre').removeAttr('disabled')} rows="6" Style='resize:none;' id='TempQuestion' autoFocus={true} required />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary submitTitre" >Modifier</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="modal fade needs-validation" noValidate id="ModifReponseModal" tabIndex="-1" aria-labelledby="ModifReponseModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModifReponseModalLabel">Reponse</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <textarea className='rounded p-2 px-2 form-control' onChange={() => window.$('.submitTitre').removeAttr('disabled')} rows="3" Style='resize:none;' id='TempReponse' autoFocus={true} required />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary submitTitre" >Modifier</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="modal fade needs-validation" noValidate id="ModifCorrectModal" tabIndex="-1" aria-labelledby="ModifCorrectModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModifCorrectModalLabel">Correct</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="SelectCorrect">La bonne reponse :</label>
                                        <select className="form-control" id="SelectCorrect" required onChange={() => window.$('.submitTitre').removeAttr('disabled')} >
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary submitTitre" >Modifier</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="modal fade needs-validation" noValidate id="AddQuestionModal" tabIndex="-1" aria-labelledby="AddQuestionModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="AddQuestionModalLabel">Ajouter une question</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div id='Choices'>
                                        <textarea id='QuestionText' placeholder='Question' className='form-control my-2' rows='3' Style='resize:none;' required />
                                        <input className='form-control my-2 w-75' placeholder='Choix 1..' id='choix1' autoComplete='off' required />
                                        <input className='form-control my-2 w-75' placeholder='Choix 2..' id='choix2' autoComplete='off' required />
                                    </div>
                                    {
                                        this.state.choice <= 4 ?
                                            <button type='button' id='AddDoc' className='my-4 mx-4  d-flex align-items-center justify-content-center ml-auto' onClick={this.AjouterChoix}>
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
                                        <select className="form-control" defaultValue={'0'} id="SelectCorrectToADD" onChange={() => window.$('#SelectCorrectToADD').get(0).setCustomValidity('')} required >
                                            <option value='0' disabled  > Choisir la bonne reponse</option>
                                            <option value="1" >Reponse 1</option>
                                            <option value="2">Reponse 2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type='submit' className="btn btn-primary" >Ajouter</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="modal fade" id="ValidQuizzModal" tabIndex="-1" aria-labelledby="ValidQuizzModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ValidQuizzModalLabel">Validation de quiz</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <span>
                                        Ce quiz n'est pas encore valider, voulez-vous le valider ? ( Valider signifie qu'il sera visible par tous les utilisateurs )
                                    </span>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success" >Valider</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal" >Non, pas maintenant</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }

}

export default Quizz;
