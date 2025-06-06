import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Collapse } from 'react-bootstrap';

import NoImage from '../../../assets/images/no-image.jpg';
import PageTitle from '../../layouts/PageTitle';

const options = [
    //{ value: '1', label: 'Select Status' },
    { value: '2', label: 'admin@gmail.com' },
    { value: '3', label: 'India' },
    { value: '4', label: 'Information' },
    { value: '5', label: 'New Menu' },
    { value: '6', label: 'Page Menu' }
]

const options2 = [
    { value: '1', label: 'Published' },
    { value: '2', label: 'Draft' },
    { value: '3', label: 'Trash' },
    { value: '4', label: 'Private' },
    { value: '5', label: 'Pending' }
]

const options3 = [
    { value: '1', label: 'Privacy Policy' },
    { value: '2', label: 'Contact Us' },
    { value: '3', label: 'Important Information' },
    { value: '4', label: 'Free shipping' },
    { value: '5', label: 'Daily Gifts' },
    { value: '6', label: '477 505 8877' },
    { value: '7', label: 'About Us' },
    { value: '8', label: 'Dummy Co' }
]



const initialState = true;
const reducer = (state, action) => {
    switch (action.type) {
        case 'collpase0':
            return { ...state, collpase0: !state.collpase0 }
        case 'collpase1':
            return { ...state, collpase1: !state.collpase1 }
        case 'collpase2':
            return { ...state, collpase2: !state.collpase2 }
        case 'collpase3':
            return { ...state, collpase3: !state.collpase3 }
        case 'collpase4':
            return { ...state, collpase4: !state.collpase4 }
        case 'collpase5':
            return { ...state, collpase5: !state.collpase5 }
        case 'collpase6':
            return { ...state, collpase6: !state.collpase6 }
        case 'collpase7':
            return { ...state, collpase7: !state.collpase7 }
        case 'collpase8':
            return { ...state, collpase8: !state.collpase8 }
        case 'collpase9':
            return { ...state, collpase9: !state.collpase9 }
        default:
            return state
    }
}

const screenOption = [
    { title: 'Page Attributes', series: '11' },
    { title: 'Featured Image', series: '12' },
    { title: 'Excerpt', series: '13' },
    { title: 'Custom Fields', series: '14' },
    { title: 'Discussion', series: '15' },
    { title: 'Slug', series: '16' },
    { title: 'Author', series: '17' },
    { title: 'Page Type', series: '18' },
    { title: 'Seo', series: '19' }
];

