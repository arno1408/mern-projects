import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import Collapse from 'react-bootstrap/Collapse';
import MenusBlog from './MenusBlog';
import MenusBlog2 from './MenusBlog2';
import PageTitle from '../../layouts/PageTitle';

const options = [
    { value: '1', label: 'India' },
    { value: '2', label: 'Information' },
    { value: '3', label: 'New Menu' },
    { value: '4', label: 'Page Menu' }
]

const Menu = () =>{
    const [open, setOpen] = useState(true);
    return(
        <>
            <PageTitle activeMenu="Menu" motherMenu="Cms" />	
            <div className="row">
                <div className="col-xl-12">
                    {/* <div className="row page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"#"}>CMS</Link></li>
                            <li className="breadcrumb-item"><Link to={"#"}>Menu</Link></li>
                        </ol>
                    </div> */}
                    <div className="filter cm-content-box box-primary">
                        <div className="content-title">
                            <div className="cpa">
                                <i className="fa fa-list-alt me-1"></i>Menu
                            </div>
                            <div className="tools">
                                <Link to={"#"} className="expand SlideToolHeader"
                                    onClick={() => setOpen(!open)}
                                >
                                    <i className="fas fa-angle-up" />
                                </Link>
                            </div>
                        </div>
                        <Collapse in={open}>
                            <div className="cm-content-body form excerpt">
                                <div className="card-body">
                                    <div className="row align-items-center p-3">
                                        <div className="col-xl-3 col-xxl-3 mb-xl-0 mb-3">
                                            <h6 className="mb-0">Select a menu to edit: <span className="required">* </span></h6>
                                        </div>
                                        <div className="col-xl-6 col-xxl-5 mb-xl-0 mb-3 Cms-selecter">
                                            <Select options={options} className="custom-react-select"/>
                                        </div>
                                        <div className="col-xl-3 col-xxl-4  mb-xl-0 mb-3">
                                            <Link to={"#"} className="btn btn-primary">Select</Link>
                                            <span className="mx-2">or</span>
                                            <Link to={"#"} className="text-primary">create new menu</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                    <div className="row">
                        <div className="col-xl-5">
                            <MenusBlog />
                        </div>  
                        <div className="col-xl-7">
                            <MenusBlog2 />
                        </div>  
                    </div>
                </div>
            </div>    
        </>
    )
}
export default Menu;