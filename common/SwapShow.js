import React, { Component } from 'react'
import IOST from 'iost'
//import Swap from './tokenpair'
//import { Link } from "react-router-dom";
import { Translation  } from 'react-i18next';
import '../css/SwapShow.css';
import { Select } from 'antd';
import { Popover,message} from 'antd';
import InstHawker from './instanthawker'

import { LoadingOutlined,LoginOutlined} from '@ant-design/icons';
import { List} from 'antd';

const rpc = new IOST.RPC(new IOST.HTTPProvider("https://api.iost.io")); 
//const settingicon = require("../../images/token/write.svg")
const ContractID= 'Contract7xskjVLZjkJHTEVktSbRBqq68q1Up3GDecBXx4hck9yf'
const { Option } = Select;


const swapvert = require("../../images/token/swap-vert1.svg")
const icon_iost = require("../../images/token/iost.png");
const icon_wg = require("../../images/token/wgt.png");
const icon_ppt = require("../../images/token/ppt2.png");
const icon_tpt = require("../../images/token/TPT.png");
const icon_bpow = require("../../images/token/bpow.png");
//const icon_vost = require("../../images/token/VOST.png");
//const icon_lol = require("../../images/token/emogi.jpg");
const settingicon = require("../../images/token/write.svg")
const rateexchanger = require("../../images/token/rateexchanger.svg");

let listData = [];



export default class SwapShow extends Component {
 
  constructor(props){
    super(props);
    this.state={ accountName:null,
                 timermyswap:null,
                 HawkerNum:null,
                 Random_ID:null,
                 HawkerList:null,
                 Exrateshow:true,
                 swapset1:'iost',
                 swapset2:'sab',
                 swapdirect:'buy',
                 account_balance_iost:null,
                 account_balance_symb:null,
                 isHawker:null,
                 dexID:null,
                 dexIdinput:null,
                 dexIntro:null,
                 GlobalWGmined:null,
                 difstep:500000,
                 cur_diff_e:null,
                 cur_diff:null,
                 status_hawker_checking:true,
                 status_hawker_instant_switch:false,
                 HawkerName:null,
                 hawker_intro:null,
                 hawker_check_arr:null,
                 hawker_pairKey:null,
                 hawker_balance_a:null,
                 hawker_balance_b:null,
                 hawker_order:null,
                 hawker_amount:null,
                 hawker_amount24h:null,
                 hawker_fee:null,
                 hawker_lpr:null,
                 swap_buy_amount:null,
                 swap_buy_expect_got:null,
                 swap_sell_amount:null,
                 swap_sell_expect_got:null,
                 slippage:'0.05',
                 trade_mine_weight:null,
                 }
    }
    componentDidMount(){

        this.setState({timermyswap:setInterval(()=>{
            this.getGameInfo()
            if(this.state.accountName!= null && this.state.HawkerNum !=null) {
                let randomID=this.HawkerRandom()
                
                this.setState({Random_ID:randomID

                })
                clearInterval(this.state.timermyswap);
                console.log("timmer cleared in swap")
            }},3000)})}


    componentWillUnmount(){
        if(this.state.timermyswap!= null) {  
            clearInterval(this.state.timermyswap);            
            }
        this.setState = (state, callback) => {
            return;
            };
        }
    
     sleep=(delay)=>
        {
          var start = new Date().getTime();
          while (new Date().getTime() < start + delay);
        }
  
    handleChange=(value)=>{

            console.log(`selected sell ${value}`);
            this.setState({swapset1:value,                        
                         swapdirect:'sell'})
                        

            let tokenpairname='iost'+value;
            if('IWalletJS' in window){
            } else {
                return;
            }    
            window.IWalletJS.enable().then((account) => {
              if(!account) return; // not login  
              this.setState({
                  accountName:account
              })
              rpc.blockchain.getBalance(account,value,1)
              .then((result)=>{this.setState({account_balance_symb:(Math.floor(result.balance*10000)/10000).toString()})})
              rpc.blockchain.getContractStorage(ContractID,tokenpairname,"lprall")
              .then((result)=>{
              let info=JSON.parse(result.data);
              console.log(info);
              listData=info;
              info.sort( (a, b)=> b.lp - a.lp );
              this.checkHawker2(info[0].id,tokenpairname)
              this.setState({HawkerList:JSON.stringify(info)})
              })
          })
          }
          
