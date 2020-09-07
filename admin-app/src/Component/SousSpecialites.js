import React from 'react';
import Breadcrumb from './Breadcrumb';
import '../styles.css';
import { NavLink } from 'react-router-dom';


class Document extends React.Component {
    render() {
        return (
            <NavLink to={"/specialites/" + this.props.params.id_ss + '/' + this.props.val.id} className='row p-2 my-2'>
                <button className='documentContainer d-flex w-100 p-3  flex-column flex-lg-row align-items-center justify-content-lg-between'>
                    <div>
                        <strong className='DocumentTxt text-bold'>
                            {this.props.val.name}
                        </strong>
                    </div>
                    <div className='d-flex flex-column flex-lg-row'>
                        <span className='mx-3 DocumentTxt'>
                            {'Quizz :' + this.props.val.nbrQuizz}
                        </span>
                        <span className='mx-3 DocumentTxt'>
                            {'Likes :' + this.props.val.nbrLike}
                        </span>
                        <span className='mx-3 DocumentTxt'>
                            {'Commentaires :' + this.props.val.nbrCommentaire}
                        </span>
                        <span className='mx-3 DocumentTxt'>
                            {'Vues :' + this.props.val.nbrVue}
                        </span>
                    </div>
                </button>
            </NavLink>
        )
    };
}