const ContentAdd = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            <PageTitle activeMenu="Add Content" motherMenu="Cms" />	
            <div className="row">
                <div className="col-xl-12">
                    {/* <div className="row page-titles mt-3">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"#"}>Home</Link></li>
                            <li className="breadcrumb-item"><Link to={"#"}>Content</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Add</li>
                        </ol>
                    </div> */}
                    <div>
                        <button type="submit" className="btn btn-primary mb-3">Content List</button>{" "}
                        <button type="submit" className="btn btn-primary mb-3 open"
                            onClick={() => dispatch({ type: 'collpase0' })}
                        >Screen Option</button>
                    </div>
                    <Collapse in={!state.collpase0}>
                        <div className="main-check" >
                            <div className="row">
                                <h6 className="mb-3">Show on screen</h6>
                                {screenOption.map((item, ind) => (
                                    <div className="col-xl-2 col-lg-3 col-sm-4" key={ind}>
                                        <div className="form-check mb-sm-3 mb-1">
                                            <input className="form-check-input" type="checkbox" value="" id={`flexCheckDefault-${item.series}`} />
                                            <label className="form-check-label mb-0 text-nowrap" htmlFor={`flexCheckDefault-${item.series}`}>
                                                {item.title}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Collapse>
                    <div className="row">
                        <div className="col-xl-8">
                            <form>
                                <div className="mb-3">
                                    <label className="from-label">Title</label>
                                    <input type="text" className="form-control" placeholder="Title" />
                                </div>
                            </form>
                            <div className="filter cm-content-box box-primary">
                                <div className="content-title">
                                    <div className="cpa">
                                        Custom Fields
                                    </div>
                                    <div className="tools">
                                        <Link to={"#"}
                                            onClick={() => dispatch({ type: 'collpase1' })}
                                            className={`SlideToolHeader ${state.collpase1 ? 'collapse' : 'expand'}`}
                                        >
                                            <i className="fas fa-angle-up"></i>
                                        </Link>
                                    </div>
                                </div>
                                <Collapse in={!state.collpase1}>
                                    <div className="cm-content-body form excerpt">
                                        <div className="card-body">
                                            <h6>Add New Custom Field:</h6>
                                            <div className="row">
                                                <div className="col-xl-6 col-sm-6">
                                                    <form>
                                                        <div className="mb-3">
                                                            <label className="from-label">Title</label>
                                                            <input type="text" className="form-control" placeholder="Title" />
                                                        </div>
                                                    </form>
                                                </div>
                                                <div className="col-xl-6 col-sm-6">
                                                    <label className="from-label">Value</label>
                                                    <textarea className="form-control"></textarea>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary mt-3 mt-sm-0">Add Custom Field</button>
                                            <span className="mt-3 d-block">Custom fields can be used to extra metadata to a post that you can use in your theme.</span>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="filter cm-content-box box-primary">
                                <div className={`content-title`}>
                                    <div className="cpa">
                                        Discussion
                                    </div>
                                    <div className="tools">
                                        <Link to={"#"}
                                            className={`SlideToolHeader ${state.collpase2 ? 'collapse' : 'expand'}`}
                                            onClick={() => dispatch({ type: 'collpase2' })}
                                        >
                                            <i className="fas fa-angle-up"></i>
                                        </Link>
                                    </div>
                                </div>
                                <Collapse in={!state.collpase2}>
                                    <div className="cm-content-body form excerpt">
                                        <div className="card-body">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    Allow comments.
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="filter cm-content-box box-primary">
                                <div className="content-title">
                                    <div className="cpa">Slug</div>
                                    <div className="tools">
                                    </div>
                                </div>
                                <div className="cm-content-body form excerpt">
                                    <div className="card-body">
                                        <label className="from-label">Slug</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="filter cm-content-box box-primary">
                                <div className="content-title">
                                    <div className="cpa">Author</div>
                                    <div className="tools"></div>
                                </div>
                                <div className="cm-content-body form excerpt">
                                    <div className="card-body Cms-selecter">
                                        <label className="from-label">User</label>
                                        <Select options={options} className="custom-react-select" />
                                    </div>
                                </div>
                            </div>
                            <div className="filter cm-content-box box-primary">
                                <div className="content-title">
                                    <div className="cpa">Seo</div>
                                    <div className="tools"></div>
                                </div>
                                <div className="cm-content-body form excerpt">
                                    <div className="card-body">
                                        <label className="form-label">Page Title</label>
                                        <input type="text" className="form-control mb-3" placeholder="Page title" />
                                        <div className="row">
                                            <div className="col-xl-6 col-sm-6">
                                                <label className="form-label">Keywords</label>
                                                <input type="text" className="form-control mb-3 mb-sm-0" placeholder="Enter meta Keywords" />
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <label className="form-label">Descriptions</label>
                                                <textarea className="form-control" placeholder="Enter meta Keywords" rows="2"></textarea>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4">
                            <div className="filter cm-content-box box-primary">
                                <div className={`content-title`}>
                                    <div className="cpa">
                                        Published
                                    </div>
                                    <div className="tools">
                                        <Link to={"#"}
                                            className={`SlideToolHeader ${state.collpase3 ? 'collapse' : 'expand'}`}
                                            onClick={() => dispatch({ type: 'collpase3' })}
                                        >
                                            <i className="fas fa-angle-up"></i>
                                        </Link>
                                    </div>
                                </div>
                                <Collapse in={!state.collpase3}>
                                    <div className="cm-content-body publish-content form excerpt">
                                        <div className="card-body pb-0">
                                            <div className="accordion-item">
                                                <ul className="d-flex align-items-center mb-2">
                                                    <li><Link to={"#"}><i className="fas fa-key"></i></Link></li>
                                                    <li><Link to={"#"} className="ms-2">Status:</Link></li>
                                                    <li><strong><Link to={"#"} className="mx-2">Published</Link></strong></li>
                                                    <li>
                                                        <Link to={"#"} className="accordion accordion-primary"
                                                            onClick={() => dispatch({ type: 'collpase7' })}
                                                        >
                                                            Edit
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <div
                                                    className={`collpase ${state.collpase7 ? 'show' : ''}`}
                                                    id="headingAccord"
                                                >
                                                    <Collapse in={state.collpase7}>
                                                        <div className="accordion-body-text">
                                                            <div className="Cms-selecter mb-2">
                                                                <label className="from-label w-100">Content Type</label>
                                                                <Select options={options2} className="custom-react-select" />

                                                            </div>
                                                            <div>
                                                                <button className="btn btn-primary btn-sm">Ok</button>{" "}
                                                                <button className="btn btn-primary btn-sm">Cancel</button>
                                                            </div>
                                                        </div>
                                                    </Collapse>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <ul className="d-flex align-items-center mb-2">
                                                    <li><Link to={"#"}><i className="fa fa-fw fa-eye"></i></Link></li>
                                                    <li><Link to={"#"} className="ms-2">Status:</Link></li>
                                                    <li><strong><Link to={"#"} className="mx-2">Public</Link></strong></li>
                                                    <li>
                                                        <Link to={"#"} className="accordion accordion-primary"
                                                            // onClick={()=>addClass2()}
                                                            onClick={() => dispatch({ type: 'collpase8' })}
                                                        >Edit</Link></li>
                                                </ul>
                                                <Collapse in={state.collpase8}>
                                                    <div id="collapsetwo"
                                                        // className="collapse heading2" 
                                                        className={`collpase ${state.collpase8 ? 'show' : ''}`}
                                                    >
                                                        <div className="accordion-body-text">
                                                            <div className="basic-form">
                                                                <form>
                                                                    <div className="mb-3 mb-0">
                                                                        <div className="radio">
                                                                            <label className="form-check-label">
                                                                                <input type="radio" name="optradio" className="form-check-input" />
                                                                                Public</label>
                                                                        </div>
                                                                        <div className="radio">
                                                                            <label className="form-check-label">
                                                                                <input type="radio" name="optradio" className="form-check-input" />
                                                                                Password Protected
                                                                            </label>
                                                                        </div>
                                                                        <div className="radio disabled">
                                                                            <label className="form-check-label">
                                                                                <input type="radio" name="optradio" className="form-check-input" />
                                                                                Private</label>
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div>
                                                                <button className="btn btn-primary btn-sm">Ok</button>{" "}
                                                                <button className="btn btn-primary btn-sm">Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Collapse>
                                            </div>
                                            <div className="accordion-item">
                                                <ul className="d-flex align-items-center mb-2 flex-wrap">
                                                    <li><Link to={"#"}><i className="fas fa-calendar-alt"></i></Link></li>
                                                    <li><Link to={"#"} className="ms-2">Published</Link></li>
                                                    <li><strong><Link to={"#"} className="mx-2">on :24-09-2022 16:22:52 </Link></strong></li>
                                                    <li><Link to={"#"} className="accordion accordion-primary"
                                                        // onClick={()=>addClass3()}    
                                                        onClick={() => dispatch({ type: 'collpase9' })}
                                                        id="headingthree">Edit
                                                    </Link>
                                                    </li>
                                                </ul>
                                                <Collapse in={state.collpase9}>
                                                    <div
                                                        id="collapsethree"
                                                        // className="collapse heading3"
                                                        className={`collpase ${state.collpase9 ? 'show' : ''}`}
                                                    >
                                                        <div className="accordion-body-text">
                                                            <div className="basic-form mb-2">
                                                                <input type="date" name="datepicker" className=" form-control" placeholder="DD/MM/YY" />
                                                            </div>
                                                            <div>
                                                                <button className="btn btn-primary btn-sm">Ok</button>{" "}
                                                                <button className="btn btn-primary btn-sm">Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Collapse>
                                            </div>
                                        </div>
                                        <hr style={{ margin: "0px" }} className="mx-2" />
                                        <div className="card-footer border-0 text-end py-3 ">
                                            <Link to={"#"} className="btn btn-primary">Publish</Link>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="filter cm-content-box box-primary">
                                <div className="content-title">
                                    <div className="cpa">
                                        Page Attributes
                                    </div>
                                    <div className="tools">
                                        <Link to={"#"}
                                            className={`SlideToolHeader ${state.collpase4 ? 'collapse' : 'expand'}`}
                                            onClick={() => dispatch({ type: 'collpase4' })}
                                        >
                                            <i className="fas fa-angle-up"></i>
                                        </Link>
                                    </div>
                                </div>
                                <Collapse in={!state.collpase4}>
                                    <div className="cm-content-body publish-content form excerpt">
                                        <div className="card-body Cms-selecter">
                                            <label className="from-label">Title</label>
                                            <Select options={options2} className="custom-react-select" />
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="filter cm-content-box box-primary">
                                <div className="content-title">
                                    <div className="cpa">
                                        Page Type
                                    </div>
                                    <div className="tools">
                                        <Link to={"#"}
                                            className={`SlideToolHeader ${state.collpase5 ? 'collapse' : 'expand'}`}
                                            onClick={() => dispatch({ type: 'collpase5' })}
                                        >
                                            <i className="fas fa-angle-up"></i>
                                        </Link>
                                    </div>
                                </div>
                                <Collapse in={!state.collpase5}>
                                    <div className="cm-content-body publish-content form excerpt">
                                        <div className="card-body Cms-selecter">
                                            <label className="from-label w-100">Content Type</label>
                                            <Select options={options3} className="custom-react-select" />
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                            <div className="filter cm-content-box box-primary">
                                <div className="content-title">
                                    <div className="cpa">
                                        Featured Image
                                    </div>
                                    <div className="tools">
                                        <Link to={"#"}
                                            className={`SlideToolHeader ${state.collpase6 ? 'collapse' : 'expand'}`}
                                            onClick={() => dispatch({ type: 'collpase6' })}
                                        >
                                            <i className="fas fa-angle-up"></i>
                                        </Link>
                                    </div>
                                </div>
                                <Collapse in={!state.collpase6}>
                                    <div className="cm-content-body publish-content form excerpt">
                                        <div className="card-body">
                                            <div className="avatar-upload d-flex align-items-center">
                                                <div className=" position-relative ">
                                                    <div className="avatar-preview">
                                                        <div id="imagePreview"
                                                            style={{ backgroundImage: "url(" + NoImage + ")" }}
                                                        >
                                                        </div>
                                                    </div>
                                                    <div className="change-btn d-flex align-items-center flex-wrap">
                                                        <input type='file' className="form-control" id="imageUpload" accept=".png, .jpg, .jpeg" />
                                                        <label for="imageUpload" className="dlab-upload bg-light ms-0">Select Image</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ContentAdd;