    handleChange2=(value)=>{

            console.log(`selected buy ${value}`);
            this.setState({swapset2:value,
                         swapdirect:'buy'})          
            let tokenpairname='iost'+value;
            if('IWalletJS' in window){
            } else {
                return;
            }    
            window.IWalletJS.enable().then((account) => {
              if(!account) return; // not login  
              this.setState({
                  accountName:account
              })
              rpc.blockchain.getBalance(account,value,1)
              .then((result)=>{this.setState({account_balance_symb:(Math.floor(result.balance*10000)/10000).toString()})})
              rpc.blockchain.getContractStorage(ContractID,tokenpairname,"lprall")
              .then((result)=>{
              let info=JSON.parse(result.data);
              console.log(info);
              listData=info;
              info.sort( (a, b)=> b.lp - a.lp );
              this.checkHawker2(info[0].id,tokenpairname)
              this.setState({HawkerList:JSON.stringify(info)})
              })
          })
          }



    getGameInfo=()=>{

        if('IWalletJS' in window){
        } else {
            return;
        }    
        window.IWalletJS.enable().then((account) => {
            if(!account) return; // not login  
            this.setState({
                accountName:account
            })
            rpc.blockchain.getContractStorage(ContractID,'reghawkerindex')
            .then((result)=>{this.setState({HawkerNum:result.data})})
            rpc.blockchain.getContractStorage(ContractID,'iostsab',"lprall")
            .then((result)=>{
            let info=JSON.parse(result.data);
            console.log(info);
            info.sort( (a, b)=> b.lp - a.lp );
            this.checkHawker2(info[0].id,'iostsab')
            listData=info;
            this.setState({HawkerList:JSON.stringify(info)})
            })
            rpc.blockchain.getBalance(account,'iost',1)
            .then((result)=>{this.setState({account_balance_iost:(Math.floor(result.balance*10000)/10000).toString()})})

            rpc.blockchain.getBalance(account,this.state.swapset2,1)
            .then((result)=>{this.setState({account_balance_symb:(Math.floor(result.balance*10000)/10000).toString()})})

            rpc.blockchain.getContractStorage(ContractID,'TotalWGDeXvalue','wgtoken_mined')
            .then((result)=>{
              let cur_diff_e_t=Math.floor(Number(result.data)/this.state.difstep)
              let cur_diff_t=Math.pow(0.9,cur_diff_e_t)
              console.log(result.data)
              this.setState({GlobalWGmined:result.data,
                             cur_diff:cur_diff_t })})
          
        })
      }

    HawkerRandom=()=>{    
        let idrandom=1+Math.floor((Math.random()*100))%this.state.HawkerNum
        if(isNaN(idrandom))
        {
           return 
        }
        return idrandom
      }

