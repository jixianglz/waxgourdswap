import React, { Component } from 'react'

import IOST from 'iost'


const rpc = new IOST.RPC(new IOST.HTTPProvider("https://api.iost.io"));
const ContractID ="Contract7xskjVLZjkJHTEVktSbRBqq68q1Up3GDecBXx4hck9yf"



export default class WGSWAP extends Component {


    constructor(props){
        super(props);
        this.state={accountName:null,
                    iostbpow:null,
                    balance_a:null,
                    balance_b:null,
                    order:null,
                    amount:null,
                    amount24h:null,
                    mined:null,
                    hawkername:'bkk_offical',
                    hawker_iostbpow:null,
                    hawker_balance_a:null,
                    hawker_balance_b:null,
                    hawker_order:null,
                    hawker_amount:null,
                    hawker_amount24h:null,
                    hawker_mined:null,
                    swap_buy_amount:null,
                    swap_buy_expect_got:null,
                    swap_sell_amount:null,
                    swap_sell_expect_got:null,
                    }
        
    }


    checkHawker=()=>{
        if('IWalletJS' in window){
        } else {
            return;
        }    
        window.IWalletJS.enable().then((account) => {
            if(!account) return; // not login  
            this.setState({
                accountName:account
            })
 
            rpc.blockchain.getContractStorage(ContractID,this.state.hawkername,'iostbpow_returnarr')
            .then((result)=>{console.log(result);
            let info=JSON.parse(result.data);
            console.log(info)
            if(info==null){return alert('没有发现hawker')}
            this.setState({
                hawker_iostbpow:info.pairKey,
                iostbpow:info.pairKey,
                hawker_balance_a:info.balance_a,
                hawker_balance_b:info.balance_b,
                hawker_order:info.order_number,
                hawker_amount:info.amount_token_a,
                hawker_amount24h:info.amount_token_a_24H,
                hawker_mined:info.WGmined,
                })
            })
          })   
      }


      getinfo=()=>{
        if('IWalletJS' in window){
        } else {
            return;
        }    
        window.IWalletJS.enable().then((account) => {
            if(!account) return; // not login  
            this.setState({
                accountName:account
            })
 
            rpc.blockchain.getContractStorage(ContractID,account,'iostbpow_returnarr')
            .then((result)=>{console.log(result);
            let info=JSON.parse(result.data);
            console.log(info)
            if(info==null){return alert('没有自己的交易所')}
            this.setState({
                iostbpow:info.pairKey,
                balance_a:info.balance_a,
                balance_b:info.balance_b,
                order:info.order_number,
                amount:info.amount_token_a,
                amount24h:info.amount_token_a_24H,
                mined:info.WGmined,

                })
            })
          })   
      }      



    componentDidMount(){

      this.getinfo()
      rpc.blockchain.getContractStorage(ContractID,'reghawkerindex')
      .then((result)=>{console.log(result)})
      rpc.blockchain.getContractStorage(ContractID,'registed_hawker','1')
      .then((result)=>{console.log(result)})
      rpc.blockchain.getContractStorage(ContractID,'iostbpow','order_number_24H')
      .then((result)=>{console.log('mart'+result.data)})


    }
    onChangeSell=(event)=> {
        let volume=(Number(this.state.hawker_balance_a)*Number(this.state.hawker_balance_b))
        let targetget=Number(this.state.hawker_balance_a)-volume/((Number(event.target.value)+Number(this.state.hawker_balance_b)))
        this.setState({swap_sell_amount:event.target.value,
                       swap_sell_expect_got:targetget.toFixed(8)
        })      
      }
    onChangeBuy=(event)=> {

        let volume=(Number(this.state.hawker_balance_a)*Number(this.state.hawker_balance_b))
        let targetget=Number(this.state.hawker_balance_b)-volume/((Number(event.target.value)+Number(this.state.hawker_balance_a)))
      

        this.setState({swap_buy_amount:event.target.value,
                       swap_buy_expect_got:targetget.toFixed(8),
        });

      }
    onChange=(event)=> {
        this.setState({swap_sell_amount:event.target.value})      
      }
    Register=()=>{
        window.IWalletJS.enable().then((account) => {
            if(!account) return; // not login                 
            const iost = window.IWalletJS.newIOST(IOST)
            const tx = iost.callABI(ContractID, 'register', [] );
            tx.gasRatio=1;
            tx.gasLimit=100000;
            tx.amount_limit = [{
                "token": "*",
                "value": 'unlimited' }];
            iost.signAndSend(tx)
            .on('pending', (trx) => {
              console.log(trx, 'trx') 
            })
            .on('success', (result) => {
              console.log(result, 'result')
              alert(result.returns)
            })
            .on('failed', (failed) => {
              console.log(failed, 'failed')
              alert(failed.message)
            })
        })  
    }

