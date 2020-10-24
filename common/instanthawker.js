import React, { Component } from 'react'
import IOST from 'iost'

const rpc = new IOST.RPC(new IOST.HTTPProvider("https://api.iost.io"));
const ContractID ="Contract7xskjVLZjkJHTEVktSbRBqq68q1Up3GDecBXx4hck9yf"

 export default class InstantHawker extends Component {
 

  constructor(props){
    super(props);
    this.state={ 
      timer:null,
      id:this.props.id,
      tokenpair:("iost"+this.props.tokenb),
      currentprice:null,
      currentfee:null,
      }
    }



    componentDidMount(){
        this.showhawker_currentprice(this.state.id,this.state.tokenpair)
        console.log(this.state.id,this.state.currentprice)
      }

    componentWillUnmount(){
        console.log('卸载了')
        this.setState = (state, callback) => {
            return;
        }
      }


    showhawker_currentprice=(hawkerid,pairKey)=>{

    if(Number(hawkerid)>Number(this.state.HawkerNum)){return}
    if('IWalletJS' in window){
    } else {
        return;
    }    
    window.IWalletJS.enable().then((account) => {
        if(!account) return; // not login  
        this.setState({
            accountName:account
        })
        this.setState({status_hawker_checking:true})   
        rpc.blockchain.getContractStorage(ContractID,'registed_hawker',hawkerid.toString())
        .then((result)=>{
                        rpc.blockchain.getContractStorage(ContractID,result.data,pairKey+'_returnarr')
                        .then((result2)=>{
                        let arrout=JSON.parse(result2.data)
                        if(arrout==null){return}
                        if(arrout.lpr==="0"){return}      
                        this.setState({currentprice:(Number(arrout.balance_a)/Number(arrout.balance_b)).toFixed(4),
                                    currentfee:Number(arrout.fee)}) 
                        })  

        })
        })   
    }




    render(){

   return (
     <div>
        即时费率：{(100*this.state.currentfee).toFixed(2)}%  &nbsp;即时价格:{this.state.currentprice}
    </div>

  )};
};