    checkHawker2=(hawkerid,pairKey)=>{
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
                            if(arrout==null){return alert('该交易所ID未解锁交易对')}
                            if(arrout.lpr==="0"){return alert('该交易所ID没有流动性')}      
                            console.log(arrout)
                            this.setState({
                                hawker_check_arr:result2.data,
                                hawker_fee:arrout.fee,
                                hawker_balance_a:arrout.balance_a,
                                hawker_balance_b:arrout.balance_b,
                                dexID:hawkerid
                                })       
                            })  
                            rpc.blockchain.getContractStorage(ContractID,pairKey,'trade_mine_weight')
                            .then((result)=>{this.setState({trade_mine_weight:result.data})})
                            
                            rpc.blockchain.getContractStorage(ContractID,result.data,'intro')
                            .then((result3)=>{
                            this.setState({
                                hawker_intro:result3.data,
                                status_hawker_checking:false,
                                swap_buy_amount:null,
                                swap_buy_expect_got:null,
                                swap_sell_amount:null,
                                swap_sell_expect_got:null,
                                })                                  
                            })                      
            })
          })   
      }

      checkHawker=(hawkerid,pairKey)=>{
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
            
            rpc.blockchain.getContractStorage(ContractID,'registed_hawker',hawkerid.toString())
            .then((result)=>{
                            rpc.blockchain.getContractStorage(ContractID,result.data,pairKey+'_returnarr')
                            .then((result2)=>{
                            let arrout=JSON.parse(result2.data)
                            if(arrout==null){return alert('该交易所ID未解锁交易对')}
                            if(arrout.lpr==="0"){return alert('该交易所ID没有流动性')}      
                            console.log(arrout)
                            this.setState({
                                hawker_check_arr:result2.data,
                                hawker_fee:arrout.fee,
                                hawker_balance_a:arrout.balance_a,
                                hawker_balance_b:arrout.balance_b,
                                dexID:hawkerid
                                })       
                            })  
                            rpc.blockchain.getContractStorage(ContractID,pairKey,'trade_mine_weight')
                            .then((result)=>{this.setState({trade_mine_weight:result.data})})
                            
                            rpc.blockchain.getContractStorage(ContractID,result.data,'intro')
                            .then((result3)=>{
                              message.success(`ヾ(●´∀｀●)Welcom~ (进入)ID:${hawkerid}!!`)
                            this.setState({
                                hawker_intro:result3.data,
                               
                                swap_buy_amount:null,
                                swap_buy_expect_got:null,
                                swap_sell_amount:null,
                                swap_sell_expect_got:null,
                                })                                  
                            })                      
            })
          })   
      }
      

    onDexIDinput=(event)=> {

        this.setState({dexIdinput:event.target.value,
        });
      }

    onChangeSell=(event)=> {

        if(this.state.hawker_check_arr==null){return}
        let hawkerinfo=JSON.parse(this.state.hawker_check_arr)

        let volume=(Number(hawkerinfo.balance_a)*Number(hawkerinfo.balance_b))
        let targetget=Number(hawkerinfo.balance_a)-volume/((Number(event.target.value)+Number(hawkerinfo.balance_b)))
        this.setState({swap_sell_amount:event.target.value,
                       swap_sell_expect_got:targetget.toFixed(4)
        })      
      }
    onChangeBuy=(event)=> {

      if(this.state.hawker_check_arr==null){return}
      let hawkerinfo=JSON.parse(this.state.hawker_check_arr)


        let volume=(Number(hawkerinfo.balance_a)*Number(hawkerinfo.balance_b))
        let targetget=Number(hawkerinfo.balance_b)-volume/((Number(event.target.value)+Number(hawkerinfo.balance_a)))
      
        this.setState({swap_buy_amount:event.target.value,
                       swap_buy_expect_got:targetget.toFixed(4),
        });

      }
    onChangeHawkerName=(event)=> {
        this.setState({HawkerName:event.target.value})     

      }
    swap_buy=()=>{
        if(this.state.hawker_check_arr==null){return}
        if(this.state.swap_buy_amount==null || this.state.swap_buy_expect_got==null){return}
        let hawkerinfo=JSON.parse(this.state.hawker_check_arr)
        console.log(hawkerinfo)
        window.IWalletJS.enable().then((account) => {
            if(!account) return; // not login                 
            const iost = window.IWalletJS.newIOST(IOST)

            
            const tx = iost.callABI(ContractID, 'Swap_Buy', [hawkerinfo.hawername,hawkerinfo.pairKey,this.state.swap_buy_amount,this.state.swap_buy_expect_got,this.state.slippage] );

            tx.gasRatio=1;
            tx.gasLimit=120000; //84594 gas
            tx.amount_limit = [{
                "token": "*",
                "value": 'unlimited' }];
            iost.signAndSend(tx)
            .on('pending', (trx) => {
              console.log(trx, 'trx') 
              message.loading(' 努力撮合中 ☜(ˆ▽ˆ), in progress..',4)
            })
            .on('success', (result) => {
              console.log(result, 'result')
              message.success('Swap 成功(○^～^○) [ Swap Sucess ]',4)
            })
            .on('failed', (failed) => {
              console.log(failed, 'failed')
              message.error(failed.message+'失败 1. 请查看gas或者ram是否充足 2. slipage错误代码说明有人先下手了. 3. 若未解决请联系管理员',4)
            })
        })  
    }
    swap_sell=()=>{

        if(this.state.hawker_check_arr==null){return}
        if(this.state.swap_sell_amount==null || this.state.swap_sell_expect_got==null){return}
        let hawkerinfo=JSON.parse(this.state.hawker_check_arr)
        console.log(hawkerinfo)
        window.IWalletJS.enable().then((account) => {
            if(!account) return; // not login                 
            const iost = window.IWalletJS.newIOST(IOST)
            const tx = iost.callABI(ContractID, 'Swap_Sell', [hawkerinfo.hawername,hawkerinfo.pairKey,this.state.swap_sell_amount,this.state.swap_sell_expect_got,this.state.slippage] );
           
            tx.gasRatio=1;
            tx.gasLimit=120000; //84594 gas
            tx.amount_limit = [{
                "token": "*",
                "value": 'unlimited' }];
            iost.signAndSend(tx)
            .on('pending', (trx) => {
              console.log(trx, 'trx') 
              message.loading(' 努力撮合中 ☜(ˆ▽ˆ), in progress..',4)
            })
            .on('success', (result) => {
              console.log(result, 'result')
              
              message.success('Swap 成功(○^～^○) [ Swap Sucess ]',4)
            })
            .on('failed', (failed) => {
              console.log(failed, 'failed')
              message.error(failed.message+'失败 1. 请查看gas或者ram是否充足 2. slipage错误代码说明有人先下手了. 3. 若未解决请联系管理员',4)
            })
        })  
    }

    swap_tk_pair_ab=()=>{
      let temp=this.state.swapdirect==="buy"?"sell":"buy"
      let swset1=this.state.swapset1
      let swset2=this.state.swapset2
      if(temp==="buy"){
        this.setState({swapdirect:temp,
                      swapset1:swset2, 
                      swapset2:swset1,          
                      })
                    }
      if(temp==="sell"){
        this.setState({swapdirect:temp,
                      swapset1:swset2, 
                      swapset2:swset1,     

                      })
                    }   
      

      console.log(temp+this.state.swapset1+this.state.swapset2)
    }



    render(){


        return (
    <div>

    <div className='SwapDash'>
        <div><Translation>
      { t => <div >{t('C2C Swap')}</div>}  
      </Translation></div> 
     <div style={{border:"solid",borderColor:"#009966",borderWidth:"thin"}}></div>
        


     
      <div className="swap_main">
     
            <div className="swap_hawker_info">

              <div style={{display:"inline-flex"}}> <div><Translation>{ t => <div >{t('DexID')}</div>}</Translation></div> 
                :<span className="swapstatus-span">{this.state.dexID}</span>
             
                <div className={this.state.status_hawker_checking?'swaphide':'checkidset'}>
                  <Popover placement="bottomLeft" 
                          title={<div><Translation>{ t => <div  >{t('Input DexID')}</div>}</Translation></div> } 
                          content={  
                              <div><input type='number' placeholder={"Max:"+this.state.HawkerNum} className="inputdexset" onChange={this.onDexIDinput} />
                              <button onClick={(e)=>{let a='iost'+(this.state.swapdirect==="buy"?this.state.swapset2:this.state.swapset1);this.checkHawker2(this.state.dexIdinput,a)}} className="btndexset">
                              <div><Translation>{ t => <div  >{t('Lookup')}</div>}</Translation></div>
                                </button></div>  
                              } 
                          trigger="click">
                  <img src={settingicon} alt="" width="100%" height="100%"></img>
                 
                </Popover>
              </div>
             
              </div>
              
              
              <div><div style={{display:"inline-flex"}}> <div><Translation>{ t => <div >{t('DexAnnouance')}</div>}</Translation></div> 
                :<span className="swapstatus-span">{this.state.hawker_intro}</span>
              </div> </div>
             
              <div><div style={{display:"inline-flex"}}> <div><Translation>{ t => <div >{t('DexFee')}</div>}</Translation></div> 
              :<span className="swapstatus-span">{(this.state.hawker_fee*100).toFixed(2)}%</span>
              </div></div>

              <div><div style={{display:"inline-flex"}}> <div><Translation>{ t => <div >{t('DexLiquidity')}</div>}</Translation></div> 
              :<span className="swapstatus-span">{Number(this.state.hawker_balance_a).toFixed(4)} iost + {Number(this.state.hawker_balance_b).toFixed(4)} {this.state.swapdirect==="buy"?this.state.swapset2:this.state.swapset1}</span>
              </div></div>
              
              <div className={this.state.Exrateshow?"":"swaphide"}><div style={{display:"inline-flex"}}> <div><Translation>{ t => <div >{t('IdealExchangeRate')}</div>}</Translation></div> 
              :<span onClick={()=>{let t=!this.state.Exrateshow;this.setState({Exrateshow:t})}} className="swapstatus-span">{1} iost : {Number(this.state.hawker_balance_b/this.state.hawker_balance_a).toFixed(4)} {this.state.swapdirect==="buy"?this.state.swapset2:this.state.swapset1} 
              <div style={{display:"inline-block",weight:"0.7rem",height:"0.7rem"}}><img src={rateexchanger} alt="" width="100%" height="100%"></img></div>
              </span> 
              </div></div>
              <div className={this.state.Exrateshow?"swaphide":""}><div style={{display:"inline-flex"}}> <div><Translation>{ t => <div >{t('IdealExchangeRate')}</div>}</Translation></div> 
              :<span onClick={()=>{let t=!this.state.Exrateshow;this.setState({Exrateshow:t})}} className="swapstatus-span">{Number(this.state.hawker_balance_a/this.state.hawker_balance_b).toFixed(4)} iost : {1} {this.state.swapdirect==="buy"?this.state.swapset2:this.state.swapset1} 
              <div style={{display:"inline-block",weight:"0.7rem",height:"0.7rem"}}><img src={rateexchanger} alt="" width="100%" height="100%"></img></div>
              </span>          
              </div></div>  
            </div>
            
             {/* swap 面板 */}
            <div className="SwapBox">
              <div className="SwapinputContainer"> 
                    <div className="Swapinput_head">
                      <div><Translation>{ t => <div >{t('From')}</div>}</Translation>
                      <Translation>{ t => <span >{t('Balance')}</span>}</Translation>:{this.state.swapdirect==="buy"?this.state.account_balance_iost:this.state.account_balance_symb}
                      </div>         
                    </div>     
                    <div className={this.state.swapdirect==='buy'?"Swapinput_head":"swaphide"}>
                      <input className="Swapinput" type='number' placeholder='0.0' onChange={this.state.swapdirect==='buy'?this.onChangeBuy:this.onChangeSell} /> 
                      <Select  loading={this.state.status_hawker_checking} size={'large'} disabled defaultValue="iost" bordered={false} className="Swap_sel_style">
                      <Option value="iost"> <img className='swaptokensym' src={icon_iost} alt="" width="100%" height="100%"></img>iost</Option>
                      </Select>
                    </div> 
                    <div className={this.state.swapdirect==='sell'?"Swapinput_head":"swaphide"}>
                      <input className="Swapinput" type='number' placeholder='0.0' onChange={this.state.swapdirect==='buy'?this.onChangeBuy:this.onChangeSell} /> 
                      <Select loading={this.state.status_hawker_checking} size={'large'} disabled={this.state.status_hawker_checking} value={this.state.swapset1} bordered={false} className="Swap_sel_style" onChange={this.handleChange}>  
                      <Option value="sab"> <img className='swaptokensym' src={icon_wg} alt="" width="100%" height="100%"></img>wg</Option>
                      <Option value="bpow"><img className='swaptokensym' src={icon_bpow} alt="" width="100%" height="100%"></img>bpow</Option>
                      <Option value="ppt"><img className='swaptokensym' src={icon_ppt} alt="" width="100%" height="100%"></img>ppt</Option>
                      <Option value="tpt"><img className='swaptokensym' src={icon_tpt} alt="" width="100%" height="100%"></img>tpt</Option>
                      </Select>
                    </div> 
            </div>

              <div  onClick={this.swap_tk_pair_ab} className="swapverticon"><img src={swapvert} alt="" width="100%" height="100%"></img></div>         
              
              <div className="SwapinputContainer">   
                    <div className="Swapinput_head">
                      <div><Translation>{ t => <div >{t('To(Expect)')}</div>}</Translation></div>    
                    </div>
                    <div className={this.state.swapdirect==='buy'?"Swapinput_head":"swaphide"}>
                      <input className="Swapinput" disabled="disabled" type='number' placeholder={this.state.swapdirect==='buy'?this.state.swap_buy_expect_got:'0.0'} onChange={this.state.swapdirect==='buy'?this.onChangeBuy:this.onChangeSell} />    
                      <Select loading={this.state.status_hawker_checking} size={'large'} disabled={this.state.status_hawker_checking}  value={this.state.swapset2} bordered={false} className="Swap_sel_style" onChange={this.handleChange2}>
                      <Option value="sab"> <img className='swaptokensym' src={icon_wg} alt="" width="100%" height="100%"></img>wg</Option>
                      <Option value="bpow"><img className='swaptokensym' src={icon_bpow} alt="" width="100%" height="100%"></img>bpow</Option>
                      <Option value="ppt"><img className='swaptokensym' src={icon_ppt} alt="" width="100%" height="100%"></img>ppt</Option>
                      <Option value="tpt"><img className='swaptokensym' src={icon_tpt} alt="" width="100%" height="100%"></img>tpt</Option> 
                      </Select>
                    </div>
                    <div className={this.state.swapdirect==='sell'?"Swapinput_head":"swaphide"}>
                      <input className="Swapinput" disabled="disabled" type='number' placeholder={this.state.swapdirect==='buy'?this.state.swap_buy_expect_got:this.state.swap_sell_expect_got} onChange={this.state.swapdirect==='buy'?this.onChangeBuy:this.onChangeSell} />    
                      <Select  loading={this.state.status_hawker_checking} size={'large'} disabled defaultValue="iost" bordered={false} className="Swap_sel_style">
                      <Option value="iost"> <img className='swaptokensym' src={icon_iost} alt="" width="100%" height="100%"></img>iost</Option>
                      </Select>
                    </div>
                    <div className={this.state.swapdirect==='buy'?"swap_slip":"swaphide"}> 
                      <div className="swap_slip2"><Translation>{ t => <div >{t('Cur_Slippage')}</div>}</Translation>
                      <span className={(100*Math.abs(1-((Number(this.state.swap_buy_amount)/Number(this.state.swap_buy_expect_got))/(this.state.hawker_balance_a/this.state.hawker_balance_b))))>5?'split_red':'split_green'}>
                        :{(100*Math.abs(1-((Number(this.state.swap_buy_amount)/Number(this.state.swap_buy_expect_got))/(this.state.hawker_balance_a/this.state.hawker_balance_b)))).toFixed(2)}%</span>
                      </div>
                    </div>
                    <div className={this.state.swapdirect==='sell'?"swap_slip":"swaphide"}> 
                      <div className="swap_slip2"><Translation>{ t => <div >{t('Cur_Slippage')}</div>}</Translation>
                      <span className={(100*Math.abs(1-((Number(this.state.swap_sell_expect_got)/Number(this.state.swap_sell_amount))/(this.state.hawker_balance_a/this.state.hawker_balance_b))))>5?'split_red':'split_green'}>
                        :{(100*Math.abs(1-((Number(this.state.swap_sell_expect_got)/Number(this.state.swap_sell_amount))/(this.state.hawker_balance_a/this.state.hawker_balance_b)))).toFixed(2)}% </span>
                      </div>
                    </div>

              </div>


              <div className="swap_expect_info1"> 
                 <div className="swap_expect_info2"><Translation>{ t => <div >{t('PayFee')}</div>}</Translation>
                 <span className={this.state.swapdirect==="buy"?"":"swaphide"}>:{(Number(this.state.swap_buy_amount)*Number(this.state.hawker_fee)).toFixed(4)} iost</span>
                 <span className={this.state.swapdirect==="sell"?"":"swaphide"}>:{(Number(this.state.swap_sell_expect_got)*Number(this.state.hawker_fee)).toFixed(4)} iost</span>
                 </div>
                 <div className="swap_expect_info2"><Translation>{ t => <div >{t('WGtoMine')}</div>}</Translation>
                 <span className={this.state.swapdirect==="buy"?"":"swaphide"}>:{(Number(this.state.swap_buy_amount)*Number(this.state.hawker_fee)*0.5*this.state.cur_diff*this.state.trade_mine_weight).toFixed(4)} wg (weight:{100*this.state.trade_mine_weight})</span>
                 <span className={this.state.swapdirect==="sell"?"":"swaphide"}>:{(Number(this.state.swap_sell_expect_got)*Number(this.state.hawker_fee)*0.5*this.state.cur_diff*this.state.trade_mine_weight).toFixed(4)} wg (weight:{100*this.state.trade_mine_weight})</span>
                 </div>
              </div>

              <button className={(this.state.swapdirect==="buy" && this.state.status_hawker_checking===false)?"btnswap":"swaphide"} onClick={this.swap_buy} >Swap </button>
              <button className={(this.state.swapdirect==="sell"&& this.state.status_hawker_checking===false)?"btnswap":"swaphide"} onClick={this.swap_sell} >Swap </button>
              <button className={this.state.status_hawker_checking?"btnswap":"swaphide"} ><LoadingOutlined />Loading</button>
            </div>

            {/* 订单簿 面板 */}


            <div className="book_dash">
 
                  <div className="book_hawkerbox">
                  <List
                    itemLayout="vertical"
                    size="small"
                    pagination={{
                      onChange: page => {
                        console.log(page);
                        this.setState({status_hawker_instant_switch:true},
                          () => {
                            this.sleep(200)
                           
                            this.setState({status_hawker_instant_switch:false})
                          
                        })
                        
                      },
                      pageSize: 5,
                      
                    }}
                    dataSource={listData}
                    header={
                      <div>
                        <b>按流动性高低排名</b> iost/{this.state.swapdirect==="buy"?this.state.swapset2:this.state.swapset1} 
                      </div>
                    }
                    footer={
                      <b>价格均为每标的价格</b>
                    }
                    renderItem={item => (
                    <List.Item
                    >
                   
                   <div className="book_hawkerbox_1">
                        <div style={{width:"85%"}}>
                       <span>ID:{item.id} &nbsp; </span> <span>LP:{item.lp} &nbsp;</span> <span>挂单价格:{(item.bl/(item.lp*item.lp/item.bl)).toFixed(4)} </span>
                       </div>
                       <div className='goinhawker' onClick={(e)=>{let a='iost'+(this.state.swapdirect==="buy"?this.state.swapset2:this.state.swapset1);this.checkHawker(item.id,a)}}>
                       <LoginOutlined />
                      </div>
                  </div>
                   
                   <div className="book_hawkerbox_2">
                      {(this.state.status_hawker_instant_switch||this.state.status_hawker_checking)?"即时费率：--%  即时价格:--":
                      <InstHawker id={item.id} tokenb= {this.state.swapdirect==="buy"?this.state.swapset2:this.state.swapset1}/>
                        }
                        </div>


                   </List.Item>
                  
                   
                  
                  )}

                  />
                  </div>
            </div>
     
      </div>

    <div>


    </div>




    </div>
        

    </div>
         )};

}

