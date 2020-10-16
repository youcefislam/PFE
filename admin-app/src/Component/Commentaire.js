import React from 'react';
import Breadcrumb from './Breadcrumb';
import '../styles.css';
import axios from 'axios';

class Comment extends React.Component {
    render() {
        return (
            <div className='row w-100 m-2'>
                <div className='w-100 d-flex justify-content-between'>
                    <strong className='my-2'>
                        {this.props.comment.username}
                    </strong>
                    <div className="btn-group dropleft">
                        <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="black" />
                            </svg>
                        </button>
                        <div className="dropdown-menu">
                            <button data-toggle="modal" className='btn text-danger dropdown-item' data-id={this.props.comment.id_reponse} data-target="#DeleteCommentModal">
                                Supprimer
                                        </button>
                            <button data-toggle="modal" className='btn dropdown-item' data-id={this.props.comment.id_reponse} data-target="#RepondreModal">
                                Repondre
                                        </button>
                            <button data-toggle="modal" className='btn dropdown-item' data-id={this.props.comment.id_reponse} data-content={this.props.comment.contenu} data-target="#ModifyResponseModal">
                                Modifier
                                        </button>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='QuestionTxt'>
                        {this.props.comment.contenu}
                    </p>
                </div>
                {
                    this.props.comment.HaveAnswer ?
                        <Reponse searchvalue={this.props.searchReponse} id_reponse={this.props.comment.id_reponse} />
                        : null
                }
            </div>
        )
    };
}


