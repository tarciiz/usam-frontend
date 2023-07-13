import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faPills } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { getUser, logOut} from '../config/session';
import pic from "../config/pic/pic.png";
import { Link} from 'react-router-dom';


function Menu() {
    return (<nav style={{'backgroundColor':'#FFA7A7', 'height':'100%'}} class="shadow">
              <div class="p-3 mb-30">
                <div class="d-flex align-items-center" >
                    <img src={getUser().profilePicture ? getUser().profilePicture.fullPath :pic} class="rounded-circle" alt="..." width="40px" style={{"maxHeight":"40px"}}/>

                    <p class="text-truncate overflow-hidden m-0">{getUser().name}</p>
                    <Link to="/profile"><FontAwesomeIcon style={{'color': '#000', 'width':'10px'}} icon={faChevronRight} /></Link>
                </div>
              </div> 

             <ul class="nav flex-column" id="nav">
                <li class="nav-item d-flex">
                  
                  <Link class="nav-link active" to="/home" onClick={(e)=>{activeElement(e)}} style={{'color':'#000'}}>
                  <FontAwesomeIcon style={{'color': '#000', 'width':'26px'}} icon={faHome} /> &nbsp;
                    Início
                  </Link>

                </li>

                <li class="nav-item">
                  <Link class="nav-link" to="/medicine" onClick={(e)=>{activeElement(e)}} style={{'color':'#000'}}><FontAwesomeIcon style={{'color': '#000', 'width':'26px'}} icon={faPills} /> &nbsp;
                    Remédios</Link>
                </li>

                <li class="nav-item">
                  <Link class="nav-link" to="/user" onClick={(e)=>{activeElement(e)}} style={{'color':'#000'}}><FontAwesomeIcon style={{'color': '#000', 'width':'26px'}} icon={faUser} /> &nbsp;
                    Usuários</Link>
                </li>

                
                <li class="nav-item">
                <Link class="nav-link" to="/" onClick={(e)=>{activeElement(e); logOut() }} style={{'color':'#000'}}>
                  <FontAwesomeIcon style={{'color': '#000', 'width':'26px'}} icon={faDoorOpen} /> &nbsp;
                    Sair
                  </Link>
                </li>

              </ul>
            </nav>
   )


  function activeElement(event){
      let links = document.getElementById('nav').getElementsByClassName('nav-link')
      for(let link of links){
          link.classList.remove('active')
      }

      let element = event.target
      element.classList.add('active')

  }

}

export default Menu;