    onshelf=()=>{
        window.IWalletJS.enable().then((account) => {
            if(!account) return; // not login                 
            const iost = window.IWalletJS.newIOST(IOST)
            const tx = iost.callABI(ContractID, 'onshelf', ['iostbpow'] );
            tx.gasRatio=1;
            tx.gasLimit=100000;  //4.3w gas and 1.373 ram
            tx.amount_limit = [{
                "token": "*",
                "value": 'unlimited' }];
            iost.signAndSend(tx)
            .on('pending', (trx) => {
              console.log(trx, 'trx') 
            })
            .on('success', (result) => {
              console.log(result, 'result')
              alert(result.returns)
            })
            .on('failed', (failed) => {
              console.log(failed, 'failed')
              alert(failed.message)
            })
        })  
    }
    
    createtokenpair=()=>{
        window.IWalletJS.enable().then((account) => {
            if(!account) return; // not login                 
            const iost = window.IWalletJS.newIOST(IOST)
            const tx = iost.callABI(ContractID, 'createtokenpair', ['iost','8','bpow','8'] );
            tx.gasRatio=1;
            tx.gasLimit=100000;
            tx.amount_limit = [{
                "token": "*",
                "value": 'unlimited' }];
            iost.signAndSend(tx)
            .on('pending', (trx) => {
              console.log(trx, 'trx') 
            })
            .on('success', (result) => {
              console.log(result, 'result')
              alert(result.returns)
            })
            .on('failed', (failed) => {
              console.log(failed, 'failed')
              alert(failed.message)
            })
        })  
    }

    addliquidity=()=>{
        window.IWalletJS.enable().then((account) => {
            if(!account) return; // not login                 
            const iost = window.IWalletJS.newIOST(IOST)
            const tx = iost.callABI(ContractID, 'addliquidity', ['iostbpow','10','10'] );
            tx.gasRatio=1;
            tx.gasLimit=100000;
            tx.amount_limit = [{
                "token": "*",
                "value": 'unlimited' }];
            iost.signAndSend(tx)
            .on('pending', (trx) => {
              console.log(trx, 'trx') 
            })
            .on('success', (result) => {
              console.log(result, 'result')
              alert(result.returns)
            })
            .on('failed', (failed) => {
              console.log(failed, 'failed')
              alert(failed.message)
            })
        })  
    }

