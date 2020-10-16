import React from 'react';
import Breadcrumb from './Breadcrumb';
import $ from "jquery";
import '../styles.css';
import axios from 'axios';


class Utilisateurs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserToDelete: {
                username: '',
                id: -1
            },
            ListOfusers: [],
            users: [
            ],
            page: 1,
            row: 6,
            ToShowData: [],
            pages: 0,
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
            $("#tableUsers").removeClass('d-none')
            wrapper.innerHTML =
                `<li class="page-item">
                    <button class="page-link page" value=${1} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
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
            $('.page').on('click', { dis: this }, function (event) {
                event.data.dis.setState({ page: Number($(this).val()) });
                event.data.dis.buildTable();
            })
        } else {
            $("#tableUsers").addClass('d-none')
            wrapper.innerHTML = ''
        }
        return trimmedData;
    }

    buildTable = () => {
        var trimStart = (this.state.page - 1) * this.state.row
        var trimEnd = trimStart + this.state.row
        var trimmedData = this.state.ListOfusers.slice(trimStart, trimEnd)
        this.setState({ ToShowData: trimmedData })
    }


    modify = (val) => {
        // var modal = $("#ModifyModel")
        // modal.find('.modal-title').text('New message to ')
        document.getElementById('ModifyModelBody').innerHTML = `
        <div class="w-50 my-3 position-relative rounded-circle p-3">
            <img src="http://localhost:3000${val.photo}" alt="user Photo" class="rounded-circle" style="width:200px;height:200px;">
            <button class='supPhoto close DeleteModify' value='photo'>
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13.5" cy="13.5" r="13.5" fill="#FF7E7E" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.15894 17.5695L11.7284 14L8.15894 10.4305C7.94702 10.2186 7.94702 9.87093 8.15894 9.659L9.659 8.15894C9.87093 7.94702 10.2186 7.94702 10.4305 8.15894L14 11.7284L17.5695 8.15894C17.7814 7.94702 18.1291 7.94702 18.341 8.15894L19.8411 9.659C20.053 9.87093 20.053 10.2186 19.8411 10.4305L16.2716 14L19.8411 17.5695C20.053 17.7814 20.053 18.1291 19.8411 18.341L18.341 19.8411C18.1291 20.053 17.7814 20.053 17.5695 19.8411L14 16.2716L10.4305 19.8411C10.2186 20.053 9.87093 20.053 9.659 19.8411L8.15894 18.341C7.94702 18.1291 7.94702 17.7814 8.15894 17.5695Z" fill="white" />
                </svg>
            </button>
        </div>
        <div>
        Username : ${val.username}
        <button type="button" class="close mx-2 DeleteModify" value='username'>
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div>
            Nom : ${val.nom}
            <button type="button" class="close mx-2 DeleteModify" value='nom'>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div>
            Prénom : ${val.prenom}
            <button type="button" class="close mx-2 DeleteModify" value='prenom'>
                <span aria-hidden="true">&times;</span>
            </button>    
        </div>
        <div>
            Sex : 
            ${val.sex}
            <button type="button" class="close mx-2 DeleteModify" value='sex'>
                <span aria-hidden="true">&times;</span>
            </button>    
        </div>    
        <div>
            E-Mail : ${val.email}
            <button type="button" class="close mx-2 DeleteModify" value='email'>
                <span aria-hidden="true">&times;</span>
            </button>    
        </div>`
        $('.DeleteModify').on('click', { dis: this }, function (event) {
            console.log($(this).val())
        })
    }
    SearhValue = () => {
        let val = $('#SearchInput').val();
        let listTemp = val ? this.state.users.filter(value => (value.username.toLowerCase().search(val.toLowerCase()) !== -1)) : this.state.users;
        this.setState({ ToShowData: this.pagination(listTemp, this.state.page, this.state.row), ListOfusers: listTemp })
    }
    componentDidMount() {
        axios.get('/users')
            .then(res => {
                this.setState({ users: res.data, ToShowData: this.pagination(res.data, this.state.page, this.state.row), ListOfusers: res.data })
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




    render() {

        return (
            <>
                <Breadcrumb Title={['Utilisateurs']} />
                <div className='container'>
                    <div className='my-4 mx-4 position-relative w-50'>
                        <input className='form-control w-100 px-4 pr-5  rounded-pill' onInput={this.SearhValue} id='SearchInput' type="text" placeholder='Rechercher (ex : username)' />
                        <span className='SearchSvg'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.45178 0.381409C8.2334 0.381409 9.84611 1.04928 11.0137 2.12913C12.1812 3.20899 12.9033 4.7007 12.9033 6.34852C12.9033 7.93038 12.2378 9.36813 11.1519 10.436C11.1716 10.4495 11.1907 10.4644 11.2087 10.481L15.8534 14.7709C16.0479 14.9498 16.049 15.241 15.8553 15.4211C15.6618 15.6011 15.3469 15.6019 15.1524 15.4229L10.5077 11.133C10.4782 11.1059 10.4532 11.0762 10.4326 11.0447C9.33591 11.8409 7.9538 12.3157 6.45165 12.3157C4.67003 12.3157 3.05705 11.6479 1.88951 10.568C0.722102 9.48817 0 7.99633 0 6.34852C0 4.7007 0.722102 3.20899 1.88964 2.12913C3.05718 1.0494 4.67016 0.381409 6.45178 0.381409ZM10.2924 2.79638C9.30948 1.88733 7.95166 1.32505 6.45178 1.32505C4.9519 1.32505 3.59395 1.88733 2.61108 2.79638C1.6282 3.70544 1.02026 4.96128 1.02026 6.34852C1.02026 7.73575 1.6282 8.99171 2.61108 9.90077C3.59382 10.8098 4.95176 11.3721 6.45178 11.3721C7.95166 11.3721 9.30948 10.8098 10.2924 9.90077C11.2752 8.99184 11.8832 7.73588 11.8832 6.34852C11.8832 4.96128 11.2752 3.70544 10.2924 2.79638Z" fill="#C1C1C1" />
                            </svg>
                        </span>
                    </div>
                    <table id='tableUsers' className="table table-hover table-sm table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Nom</th>
                                <th scope="col">Prénom</th>
                                <th scope="col">Sex</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Date d'inscription</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody id='table-body'>
                            {
                                this.state.ToShowData.map((val, index) => (
                                    <tr key={val.id}>
                                        <th scope="row">{val.id}</th>
                                        <td data-toggle="tooltip" title={val.username}>
                                            {val.username}
                                        </td>
                                        <td data-toggle="tooltip" title={val.nom}>{val.nom.substr(0, 8) + (val.nom.length > 8 ? ".." : '')}</td>
                                        <td data-toggle="tooltip" title={val.prenom}>{val.prenom}</td>
                                        <td>{val.sex}</td>
                                        <td data-toggle="tooltip" title={val.email}>{val.email.substr(0, 13) + (val.email.length > 13 ? ".." : '')}</td>
                                        <td data-toggle="tooltip" title={val.datei}>{val.datei}</td>
                                        <td data-toggle="tooltip" title={val.photo}>{val.photo.substr(0, 17) + (val.photo.length > 8 ? ".." : '')}</td>
                                        <td className='d-flex align-items-center' >
                                            <button className='text-primary p-2 border-0 bg-transparent' onClick={() => this.modify(val)} data-toggle="modal" data-target="#ModifyModel">
                                                Modifier
                                            </button>
                                            <button className='text-danger p-2 border-0 bg-transparent' onClick={() => this.setState({ UserToDelete: { id: val.id, username: val.username } })} data-toggle="modal" data-target="#SupprimerModal">
                                                Supprimmer
                                            </button>
                                            <button className='text-warning p-2 border-0 bg-transparent' onClick={() => this.setState({ mail: val.email })} data-toggle="modal" data-target="#EnvoyerModal">
                                                Envoyer un mail
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {
                        this.state.ToShowData.length === 0 ? <div className='text-center display-4 text-muted '>
                            No Result
                        </div> : null
                    }
                    <nav aria-label="Page navigation example">
                        <ul className="pagination d-flex justify-content-center" id='pagination'>
                        </ul>
                    </nav>
                    <div className="modal fade" id="ModifyModel" tabIndex="-1" aria-labelledby="ModifyModelLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-body d-flex flex-column align-items-center justify-content-center" id='ModifyModelBody'>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form className="modal fade needs-validation" noValidate id="SupprimerModal" tabIndex="-1" aria-labelledby="SupprimerModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="SupprimerModalLabel">{"Supprimer l'utilisateur " + this.state.UserToDelete.username}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <strong>voulez-vous vraiment supprimer cet utilisateur ?</strong>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-danger">Supprimer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form className="modal fade needs-validation" noValidate id="EnvoyerModal" tabIndex="-1" aria-labelledby="EnvoyerModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title bg-light rounded-pill px-2" id="EnvoyerModalLabel">{this.state.mail}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <textarea className="form-control" id="MailText" rows="10" Style='resize:none;' placeholder='Votre message' required></textarea>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Envoyer</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default Utilisateurs;