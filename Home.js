import React, { Component } from 'react'
import './css/home.css';
import Header from "./common/Header";
import SelectFun from "./common/Selectfun";
import Global from "./common/GlobalStatus";
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
        <h3>冬瓜金融目前处于测试阶段！[WaxGourd-Finance is currently in the testing phase！]</h3>
        <p>1. 公测期间合约均为测试合约。[Only test contract is used. not released one.]  </p>
        <p>2. 目前挖得到矿币并非WG,而是测试代币sab,届时基金会在合适的时间会回购sab。
          [ Instead of WG token,currently mined token is sab for testing. The WG foundation will then buy back the sab at the right time.]</p>
        <p>3. 当前支持的交易对不是正式上线后支持得交易对，权重也非正式上线后权重。
          [ Currently supported Token-pairs are not officially released one, also the mine/trading weight]
        </p>
        <p>4. 正式上线先开启iostwg和iostppt。上币治理投票同步开启。
          [iostwg and iostppt are the firstly supported pairs when release.Commit governance will open simultaneous to vote an new tokenpair.]
        </p>
        <p>5. 测试期间的流动性在上线后仍然可以从专门入口随时赎回。
          [After the test. the liquidity can be withdrawed from an special entrance.]
        </p>

      

      </div>
    ),
    onOk() {  window.sessionStorage.setItem("homewarning", "1");},
  });
}


export default class WGSWAP extends Component {


    constructor(props){
       super(props);
        this.state={accountName:null,
                    
                    }
        
    }


    componentDidMount(){

     if(window.sessionStorage.getItem("homewarning")!=="1"){warning()}
      

    
    }
   
    render() {
      
    
            return (


              <div className='background'>
              
              
              <Header />
              <Global />
              <SelectFun />
              <Footer />
           
              </div>
            )


        
        
        
    }
}
