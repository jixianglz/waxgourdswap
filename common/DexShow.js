import React, { Component } from 'react'
import IOST from 'iost'
import Goods from './tokenpair'
//import { Link } from "react-router-dom";
import { Translation  } from 'react-i18next';
import { Popover,Select,message} from 'antd';
import { LoadingOutlined} from '@ant-design/icons';



//import { RightCircleOutlined} from '@ant-design/icons';
import '../css/DexShow.css';
const rpc = new IOST.RPC(new IOST.HTTPProvider("https://api.iost.io")); 
const settingicon = require("../../images/token/write.svg")
const ContractID= 'Contract7xskjVLZjkJHTEVktSbRBqq68q1Up3GDecBXx4hck9yf'

const swap_horiz = require("../../images/token/swap_horiz.svg")
const icon_iost = require("../../images/token/iost.png");
const icon_wg = require("../../images/token/wgt.png");
const icon_ppt = require("../../images/token/ppt2.png");
const icon_tpt = require("../../images/token/TPT.png");
const icon_bpow = require("../../images/token/bpow.png");

const { Option } = Select;

export default class DexShow extends Component {
 
  
  constructor(props){
    super(props);
    this.state={ accountName:null,
                 timermydex:null,
                 isHawker:null,
                 dexID:null,
                 dexIntro:null,
                 GlobalWGmined:null,
                 hawker_intro_text:"",
                 pairindex:"sab",
                 
                 }
  
    }
    componentDidMount(){
        this.setState({timermydex:setInterval(()=>{
            this.getGameInfo()
            if(this.state.accountName!= null) {
      
                clearInterval(this.state.timermydex);
                console.log("timmer cleared")
            }},1000)})}
    componentWillUnmount(){
        if(this.state.timermydex!= null) {  
            clearInterval(this.state.timermydex);            
            }
        
        this.setState = (state, callback) => {
            return;
            };

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
            rpc.blockchain.getContractStorage(ContractID,account,'hawkerAuthority')
            .then((result)=>{this.setState({isHawker:result.data})})
            rpc.blockchain.getContractStorage(ContractID,'reghawkerindex')
            .then((result)=>{console.log(result)})
            rpc.blockchain.getContractStorage(ContractID,account,'hawkerID')
            .then((result)=>{this.setState({dexID:result.data})})
            rpc.blockchain.getContractStorage(ContractID,account,'intro')
            .then((result)=>{this.setState({dexIntro:result.data})})
            rpc.blockchain.getContractStorage(ContractID,'TotalWGDeXvalue','wgtoken_mined')
            .then((result)=>{this.setState({GlobalWGmined:result.data})})
        })
      }
  onIntroGet=(event)=> {

          this.setState({hawker_intro_text:event.target.value,
          });
        }
  dexSet=(par1,par2,par3)=>{

          if(par1 ==="setintro"){
                if('IWalletJS' in window){} else {return;}  
                window.IWalletJS.enable().then((account) => {
                      if(!account) return; // not login                 
                      const iost = window.IWalletJS.newIOST(IOST)
                      const tx = iost.callABI(ContractID, 'DexSet', ["setintro",par2,"0"] );
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
                        message.success('介绍设置成功 [ Set OK]')
                   
                      })
                      .on('failed', (failed) => {
                        console.log(failed, 'failed')
                        
                        message.error('设置失败,请查看gas或者ram是否充足 [Error, pleas check if your ram or gas is enough]')
                      })
                  })  
                }
        } 

    Register=()=>{
      if('IWalletJS' in window){} else {return;}  
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
              message.success('注册成功,请等待30s主网确认完成后再进入 [register OK,please wait 30s for blockchain confirmation]')
            })
            .on('failed', (failed) => {
              console.log(failed, 'failed')
            
              message.error('是否已经注册过了? 若是的话等30s主网确认，若没有请检查是否gas和ram充足[Error, pleas check if your ram or gas is enough]')
            })
        })  
    }

    handleChange=(value)=>{

      this.setState({pairindex:value,                        
                   })
    }



    render(){

   return (
    <div>
        <div className='DexDash'>
           
        <div><Translation>
      { t => <div >{t('My Swap Dex')}</div>}  
      </Translation></div> 
     <div style={{border:"solid",borderColor:"#009966",borderWidth:"thin"}}></div>

       <div className='MyDexstatus'>


       <div className={(this.state.isHawker==="null")?"Register":"hide"}>


        <div><div className="btn"><span onClick={this.Register}>
        <div><Translation>
        { t => <div  >{t('Click to Create')}</div>}  
          </Translation></div> 
        </span></div></div>
        <div><Translation>
        { t => <div>{t('Create & manage your own swap-dex on IOST blockchain, All for Free')}</div>}  
          </Translation></div> 
  
     
        </div>
        <div className={(this.state.isHawker==="null")?"hide":"Register"}>
        
        <div className="dexstatus">
        <div><Translation>
        { t => <div>{t('My Dex Name')}:<span className="dexstatus-span">{this.state.accountName}</span></div>}  
          </Translation></div>      
        <div><Translation>
        { t => <div>{t('My Dex ID')}:<span className="dexstatus-span">{this.state.dexID}</span></div>}  
          </Translation></div> 
        <div><Translation>
        { t => <div>{t('My Dex Intro.')}:<span className="dexstatus-span">
        <div style={{display: "inline-block", marginLeft:"0.1rem auto" ,height:"0.5rem",width:"0.5rem"}}>
      
            <Popover placement="bottomLeft" 
                     title={<div><Translation>{ t => <div  >{t('UpdateHere')}</div>}</Translation></div> } 
                     content={  
                        <div><input className="inputdexset" onChange={this.onIntroGet}type="text"/>
                        <button onClick={(e)=>this.dexSet("setintro",this.state.hawker_intro_text,"0")} className="btndexset">
                        <div><Translation>{ t => <div  >{t('update')}</div>}</Translation></div>
                          </button></div>  
                         } 
                     trigger="click">
            <img src={settingicon} alt="" width="100%" height="100%"></img>
          </Popover>
        </div>
        {this.state.dexIntro}</span></div>}  
          </Translation></div> 
        

        </div>
        </div>
       
       </div>
       </div>
   
      {/* Dex控制 面板 */}
      <div className="DexBox">

          <div className="DexContainer">              
           
        <Select loading={this.state.status_hawker_checking} size={'large'} disabled={this.state.status_hawker_checking}  value={this.state.pairindex} bordered={false} className="Dex_sel_style" onChange={this.handleChange}>
          <Option value="sab">
          <div className='inpairslect'>
          <div className='tokensym'><img src={icon_iost} alt="" width="85%" height="85%"></img></div>
          <div className='tokensym2'><img src={swap_horiz} alt="" width="100%" height="100%"></img></div> 
          <div className='tokensym'><img src={icon_wg} alt="" width="100%" height="100%"></img></div>                    
           </div>
            </Option>
          <Option value="bpow">
          <div className='inpairslect'>
          
          <div className='tokensym'><img src={icon_iost} alt="" width="85%" height="85%"></img></div>
          <div className='tokensym2'><img src={swap_horiz} alt="" width="100%" height="100%"></img></div>
          <div className='tokensym'><img src={icon_bpow} alt="" width="100%" height="100%"></img></div>                    
          </div>
          </Option>
          <Option value="ppt">
            <div className='inpairslect'>
            <div className='tokensym'><img src={icon_iost} alt="" width="85%" height="85%"></img></div>
                           
            <div className='tokensym2'><img src={swap_horiz} alt="" width="100%" height="100%"></img></div>
            <div className='tokensym'><img src={icon_ppt} alt="" width="100%" height="100%"></img></div>    
            
            </div>
          </Option>
          <Option value="tpt">
          <div className='inpairslect'>
            <div className='tokensym'><img src={icon_iost} alt="" width="85%" height="85%"></img></div>                 
            <div className='tokensym2'><img src={swap_horiz} alt="" width="100%" height="100%"></img></div>
            <div className='tokensym'><img src={icon_tpt} alt="" width="100%" height="100%"></img></div>  
          </div>
          </Option> 
        </Select>


        </div>    

        <div className={(this.state.pairindex==="sab"&& this.state.isHawker==="1")?"":"hide"}>
        <Goods tokenpairname={'sab'} />
        </div>
        <div className={this.state.pairindex==="ppt"&& this.state.isHawker==="1"?"":"hide"}>
        <Goods tokenpairname={'ppt'} />
        </div>
        <div className={this.state.pairindex==="tpt"&& this.state.isHawker==="1"?"":"hide"}>
        <Goods tokenpairname={'tpt'} />
        </div>
        <div className={this.state.pairindex==="bpow"&& this.state.isHawker==="1"?"":"hide"}>
        <Goods tokenpairname={'bpow'} />
        </div>
        <div className={this.state.isHawker===null?"mydexloading":"hide"}><LoadingOutlined /></div>
        
     
      </div>



      </div>
         )};

}

