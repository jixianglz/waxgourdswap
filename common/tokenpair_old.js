import React, { Component } from 'react';
import '../css/dextokenpair.css';
import IOST from 'iost'
import { Translation  } from 'react-i18next';


const rpc = new IOST.RPC(new IOST.HTTPProvider("https://api.iost.io"));
const ContractID ="Contract7xskjVLZjkJHTEVktSbRBqq68q1Up3GDecBXx4hck9yf"

const addicon = require("../../images/token/addicon.svg")
const addsym = require("../../images/token/addsym.svg")
const mineicon = require("../../images/token/mineicon.svg")
const blacklisticon = require("../../images/token/blacklisticon.svg")
const settingicon = require("../../images/token/settingicon.svg")
const swap_horiz = require("../../images/token/swap_horiz.svg")
const token_iost = require("../../images/token/iost.png");
const token_wg = require("../../images/token/wgt.png");

export default class tkpair extends Component {
    constructor(props){
        super(props);
        this.state={
           status:this.props.msg,
           isunkonw:this.props.isUnkonw,
           difstep:500000,
           //
           settingdash:false,
           addliquiditydash:false,
           minedash:false,
           blacklistdash:false,
           defaultdash:true,
           //
           timermydextokenpair:null,
           makerminetimer:null,
           //
           isOnshelf:true,
           tokenpairname:("iost"+this.props.tokenpairname),
           returnarr:null,      
           pairname:null,
           balance_a:null,
           balance_b:null,
           order:null,
           amount:null,
           amount24h:null,
           poolmined:null,
           fee:null,
           //
           pool_token_a:null,
           pool_token_b:null,
           //
           nadd_syma:null,
           nadd_symb:null,
           addtarget:"",
           //
           maker_mine_weight:null,
           maker_ratio:1,
           GlobalWGmined:null,
           cur_diff_e:null,
           cur_diff:null,
           WGowed:0.00000000,
           wg2wd_time:null,
           lpr:0,
           timefactor:0,
           DailyMine:0.0000,
           //
           account_balance_a:0,
           account_balance_b:0,
           lastpledgeiost:0,
           lastpledgesymb:0,
           contract_lpr:0,
           //setting
           hawker_feeinput_text:null,
        }
 
    }

        componentDidMount(){
        this.setState({timermydextokenpair:setInterval(()=>{
            this.getInfo()
            if(this.state.accountName!= null && this.state.pool_token_a!=null && this.state.pool_token_b!=null 
                && this.state.returnarr!=null && this.state.GlobalWGmined!=null
                
                ) {
                clearInterval(this.state.timermydextokenpair);
                let mylpr=(Math.sqrt((this.state.balance_a*this.state.balance_b)/(this.state.pool_token_a*this.state.pool_token_b)))
             //   let mylpr2=Math.sqrt((this.state.balance_a*this.state.balance_b))/Math.sqrt((this.state.pool_token_a*this.state.pool_token_b))
             // console.log(mylpr)
            //  console.log(mylpr2)
                let datanow= new Date().valueOf()
                let dataremain=(datanow/1000-Number(this.state.wg2wd_time)/1000000000)
                let cur_diff_e_t=Math.floor(this.state.GlobalWGmined/this.state.difstep)
                let cur_diff_t=Math.pow(0.9,cur_diff_e_t)

                let dailyminetemp=((Math.sqrt(2*this.state.pool_token_a)*cur_diff_t*this.state.maker_mine_weight*this.state.maker_ratio)).toFixed(4)
              
                this.setState({lpr:mylpr,
                                timefactor:dataremain,
                                cur_diff_e:cur_diff_e_t,
                                cur_diff:cur_diff_t,
                                DailyMine:dailyminetemp,
                                makerminetimer:setInterval(()=>{                     
                                    let datanow= new Date().valueOf()
                                    let dataremain=(datanow/1000-Number(this.state.wg2wd_time)/1000000000)

                                    let WGowedtemp=((Math.sqrt(2*this.state.pool_token_a)*this.state.cur_diff*this.state.maker_mine_weight*this.state.maker_ratio)*this.state.lpr*this.state.timefactor/86400).toFixed(8);
                                    this.setState({WGowed:WGowedtemp,
                                        timefactor:dataremain,
                                        })   
                                },1000)
                            
                            })          
                console.log("timmer cleared in tokenpair")
            }},3000)})}

            
        componentWillUnmount(){
      
        if(this.state.timermydextokenpair!= null) { clearInterval(this.state.timermydextokenpair); }  
        if(this.state.makerminetimer!= null) {  clearInterval(this.state.makerminetimer); } 
  
        console.log("alltimeerclose")
        this.setState = (state, callback) => {
            return;
            };

        }
    