    swap_buy=()=>{
        window.IWalletJS.enable().then((account) => {
            if(!account) return; // not login                 
            const iost = window.IWalletJS.newIOST(IOST)
            const tx = iost.callABI(ContractID, 'Swap_Buy', [this.state.hawkername,this.state.iostbpow,this.state.swap_buy_amount,this.state.swap_buy_expect_got,'0.05'] );
           //const tx = iost.callABI(ContractID, 'Swap_Buy', [this.state.hawkername,this.state.iostbpow,this.state.swap_buy_amount,'0.73','0.05'] );
            tx.gasRatio=1;
            tx.gasLimit=100000; //84594 gas
            tx.amount_limit = [{
                "token": "*",
                "value": 'unlimited' }];
            iost.signAndSend(tx)
            .on('pending', (trx) => {
              console.log(trx, 'trx') 
            })
            .on('success', (result) => {
              console.log(result, 'result')
              alert(result.returns)
            })
            .on('failed', (failed) => {
              console.log(failed, 'failed')
              alert(failed.message)
            })
        })  
    }
    swap_sell=()=>{
        window.IWalletJS.enable().then((account) => {
            if(!account) return; // not login                 
            const iost = window.IWalletJS.newIOST(IOST)
            const tx = iost.callABI(ContractID, 'Swap_Sell', [this.state.hawkername,this.state.iostbpow,this.state.swap_sell_amount,this.state.swap_sell_expect_got,'0.05'] );
           
            tx.gasRatio=1;
            tx.gasLimit=100000; //84594 gas
            tx.amount_limit = [{
                "token": "*",
                "value": 'unlimited' }];
            iost.signAndSend(tx)
            .on('pending', (trx) => {
              console.log(trx, 'trx') 
            })
            .on('success', (result) => {
              console.log(result, 'result')
              alert(result.returns)
            })
            .on('failed', (failed) => {
              console.log(failed, 'failed')
              alert(failed.message)
            })
        })  
    }

    render() {
      
    
            return (


              <div className='Swapbackground'>
              
                
               <div className='Swapbackground'>Step1：注册成为摊主 
                <button onClick={this.Register}>点击注册</button>
                </div>
               <div className='Swapbackground'>Step2：上架自己的交易对 iostbpow 
               <button onClick={this.onshelf}>测试上架iostbpow</button>
                </div>
               <div className='Swapbackground'>Step3：像指定货架中增加流动性 
               <button onClick={this.addliquidity}>添加10个IOST和10个BPOW</button>

               <div className='Swapbackground'> My SWAP DEX : <button onClick={this.getinfo}>刷新数据</button>
               <br />
                 <p>交易对:{this.state.iostbpow}</p>
                 <p>iost:{this.state.balance_a}</p>
                 <p>bpow:{this.state.balance_b}</p>
                <div>我的交易单：{this.state.order}</div>
                <div>我的成交量iost：{this.state.amount}</div>
                <div>我的成24小时成交量iost：{this.state.amount24h}</div>
                <div>我的挖矿：{this.state.mined}</div>
                 
                </div>
               </div>
               <hr />

               <div className='Swapbackground'>Step1：指定一个摊主   <input type='text' placeholder="默认：bkk_offical" onChange={this.onChange} /> 
               <div style={{display:'inline-block'}} onClick={this.checkHawker}>Find</div> </div>
                          
               <div className='Swapbackground'>正在浏览 {this.state.hawkername}的交易所
               
               <p>交易对:iostbpow </p>
                 <p>iost:{this.state.hawker_balance_a}</p>
                 <p>bpow:{this.state.hawker_balance_b}</p>
               
               
                 <input type='number' placeholder='Buy' onChange={this.onChangeBuy} /> 
                 <button style={{display:'inline-block'}} onClick={this.swap_buy}>Buy</button> 
                 <div style={{display:'inline-block'}}>预计得到：{this.state.swap_buy_expect_got} Bpow</div> 
                 <br />
                 <input type='number' placeholder='Sell' onChange={this.onChangeSell} /> 
                 <button style={{display:'inline-block'}} onClick={this.swap_sell}>Sell</button>
                 <div style={{display:'inline-block'}}>预计得到：{this.state.swap_sell_expect_got} Iost</div> 
                  

               </div>
               
               
               
               <div className='Swapbackground'>Step3：随机一个摊主  </div>  
              
               <div className='Swapbackground'>Step3：买  </div>
               <div className='Swapbackground'>Step3：卖  </div>
               <div className='Swapbackground'>Step4：偷菜  </div>
               <hr />
               <div className='Swapbackground'>治理脚本(超级权限) </div>
               <div className='Swapbackground'>上架币种
               <button onClick={this.createtokenpair}>上架iostbpow</button> </div>
              </div>
            )


        
        
        
    }
}