class Reponse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Reponse: []
        }
    }

    componentDidMount(){
        axios.get('/reponse/'+this.props.id_reponse)
        .then(res=>{
            this.setState({Reponse:res.data})});
    }

    render() {
        return (
            <div className='container border-left'>
                {
                    this.state.Reponse.map((val, index) =>
                        <div className="row p-2 QuestionContainer">
                            <div className='row w-100 m-4'>
                                <div className='w-100 d-flex justify-content-between'>
                                    <strong className='my-2'>
                                        {val.username}
                                    </strong>
                                    <div className="btn-group dropleft">
                                        <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="black" />
                                            </svg>
                                        </button>
                                        <div className="dropdown-menu">
                                            <button data-toggle="modal" className='btn text-danger dropdown-item' data-id={val.id_reponse} data-target="#DeleteCommentModal">
                                                Supprimer
                                            </button>
                                            <button data-toggle="modal" className='btn dropdown-item' data-id={val.id_reponse} data-target="#RepondreModal">
                                                Repondre
                                            </button>
                                            <button data-toggle="modal" className='btn dropdown-item' data-id={val.id_reponse} data-content={val.contenu} data-target="#ModifyResponseModal">
                                                Modifier
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className='QuestionTxt'>
                                        {val.contenu}
                                    </p>
                                </div>
                                {
                                    val.HaveAnswer ?
                                        <Reponse id_reponse={val.id_reponse} />
                                        : null
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        )
    };
}

class Commentaire extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SearhValue: '',
            commentsTemp: [],
            comments: []
        }
    }

    SearhValue = () => {
        let val = window.$('#SearchInput').val();
        if (val) {
            this.setState({ SearhValue: val })
        }
    }
    componentDidMount() {
        axios.get('/comments/' + this.props.match.params.id_doc)
            .then(res => {

                this.setState({ commentsTemp: res.data,comments:res.data })
                window.$('#DeleteCommentModal').on('show.bs.modal', (event) => {
                    let id = window.$(event.relatedTarget).data('id')
                    window.$("#DeleteCommentModal").append(`<input name='id_reponse' type="hidden" value=${id} /> `);
                })
                window.$('#RepondreModal').on('show.bs.modal', (event) => {
                    let id = window.$(event.relatedTarget).data('id')
                    window.$("#RepondreModal").append(`<input name='id_reponse' type="hidden"  value=${id} /> `);
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
                window.$('#ModifyResponseModal').on('show.bs.modal', (event) => {
                    // let id = window.$(event.relatedTarget).data('id')
                    window.$('#TempReponse').val(window.$(event.relatedTarget).data('content'))
                    window.$('.submitModify').attr('disabled', "");
                })
            });
    }



    render() {
        return (
            <>
                <Breadcrumb Title={['specialités', 'Sous-spécialité 1', 'Document 1', 'Commentaire']} />
                <div className="d-flex flex-column">
                    <div className="container">
                        <div className='mt-2 mx-4 position-relative w-50'>
                            <input className='form-control w-100 px-4 pr-5  rounded-pill' onInput={this.SearhValue} id='SearchInput' type="text" placeholder='Rechercher' />
                            <span className='SearchSvg'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.45178 0.381409C8.2334 0.381409 9.84611 1.04928 11.0137 2.12913C12.1812 3.20899 12.9033 4.7007 12.9033 6.34852C12.9033 7.93038 12.2378 9.36813 11.1519 10.436C11.1716 10.4495 11.1907 10.4644 11.2087 10.481L15.8534 14.7709C16.0479 14.9498 16.049 15.241 15.8553 15.4211C15.6618 15.6011 15.3469 15.6019 15.1524 15.4229L10.5077 11.133C10.4782 11.1059 10.4532 11.0762 10.4326 11.0447C9.33591 11.8409 7.9538 12.3157 6.45165 12.3157C4.67003 12.3157 3.05705 11.6479 1.88951 10.568C0.722102 9.48817 0 7.99633 0 6.34852C0 4.7007 0.722102 3.20899 1.88964 2.12913C3.05718 1.0494 4.67016 0.381409 6.45178 0.381409ZM10.2924 2.79638C9.30948 1.88733 7.95166 1.32505 6.45178 1.32505C4.9519 1.32505 3.59395 1.88733 2.61108 2.79638C1.6282 3.70544 1.02026 4.96128 1.02026 6.34852C1.02026 7.73575 1.6282 8.99171 2.61108 9.90077C3.59382 10.8098 4.95176 11.3721 6.45178 11.3721C7.95166 11.3721 9.30948 10.8098 10.2924 9.90077C11.2752 8.99184 11.8832 7.73588 11.8832 6.34852C11.8832 4.96128 11.2752 3.70544 10.2924 2.79638Z" fill="#C1C1C1" />
                                </svg>
                            </span>
                        </div>
                        <div className="row p-2 reponseContainer">
                            {
                                this.state.commentsTemp.map((val, index) =>
                                    <Comment key={index} comment={val} />
                                )
                            }
                        </div>
                    </div>
                    <div className='container'>
                        <div className='position-relative'>
                            <textarea className='rounded px-4 p-2 form-control m-auto' placeholder='Ajouter un commentaire..' onChange={() => window.$('.submitTitre').removeAttr('disabled')} rows="3" id='CommentInput' required />
                            <button className='btn EnvoyerBtn'>
                                Envoyer
                        </button>
                        </div>
                    </div>
                </div>
                <form className="modal fade" id="DeleteCommentModal" tabIndex="-1" aria-labelledby="DeleteCommentModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="DeleteCommentModalLabel">Supprimer commentaire</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <span>
                                    voulez-vous vraiment supprimer ce commentaire ?
                                    </span>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-danger" >Supprimer</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                            </div>
                        </div>
                    </div>
                </form>
                <form className="modal fade needs-validation" noValidate id="RepondreModal" tabIndex="-1" aria-labelledby="RepondreModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="RepondreModalLabel">Ajouter une reponse</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <textarea name='contenu' id='ReponseInput' placeholder='Reponse..' className='form-control my-2' rows='3' Style='resize:none;' required />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" >Envoyer</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                            </div>
                        </div>
                    </div>
                </form>
                <form className="modal fade needs-validation" noValidate id="ModifyResponseModal" tabIndex="-1" aria-labelledby="ModifyResponseModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModifyResponseModalLabel">Modifier un commentaire</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <textarea name='contenu' id='TempReponse' onChange={() => window.$('.submitModify').removeAttr('disabled')} className='form-control my-2' rows='3' Style='resize:none;' required />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary submitModify" >Modifier</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}
export default Commentaire;