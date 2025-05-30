/// Menu
import React, { Fragment, useContext, useEffect, useReducer, useState } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
import Collapse from 'react-bootstrap/Collapse';
/// Link
import { Link } from "react-router-dom";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";

/// Image
import user from "../../../assets/images/user.jpg";

import { MenuList } from './Menu';

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
}

const SideBar = () => {
  let year = new Date().getFullYear();
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
    ChangeIconSidebar,
  } = useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);

  let handleheartBlast = document.querySelector('.heart');
  function heartBlast() {
    return handleheartBlast.classList.toggle("heart-blast");
  }

  const [hideOnScroll, setHideOnScroll] = useState(true)
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll]
  )

  const handleMenuActive = status => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }

  }
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status })
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" })
    }

  }

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  /// Active menu
  useEffect(() => {
    MenuList.forEach((data) => {
      data.content?.forEach((item) => {        
        if(path === item.to){         
          setState({active : data.title})          
        }
        item.content?.forEach(ele => {
          if(path === ele.to){
            setState({activeSubmenu : item.title, active : data.title})
          }
        })
      })
  })
  }, [path]);
  
  return (
    <div
      onMouseEnter={() => ChangeIconSidebar(true)}
      onMouseLeave={() => ChangeIconSidebar(false)}
      className={`dlabnav ${iconHover} ${sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
        ? hideOnScroll > 120
          ? "fixed"
          : ""
        : ""
        }`}

    >
      <PerfectScrollbar className="dlabnav-scroll">
        <ul className="metismenu" id="menu">
          {MenuList.map((data, index) => {
            let menuClass = data.classsChange;
            if (menuClass === "menu-title") {
              return (
                <li className={menuClass} key={index} >{data.title}</li>
              )
            } else {
              return (
                <li className={` ${state.active === data.title ? 'mm-active' : ''} ${data.to === path ? 'mm-active' : ''}`}
                  key={index}
                >
                  {data.content && data.content.length > 0 ?
                    <Fragment>
                      <Link to={"#"}
                        className="has-arrow"
                        onClick={() => { handleMenuActive(data.title) }}
                      >
                        {data.iconStyle}
                        {" "}<span className="nav-text">{data.title}
                          {
                            data.update && data.update.length > 0 ?
                              <span className="badge badge-xs badge-danger ms-2">{data.update}</span>
                              :
                              ''
                          }
                        </span>
                      </Link>
                      <Collapse in={state.active === data.title ? true : false}>
                        <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                          {data.content && data.content.map((data, index) => {
                            return (
                              <li key={index}
                                className={`${state.activeSubmenu === data.title ? "mm-active" : ""}${data.to === path ? 'mm-active' : ''}`}
                              >
                                {data.content && data.content.length > 0 ?
                                  <>
                                    <Link to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                      onClick={() => { handleSubmenuActive(data.title) }}
                                    >
                                      {data.title}
                                    </Link>
                                    <Collapse in={state.activeSubmenu === data.title ? true : false}>
                                      <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                        {data.content && data.content.map((data, index) => {
                                          return (
                                            <Fragment key={index}>
                                              <li>
                                                <Link className={`${path === data.to ? "mm-active" : ""} `} to={data.to}>{data.title}</Link>
                                              </li>
                                            </Fragment>
                                          )
                                        })}
                                      </ul>
                                    </Collapse>
                                  </>
                                  :
                                  <Link to={data.to} className={`${data.to === path ? 'mm-active' : ''}`}>
                                    {data.title}
                                  </Link>
                                }

                              </li>
                            )
                          })}
                        </ul>
                      </Collapse>
                    </Fragment>
                    :
                    <Link to={data.to} className={`${data.to === path ? 'mm-active' : ''}`}>
                      {data.iconStyle}
                      <span className="nav-text">{data.title}</span>
                    </Link>
                  }

                </li>
              )
            }
          })}
        </ul>

        <div className="side-bar-profile">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="side-bar-profile-img me-2">
              <img src={user} alt="" />
            </div>
            <div className="profile-info1">
              <h4 className="fs-18 font-w500">Levi Siregar</h4>
              <span>leviregar@mail.com</span>
            </div>
            <div className="profile-button">
              <i className="fas fa-caret-down scale5 text-light"></i>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-2 progress-info">
            <span className="fs-12"><i className="fas fa-star text-orange me-2"></i>Task Progress</span>
            <span className="fs-12">20/45</span>
          </div>
          <div className="progress default-progress">
            <div className="progress-bar bg-gradientf progress-animated" style={{ width: "45%", height: "10px" }} role="progressbar">
              <span className="sr-only">45% Complete</span>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p><strong>Fillow Saas Admin</strong> © {year} All Rights Reserved</p>
          <p className="fs-12">Made with <span className="heart" onClick={() => heartBlast()}></span> by DexignLab</p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
