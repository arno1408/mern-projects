import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import Collapse from 'react-bootstrap/Collapse';
import PageTitle from '../../layouts/PageTitle';

const options = [
    //{ value: '1', label: 'Select Status' },
    { value: '2', label: 'Published' },
    { value: '3', label: 'Draft' },
    { value: '4', label: 'Trash' },
    { value: '5', label: 'Private' },
    { value: '6', label: 'Pending' }
]


const tableData = [
    {number:"1", title:"Privacy Policy"},
    {number:"2", title:"Contact Us"},
];

const Blog = () =>{
    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(true);
    return(
        <>
            <PageTitle activeMenu="Blog" motherMenu="Cms" />	
            <div className="row">
                <div className="col-xl-12">
                    {/* <div className="row page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"#"}>CMS</Link></li>
                            <li className="breadcrumb-item"><Link to={"#"}>Blog</Link></li>
                        </ol>
                    </div> */}
                    <div className="filter cm-content-box box-primary">
                        <div className={`content-title ${open ? "" : "collbord"  }`}>
                            <div className="cpa">
                                <i className="fas fa-filter me-2"></i>Filter
                            </div>
                            <div className="tools">
                                <Link to={"#"} className="expand SlideToolHeader"
                                    onClick={() => setOpen(!open)}
                                >
                                    <i className="fas fa-angle-up"></i>
                                </Link>
                            </div>
                        </div>                      
                        <Collapse in={open}>
                            <div className="cm-content-body form excerpt">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-xl-3 col-xxl-6">
                                            <input type="text" className="form-control mb-xl-0 mb-3" id="exampleFormControlInput1" placeholder="Title" />
                                        </div>
                                        <div className="col-xl-3 col-xxl-6">                                           
                                            <Select options={options} className="custom-react-select mb-3 mb-xxl-0"/>
                                        </div>
                                        <div className="col-xl-3 col-xxl-6">
                                            <input type="date" name="datepicker" className=" form-control mb-xxl-0 mb-3" />
                                        </div>
                                        <div className="col-xl-3 col-xxl-6">
                                            <button className="btn btn-info me-2" title="Click here to Search" type="button"><i className="fa fa-search me-1"></i>Filter</button>
                                            <button className="btn btn-danger" title="Click here to remove filter" type="button">Remove Filter</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </Collapse>   
                    </div>
                    <div className="mb-3">
                        <ul className="d-flex align-items-center flex-wrap">
                            <li><Link to={"/add-blog"} className="btn btn-primary ">Add Blog</Link></li>
                            <li><Link to={"/blog-cate"} className="btn btn-primary mx-1">Blog Category</Link></li>
                            <li><Link to={"#"} className="btn btn-primary mt-sm-0 mt-1">Add Blog Category</Link></li>
                        </ul>
                    </div>
                    <div className="filter cm-content-box box-primary mt-5">
                        <div className={`content-title ${open2 ? "" : "collbord"  }`}>
                            <div className="cpa">
                                Blogs List
                            </div>
                            <div className="tools">
                                <Link to={"#"} className="expand SlideToolHeader"
                                     onClick={() => setOpen2(!open2)}
                                >
                                    <i className="fas fa-angle-up"></i>
                                </Link>
                            </div>
                        </div>
                        <Collapse in={open2}>
                            <div className="cm-content-body form excerpt">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-responsive-lg table-striped table-condensed flip-content">
                                            <thead>
                                                <tr>
                                                    <th>S.No</th>
                                                    <th>Title</th>
                                                    <th>Status</th>
                                                    <th>Modified</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableData.map((item, ind)=>(
                                                    <tr key={ind}>
                                                        <td>{item.number}</td>
                                                        <td>{item.title}</td>
                                                        <td>Published</td>
                                                        <td>18 Feb, 2015</td>
                                                        <td>
                                                            <Link to={"#"} className="btn btn-warning btn-sm content-icon me-1">
                                                                <i className="fa fa-edit"></i>
                                                            </Link>
                                                            <Link to={"#"} className="btn btn-danger btn-sm content-icon ms-1">
                                                                <i className="fa fa-times"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="d-flex align-items-center justify-content-lg-between flex-wrap justify-content-center">
                                            <span className="mb-2 mb-xl-0 me-3">Page 1 of 4, showing 2 records out of 8 total, starting on record 1, ending on 2</span>
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination mb-2 mb-xl-0">
                                                <li className="page-item"><Link to={"#"} className="page-link">Previous</Link></li>
                                                <li className="page-item"><Link to={"#"} className="page-link">1</Link></li>
                                                <li className="page-item"><Link to={"#"} className="page-link">2</Link></li>
                                                <li className="page-item"><Link to={"#"} className="page-link">3</Link></li>
                                                <li className="page-item"><Link to={"#"} className="page-link" >Next</Link></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse> 
                    </div>
                </div>
            </div>
        </>
    )
}
export default Blog;