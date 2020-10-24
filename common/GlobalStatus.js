import React, { Component } from 'react'
//import IOST from 'iost'
//import { Link } from "react-router-dom";
//import { Translation  } from 'react-i18next';
//import i18n from 'i18next';
import { WalletOutlined } from '@ant-design/icons';
import '../css/GlobalStatus.css';


//const rpc = new IOST.RPC(new IOST.HTTPProvider("https://api.iost.io")); 
//const ContractID ="ContractEk9Whb9m3oWuqaobrJeMEbq6jaP2E7KPg8gGeMkn56k3"

export default class GlobalStatus extends Component {
 
  
  constructor(props){
    super(props);
    this.state={ accountName:null,
                timer:null,}
    }
    componentDidMount(){
        this.setState({timer:setInterval(()=>{
            this.getGameInfo()
            if(this.state.accountName!= null) {
                clearInterval(this.state.timer);
                console.log("Home timer cleared")
            }},1000)})}
    componentWillUnmount(){
        if(this.state.timer!= null) {  
            clearInterval(this.state.timer);            
            console.log("Home timer cleared")
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
            

        })
    
      }
    render(){

   return (

            <div>
            

            <div className="global_status">

            <div className="global_account">
            <WalletOutlined /> {(this.state.accountName===null)?"ConnectIOSTWallet":this.state.accountName  }
            </div>
            </div>
            </div>

         )};

}

