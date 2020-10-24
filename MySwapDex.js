import React, { Component } from 'react'
import './css/home.css';
import Header from "./common/Header";
//import SelectFun from "./common/Selectfun";
import Global from "./common/GlobalStatus";
import DexShow from "./common/DexShow"
import Footer from "./common/Footer"
import { Modal} from 'antd';

//import IOST from 'iost'


//const rpc = new IOST.RPC(new IOST.HTTPProvider("https://api.iost.io"));
//const ContractID ="Contract7xskjVLZjkJHTEVktSbRBqq68q1Up3GDecBXx4hck9yf"


function warning() {
  Modal.warning({
    title: '注意[Notice]',
    content: (
      <div style={{fontSize:"0.4rem"}}>
  
        <p>提供流动性不是无风险挖矿，你将承担做市的风险，请一定清楚规则后再执行。
          [This is the dex, you are under the risk to be an maker. Please
          clearly konw the rules before. ]  </p>

      </div>
    ),
    onOk() {window.sessionStorage.setItem("mydexwarning", "1");},
  });
}


export default class WGSWAP extends Component {


    constructor(props){
       super(props);
        this.state={accountName:null,
                    
                    }
        
    }


    componentDidMount(){

      if(window.sessionStorage.getItem("mydexwarning")!=="1"){warning()}

    }
   
    render() {
      
    
            return (


              <div className='background'>
              
              
              <Header />
              <Global />
              <DexShow />
              <Footer />

           
              </div>
            )


        
        
        
    }
}
