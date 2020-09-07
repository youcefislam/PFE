import React from 'react';
import '../styles.css';


class Breadcrumb extends React.Component {

    render() {
        return (
            <div className='row p-2 BcrumbContainer m-0 w-100'>
                {this.props.Title.map((val, index) =><span key={index} className={'Bcrumb ml-1'+(index === this.props.Title.length - 1 ?' BcrumbActive':"")}>{val+' '}</span> )}
            </div>
        )
    }
}

export default Breadcrumb;