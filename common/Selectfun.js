import React, { Component } from 'react'
//import { Link } from "react-router-dom";
import { Translation  } from 'react-i18next';
import i18n from 'i18next';
import { RightCircleOutlined} from '@ant-design/icons';
import '../css/Selectfun.css';
import {Link} from 'react-router-dom'
 
 export default class Selectfun extends Component {
 
  
  constructor(props){
    super(props);
    this.state={ lang:i18n.language}
    }

    setLang=()=>{
      i18n.changeLanguage(i18n.language==='zh'?'en':'zh')
      let langtemp=(i18n.language==='zh'?'en':'zh')
      this.setState({lang:langtemp
      })

    }

    render(){

   return (

<div>
     <div className="gocard" >
     <div className="gocard-l">
     <Translation>
      { t => <div >{t('My Swap Dex')}</div>}   
      </Translation>
      <div className="gocard-l2">
      
      <div><Translation>
      { t => <div >{t('First Self-management Personal-SwapDex in IOST')}</div>}  
      </Translation></div>  
       <div><Translation>
      { t => <div >{t('Build,Manage,Expand,Earn Fees And Mine Tokens')}</div>}  
      </Translation></div>  


          </div>
      </div>
    <div className="gocard-r"> <Link to ="/MySwapDex"><RightCircleOutlined /></Link></div>
    </div>

    <div className="gocard" >
     <div className="gocard-l">
     <Translation>
      { t => <div >{t('C2C Swap')}</div>}   
      </Translation>
      <div className="gocard-l2">
       <div><Translation>
      { t => <div >{t('First C2C Swap Mode in IOST ')}</div>}  
      </Translation></div>  
      <div><Translation>
      { t => <div >{t('Trade Your Token With Anyone You Want & Mine Token')}</div>}  
      </Translation></div> 
          </div>
      </div>
    <div className="gocard-r"> <Link  to ="/C2CSwap"><RightCircleOutlined /></Link></div>
    </div>







</div>

  )};
};
