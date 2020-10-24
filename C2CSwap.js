import React, { Component } from 'react'
import './css/home.css';
import Header from "./common/Header";
//import SelectFun from "./common/Selectfun";
import Global from "./common/GlobalStatus";
import SwapShow from "./common/SwapShow"
import Footer from "./common/Footer"


//import IOST from 'iost'


//const rpc = new IOST.RPC(new IOST.HTTPProvider("https://api.iost.io"));
//const ContractID ="Contract7xskjVLZjkJHTEVktSbRBqq68q1Up3GDecBXx4hck9yf"



export default class WGSWAP extends Component {


    constructor(props){
       super(props);
        this.state={accountName:null,
                    
                    }
        
    }


    componentDidMount(){



    }
   
    render() {
      
    
            return (


              <div className='background'>
              
              
              <Header />
              <Global />
              <SwapShow />
              <Footer />

           
              </div>
            )


        
        
        
    }
}