class SousSpecialites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            PageDocument: [],
            ListofDocument: [],
            pages: 0,
            page: 1,
            row: 6,
            documents: [{
                id: 1,
                name: 'document 1',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }, {
                id: 2,
                name: 'document 2',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }, {
                id: 3,
                name: 'document 3',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }, {
                id: 4,
                name: 'document 4',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }, {
                id: 5,
                name: 'document 5',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }, {
                id: 6,
                name: 'document 6',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }, {
                id: 7,
                name: 'document 7',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }, {
                id: 14,
                name: 'document 14',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }, {
                id: 8,
                name: 'document 8',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }, {
                id: 9,
                name: 'document 9',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }, {
                id: 10,
                name: 'document 10',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }, {
                id: 11,
                name: 'document 11',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }, {
                id: 12,
                name: 'document 12',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }, {
                id: 13,
                name: 'document 13',
                nbrQuizz: 9999,
                nbrLike: 9999,
                nbrCommentaire: 9999,
                nbrVue: 9999
            }]
        }
    }

    chooseImg = (event) => {
        if (event.target.files[0]) {
            window.$('#DocumentInput').text(event.target.files[0].name.substr(0, 20) + '..')
        }
    }

    pagination = (querySet, page, rows) => {

        var trimStart = (page - 1) * rows
        var trimEnd = trimStart + rows

        var trimmedData = querySet.slice(trimStart, trimEnd)

        var pages = Math.ceil(querySet.length / rows);

        this.setState({ pages: pages })
        var wrapper = document.getElementById('pagination')
        if (pages > 0) {
            wrapper.innerHTML =
                `<li class="page-item">
                    <button class="page-link page" value=${1} aria-label="Previous">
                        <span aria-hidden="true">&laquo; </span>
                    </button>
                </li>`;
            for (var i = 1; i <= pages; i++) {
                wrapper.innerHTML = wrapper.innerHTML + `<li className="page-item"><button class="page-link page" value=${i}>${i}</button></li>`;
            }
            wrapper.innerHTML = wrapper.innerHTML +
                `<li class="page-item">
                    <button class="page-link page" value=${pages} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>`;
            window.$('.page').on('click', { dis: this }, function (event) {
                event.data.dis.setState({ page: Number(window.$(this).val()) });
                event.data.dis.buildTable();
            })
        } else {
            wrapper.innerHTML = ''
        }
        return trimmedData;
    }

    buildTable = () => {
        var trimStart = (this.state.page - 1) * this.state.row
        var trimEnd = trimStart + this.state.row
        var trimmedData = this.state.ListofDocument.slice(trimStart, trimEnd)
        this.setState({ PageDocument: trimmedData })
    }

    SearhValue = () => {
        let val = window.$('#SearchInput').val();
        let listTemp = val ? this.state.documents.filter(value => (value.name.toLowerCase().search(val.toLowerCase()) !== -1)) : this.state.documents;
        this.setState({ PageDocument: this.pagination(listTemp, this.state.page, this.state.row), ListofDocument: listTemp })
    }
    componentDidMount() {
        this.setState({ PageDocument: this.pagination(this.state.documents, this.state.page, this.state.row), ListofDocument: this.state.documents })
        // console.log(this.props.match.params.id)
        window.$('#AddDocumentModal').on('show.bs.modal', function (event) {
            window.$("input[type!='submit']").val('');
            window.$("textarea").val('');
            window.$('#DocumentInput').text('Ajouter un fichier..')
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
    }




    render() {

        return (
            <>
                <Breadcrumb Title={['specialités', 'Sous-spécialité 1']} />
                <div className='container'>
                    <div className='row justify-content-between'>
                        <div className='my-4 mx-4 position-relative w-50'>
                            <input className='form-control w-100 px-4 pr-5  rounded-pill' onInput={this.SearhValue} id='SearchInput' type="text" placeholder='Rechercher' />
                            <span className='SearchSvg'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.45178 0.381409C8.2334 0.381409 9.84611 1.04928 11.0137 2.12913C12.1812 3.20899 12.9033 4.7007 12.9033 6.34852C12.9033 7.93038 12.2378 9.36813 11.1519 10.436C11.1716 10.4495 11.1907 10.4644 11.2087 10.481L15.8534 14.7709C16.0479 14.9498 16.049 15.241 15.8553 15.4211C15.6618 15.6011 15.3469 15.6019 15.1524 15.4229L10.5077 11.133C10.4782 11.1059 10.4532 11.0762 10.4326 11.0447C9.33591 11.8409 7.9538 12.3157 6.45165 12.3157C4.67003 12.3157 3.05705 11.6479 1.88951 10.568C0.722102 9.48817 0 7.99633 0 6.34852C0 4.7007 0.722102 3.20899 1.88964 2.12913C3.05718 1.0494 4.67016 0.381409 6.45178 0.381409ZM10.2924 2.79638C9.30948 1.88733 7.95166 1.32505 6.45178 1.32505C4.9519 1.32505 3.59395 1.88733 2.61108 2.79638C1.6282 3.70544 1.02026 4.96128 1.02026 6.34852C1.02026 7.73575 1.6282 8.99171 2.61108 9.90077C3.59382 10.8098 4.95176 11.3721 6.45178 11.3721C7.95166 11.3721 9.30948 10.8098 10.2924 9.90077C11.2752 8.99184 11.8832 7.73588 11.8832 6.34852C11.8832 4.96128 11.2752 3.70544 10.2924 2.79638Z" fill="#C1C1C1" />
                                </svg>
                            </span>
                        </div>
                        <button className='h-100 mx-2 my-auto rounded-pill px-3 text-white' Style="background :#FF6C6C" data-toggle="modal" data-target="#DeleteSpecialiteModal" >
                            Supprimer
                            </button>
                        <button id='AddDoc' className='my-4 mx-4 w-25 d-flex align-items-center justify-content-center' data-toggle="modal" data-target="#AddDocumentModal">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5707 0H20.4291C20.8619 0 21.2547 0.17653 21.539 0.46084C21.8235 0.74515 21.9998 1.13813 21.9998 1.57069V20.4291C21.9998 20.8617 21.8235 21.2545 21.539 21.539C21.2547 21.8233 20.8619 21.9998 20.4291 21.9998H1.5707C1.13814 21.9998 0.745156 21.8233 0.460844 21.539C0.176531 21.2547 0 20.8617 0 20.4291V1.57069C0 1.13796 0.176531 0.74515 0.460844 0.46084C0.745156 0.17653 1.13814 0 1.5707 0ZM10.362 5.52363C10.362 5.17129 10.6477 4.88555 10.9999 4.88555C11.3524 4.88555 11.6378 5.17129 11.6378 5.52363V10.3619H16.4761C16.8287 10.3619 17.1141 10.6477 17.1141 10.9998C17.1141 11.352 16.8285 11.6377 16.4761 11.6377H11.638V16.476C11.638 16.8285 11.3523 17.1139 11.0001 17.1139C10.6479 17.1139 10.3622 16.8284 10.3622 16.476V11.6379H5.52368C5.17133 11.6379 4.88577 11.3523 4.88577 11C4.88577 10.6477 5.17151 10.3621 5.52368 10.3621H10.362V5.52363ZM20.4291 1.27635H1.5707C1.49031 1.27635 1.41691 1.30965 1.36319 1.36318C1.30948 1.41689 1.27618 1.4903 1.27618 1.57069V20.4291C1.27618 20.5093 1.30948 20.5829 1.36319 20.6366C1.41691 20.6902 1.49031 20.7235 1.5707 20.7235H20.4291C20.5095 20.7235 20.5831 20.69 20.6366 20.6366C20.6903 20.5829 20.7236 20.5093 20.7236 20.4291V1.57069C20.7236 1.4903 20.6902 1.41689 20.6366 1.36318C20.5833 1.30965 20.5097 1.27635 20.4291 1.27635Z" fill="#57B6FB" />
                            </svg>
                            <span className='ml-2 AddDoc'>
                                Ajouter Un Document
                            </span>
                        </button>
                    </div>
                    {
                        this.state.PageDocument.length > 0 ?
                            this.state.PageDocument.map((val, index) =>
                                <Document key={index} params={this.props.match.params} val={val} />
                            ) :
                            <div className='text-center display-4 text-muted '>
                                No Result
                            </div>
                    }
                    <nav aria-label="Page navigation example">
                        <ul className="pagination d-flex justify-content-center" id='pagination'>
                        </ul>
                    </nav>

                    <form className="modal fade needs-validation" noValidate id="AddDocumentModal" tabIndex="-1" aria-labelledby="AddDocumentModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="AddDocumentModalLabel">Ajouter un document</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <input name="SspecialiteName" autoComplete='off' className='rounded p-2 px-2 w-75 form-control' placeholder="Titre" autoFocus={true} required />
                                    <textarea className="form-control my-2" name='descriptionTxt' id="descriptionTxt" rows="6" Style='resize:none;' placeholder='Description' required ></textarea>
                                    <div className='rounded-pill w-75 mx-auto bg-light my-3'>
                                        <input name="image" type="file" id='image' accept='image/*' className='form-control-file m-2 d-none' onChange={this.chooseImg} required></input>
                                        <label htmlFor="image" id='ImageInput' className='d-flex text-secondary justify-content-between mx-auto p-2 px-2 overflow-hidden'>
                                            <span id='DocumentInput'>
                                                Ajouter un fichier..
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
                    <form className="modal fade" id="DeleteSpecialiteModal" tabIndex="-1" aria-labelledby="DeleteSpecialiteModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="DeleteSpecialiteModalLabel">Supprimer Sous-Spécialité</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <span>
                                        voulez-vous vraiment supprimer cet sous-spécialité ?
                                    </span>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-danger" >Supprimer</button>
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

export default SousSpecialites;