        onChange_add_syma=(event)=> {

            let wgprice=(this.state.pool_token_a/this.state.pool_token_b)
            if(!isNaN(wgprice)){
            
            let targetget=Number(event.target.value)/wgprice
            this.setState({nadd_syma:event.target.value,
                           addtarget:targetget.toFixed(4),
            });}

            if(isNaN(wgprice)){
                this.setState({nadd_syma:event.target.value,
            });}
          }
        onChange_add_symb=(event)=> {

            let wgprice=(this.state.pool_token_a/this.state.pool_token_b)
            if(!isNaN(wgprice)){
            let targetget=Number(event.target.value)*wgprice
            this.setState({nadd_symb:event.target.value,
                           addtarget:targetget.toFixed(4),
            });}
            if(isNaN(wgprice)){
                this.setState({nadd_symb:event.target.value,
            });}
          }

        onshelf=()=>{
            if('IWalletJS' in window){} else {return;}  
            window.IWalletJS.enable().then((account) => {
                if(!account) return; // not login                 
                const iost = window.IWalletJS.newIOST(IOST)
                const tx = iost.callABI(ContractID, 'onshelf', [this.state.tokenpairname] );
                tx.gasRatio=1;
                tx.gasLimit=150000;  //4.3w gas and 1.373 ram
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
            if('IWalletJS' in window){} else {return;}  

            if(this.state.nadd_syma==null || this.state.nadd_symb==null)

            return alert("invalid number input")

            window.IWalletJS.enable().then((account) => {
                if(!account) return; // not login                 
                const iost = window.IWalletJS.newIOST(IOST)
                const tx = iost.callABI(ContractID, 'addliquidity', [this.state.tokenpairname,(this.state.nadd_syma).toString(),(this.state.nadd_symb).toString()] );
                tx.gasRatio=1;
                tx.gasLimit=200000;
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
        withdrawallliquidity=()=>{
            if('IWalletJS' in window){} else {return;}  

            window.IWalletJS.enable().then((account) => {
                if(!account) return; // not login                 
                const iost = window.IWalletJS.newIOST(IOST)
                const tx = iost.callABI(ContractID, 'HawkerWithdraw', [this.state.tokenpairname] );
                tx.gasRatio=1;
                tx.gasLimit=150000;
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

        maker_mine_widthdraw=()=>{
            if('IWalletJS' in window){} else {return;}  
            window.IWalletJS.enable().then((account) => {
                if(!account) return; // not login                 
                const iost = window.IWalletJS.newIOST(IOST)
                const tx = iost.callABI(ContractID, 'MineMakerWithdraw', [this.state.tokenpairname] );
                tx.gasRatio=1;
                tx.gasLimit=150000;  //
                tx.amount_limit = [{
                    "token": "*",
                    "value": 'unlimited' }];
                iost.signAndSend(tx)
                .on('pending', (trx) => {
                  console.log(trx, 'trx') 
                })
                .on('success', (result) => {
                  console.log(result, 'result')
                  alert("sucess ^^")
                })
                .on('failed', (failed) => {
                  console.log(failed, 'failed')
                  alert(failed.message)
                })
            })  
        }

        onChange=(event)=> {
            this.setState({swap_sell_amount:event.target.value})      
          }
    
        getInfo=()=>{

        if('IWalletJS' in window){
        } else {
            return;
        }    
        window.IWalletJS.enable().then((account) => {
            if(!account) return; // not login  
            this.setState({
                accountName:account,
                
            })


            rpc.blockchain.getContractStorage(ContractID,this.state.tokenpairname,'pool_token_a')
            .then((result)=>{this.setState({pool_token_a:result.data})})
            rpc.blockchain.getContractStorage(ContractID,this.state.tokenpairname,'pool_token_b')
            .then((result)=>{this.setState({pool_token_b:result.data})})
            rpc.blockchain.getContractStorage(ContractID,this.state.tokenpairname,'maker_mine_weight')
            .then((result)=>{this.setState({maker_mine_weight:result.data})})
            rpc.blockchain.getContractStorage(ContractID,'TotalWGDeXvalue','wgtoken_mined')
            .then((result)=>{this.setState({GlobalWGmined:result.data})})

            rpc.blockchain.getBalance(account,'iost',1)
            .then((result)=>{this.setState({account_balance_a:(Math.floor(result.balance*100)/100).toString()})})
            rpc.blockchain.getBalance(account,this.props.tokenpairname,1)
            .then((result)=>{this.setState({account_balance_b:(Math.floor(result.balance*100)/100).toString()})})


            rpc.blockchain.getContractStorage(ContractID,account,this.state.tokenpairname+"_returnarr")
            .then((result)=>{this.setState({returnarr:result.data});
                let info=JSON.parse(result.data);
                console.log(info)
                if(info==null){
                    this.setState({isOnshelf:null})
                    return}
                this.setState({
                    pairname:info.pairKey,
                    balance_a:info.balance_a,
                    balance_b:info.balance_b,
                    order:info.order_number,
                    amount:info.amount_token_a,
                    amount24h:info.amount_token_a_24H,
                    mined:info.WGmined,
                    wg2wd_time:info.wg2wd_time,
                    lastpledgesymb:info.lastpledgesymb,
                    lastpledgeiost:info.lastpledgeiost,
                    fee:info.fee,
                    })
            })
        
        })
          }

        onFeeGet=(event)=> {

            this.setState({hawker_feeinput_text:event.target.value,
            });
          }
        dexSet=(par1,par2,par3)=>{
            
            let npar2=Number(par2)/100
            console.log(npar2)
            if(Number(npar2)<0.001 || Number(npar2)>0.04){return alert('Exceed 0.2%~2%')}
            if(par1 ==="setfee"){
                  if('IWalletJS' in window){} else {return;}  
                  window.IWalletJS.enable().then((account) => {
                        if(!account) return; // not login                 
                        const iost = window.IWalletJS.newIOST(IOST)
                        const tx = iost.callABI(ContractID, 'DexSet', [par1,npar2.toFixed(4),par3] );
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




          } 



    render() {

        if(this.state.tokenpairname){
            let iconUrl = require("../../images/token/iost.png");

                if(this.props.tokenpairname==="sab"){iconUrl = require("../../images/token/wgt.png");}
                if(this.props.tokenpairname==="ppt"){iconUrl = require("../../images/token/ppt2.png");}
                if(this.props.tokenpairname==="tpt"){iconUrl = require("../../images/token/TPT.png");}
                if(this.props.tokenpairname==="bpow"){iconUrl = require("../../images/token/bpow.png");}
                if(this.props.tokenpairname==="vost"){iconUrl = require("../../images/token/VOST.png");}
                if(this.props.tokenpairname==="lol"){iconUrl = require("../../images/token/emogi.jpg");}


            return(
            <div>
                <div className='tokenpair'>
                    <div className="card">
                        <div className="card-1">
                                <div className='tokensym'><img src={iconUrl} alt="" width="100%" height="100%"></img></div>
                                
                                <div className='tokensym2'><img src={swap_horiz} alt="" width="100%" height="100%"></img></div>
                                <div className='tokensym'><img src={token_iost} alt="" width="85%" height="85%"></img></div>
                                    <div className="container">
                                    <div><Translation>
                                    { t => <div style={{textAlign:"center"}} >{t('Balance')}</div>}  
                                    </Translation></div> 
                                        <div>Iost:{this.state.balance_a}</div>
                                        <div>{this.props.tokenpairname}:{this.state.balance_b}</div>
                                        <div>My Price:{(this.state.balance_a/this.state.balance_b).toFixed(2)} iost/{this.props.tokenpairname}</div>
                                        <div>WG Price:{(this.state.pool_token_a/this.state.pool_token_b).toFixed(2)} iost/{this.props.tokenpairname}</div>
                                    </div>
                        </div>  
                        <div className={(this.state.isOnshelf)?"hide":""}> 
                            <div style={{margin:"auto"}}>
                            <div><div className="btn"><span onClick={this.onshelf}>
                            <div><Translation>
                            { t => <div  >{t('Unlock')}</div>}  
                            </Translation></div> 
                            </span></div><div><Translation>
                            { t => <div style={{fontSize:"0.5rem"}}  >{t('Need Register Before')}</div>}  
                            </Translation></div> </div></div>
                        </div>
                        <div className={(this.state.isOnshelf)?"card-2":"hide"}>
                             <div><Translation>
                            { t => <div>{t('TokenPair')}:<span className="pairstatus-span">{this.state.tokenpairname}</span></div>}  
                            </Translation></div>
                            <div><Translation>
                           { t => <div>{t('LP(Ratio)')}:<span className="pairstatus-span">{(Math.sqrt(this.state.balance_a*this.state.balance_b)).toFixed(4)}
                           ({(this.state.lpr*100).toFixed(2)}%)</span></div>}  
                            </Translation> </div> 
                            <div><Translation>
                            { t => <div>{t('Volume')}:<span className="pairstatus-span">{this.state.order}</span></div>}  
                            </Translation></div>
                            <div><Translation>
                            { t => <div>{t('Amount')}:<span className="pairstatus-span">{this.state.amount}</span></div>}  
                            </Translation></div>
                            <div><Translation>
                            { t => <div>{t('24HAmount')}:<span className="pairstatus-span">{this.state.amount24h}</span></div>}  
                            </Translation></div>
                            <div><Translation>
                            { t => <div>{t('WGMined')}:<span className="pairstatus-span">{this.state.mined}</span></div>}  
                            </Translation></div>

                        </div>  
                    </div>
                            
                   <div style={{}}>
                   <div style={{cursor: "pointer"}} onClick={()=>{
                        this.state.defaultdash?
                       this.setState({settingdash:true,addliquiditydash:false,minedash:false,blacklistdash:false,defaultdash:false})
                       :this.setState({settingdash:false,addliquiditydash:false,minedash:false,blacklistdash:false,defaultdash:true})
                    }}><div className='iconsettingstyle'><img src={settingicon} alt="" width="100%" height="100%"></img></div></div>

                     <div style={{cursor: "pointer"}} onClick={()=>{
                        this.state.defaultdash?
                         this.setState({settingdash:false,addliquiditydash:true,minedash:false,blacklistdash:false,defaultdash:false})
                         :this.setState({settingdash:false,addliquiditydash:false,minedash:false,blacklistdash:false,defaultdash:true})
                    }}><div className='iconsettingstyle'><img src={addicon} alt="" width="100%" height="100%"></img></div></div>

                    <div style={{cursor: "pointer"}} onClick={()=>{
                        this.state.defaultdash?
                        this.setState({settingdash:false,addliquiditydash:false,minedash:true,blacklistdash:false,defaultdash:false})
                        :this.setState({settingdash:false,addliquiditydash:false,minedash:false,blacklistdash:false,defaultdash:true})
                    }}><div className='iconsettingstyle'><img src={mineicon} alt="" width="100%" height="100%"></img></div></div>

                    <div style={{cursor: "pointer"}} onClick={()=>{
                    this.state.defaultdash?   
                    this.setState({settingdash:false,addliquiditydash:false,minedash:false,blacklistdash:true,defaultdash:false})
                    :this.setState({settingdash:false,addliquiditydash:false,minedash:false,blacklistdash:false,defaultdash:true})
                     }}><div className='iconsettingstyle'><img src={blacklisticon} alt="" width="100%" height="100%"></img></div></div>



                    </div>
                </div>

                
                <div className={this.state.settingdash?"Tokensetting":'tokenpairsettinghide'}>
                    <div>
                    <div style={{display:"inline-flex"}}><Translation>{ t => <div  >{t('CurrentPairFee')}</div>}</Translation>：{this.state.fee*100}%</div>
                    
                    <div><input className="inputdexset" placeholder="0.2%~2%"onChange={this.onFeeGet}type="text"/>
                            <button onClick={(e)=>this.dexSet("setfee",this.state.hawker_feeinput_text,this.state.tokenpairname)} className="btndexset">
                            <div><Translation>{ t => <div  >{t('Modify')}</div>}</Translation></div>
                            </button></div>  
                            <br/>
                    </div>
                </div>
                
                <div className={this.state.addliquiditydash?"Tokensetting":'tokenpairsettinghide'}>
                
               
                <div style={{display:"inline-flex",fontSize:"0.4rem"}}><Translation>
                    { t => <div>{t('RecommendRatio')}</div>}  
                    </Translation>&nbsp;
                    <span style={{color:"#993333"}}>1:{(this.state.pool_token_b/this.state.pool_token_a).toFixed(2)}</span></div>


                <div className="settingadd">
                    <button onClick={this.addliquidity} className="settingbutton_add">
                    <div><Translation>
                    { t => <div>{t('Add Liquidity')}</div>}  
                    </Translation></div>
                    </button>

                <div><div>my iost<div style={{fontSize:"0.4rem"}}>{this.state.account_balance_a}</div></div><input placeholder={"IOST:"+this.state.addtarget} value={this.state.nadd_syma?this.state.nadd_syma:''} onChange={this.onChange_add_syma} type="Number"  min="0" className="settinginput" /></div>
                    <div className='iconsettingstyle'><img src={addsym} alt="" width="100%" height="100%"></img></div>
                    <div><div>my {this.props.tokenpairname}<div style={{fontSize:"0.4rem"}}>{this.state.account_balance_b}</div></div><input placeholder={this.props.tokenpairname+":"+this.state.addtarget} value={this.state.nadd_symb?this.state.nadd_symb:''} onChange={this.onChange_add_symb}  min="0" type="Number" className="settinginput" /></div>
                   
                   
                    <button onClick={this.withdrawallliquidity} className="settingbutton_add">
                    <div style={{color:"#FFFFCC"}}><Translation>
                    { t => <div>{t('WithDraw All')}</div>}  
                    </Translation></div>
                    </button>
                </div>

                </div>

                <div className={this.state.minedash?"Tokensetting":'tokenpairsettinghide'}>
                
                <div>
                <div><Translation>
                { t => <div>{t('Pool Daily Yield')}:<span >{this.state.DailyMine}</span></div>}  
                 </Translation></div>
                 <div><Translation>
                { t => <div>{t('MineWeight')}:<span >{this.state.maker_mine_weight}</span></div>}  
                 </Translation></div>


                <button className="settingbutton" onClick={this.maker_mine_widthdraw}>
                
                <div><Translation>
                { t => <div>{t('WithDraw')}:<span className="pairstatus-span">{this.state.WGowed}<img className="minesymwg" src={token_wg} alt="" width="100%" height="100%"></img></span></div>}  
                 </Translation></div>
                </button>
                </div>
                
                </div>

                <div className={this.state.blacklistdash?"Tokensetting":'tokenpairsettinghide'}>
                     <div>[Incoming]</div>   
                </div>
                <div className={this.state.defaultdash?"Tokensetting":'tokenpairsettinghide'}>
                     <div></div>   
                </div>
            </div>  
             )
        }
       

        return (   
            <div>
            
            
            <div className='tokenpair'>
            
             <div>NAN</div>


            </div>
            
            </div>  
            
        )
    }
}

