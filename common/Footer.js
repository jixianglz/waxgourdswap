import React, { Component } from 'react'
import IOST from 'iost'
import i18n from 'i18next';
import { Translation  } from 'react-i18next';
import { WechatOutlined} from '@ant-design/icons';
import { message } from 'antd'


const rpc = new IOST.RPC(new IOST.HTTPProvider("https://api.iost.io"));
const ContractID ="Contract7xskjVLZjkJHTEVktSbRBqq68q1Up3GDecBXx4hck9yf"


 export default class Footer extends Component {
 
  
  constructor(){
    super();
    this.state={ lang:i18n.language,
      timer:null,
      GlobalWGmined:0,

      amountiostppt:null,
      orderiostppt:null,
      pooliostppt:null,
      amountiostppt24H:null,

      amountiostsab:null,
      orderiostsab:null,
      pooliostsab:null,
      amountiostsab24H:null,

      amountiostbpow:null,
      orderiostbpow:null,
      pooliostbpow:null,
      amountiostbpow24H:null,

      amountiosttpt:null,
      orderiosttpt:null,
      pooliosttpt:null,
      amountiosttpt24H:null,}
    }



    componentDidMount(){
      this.setState({timer:setInterval(()=>{
          this.getInfo()
          if(this.state.accountName!= null) {
              clearInterval(this.state.timer);
          }},1000)})}

      componentWillUnmount(){
            if(this.state.timer!= null) {  
                clearInterval(this.state.timer);  
                console.log("footer cleared")          
                }
            
            this.setState = (state, callback) => {
                return;
                };
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

      
          rpc.blockchain.getContractStorage(ContractID,'iostppt','amount_token_a_24H')
          .then((result)=>{this.setState({amountiostppt24H:Number(result.data)})})
          rpc.blockchain.getContractStorage(ContractID,'iostsab','amount_token_a_24H')
          .then((result)=>{this.setState({amountiostsab24H:Number(result.data)})})
          rpc.blockchain.getContractStorage(ContractID,'iostbpow','amount_token_a_24H')
          .then((result)=>{this.setState({amountiostbpow24H:Number(result.data)})})
          rpc.blockchain.getContractStorage(ContractID,'iosttpt','amount_token_a_24H')
          .then((result)=>{this.setState({amountiosttpt24H:Number(result.data)})})
          rpc.blockchain.getContractStorage(ContractID,'iostppt','order_number')
          .then((result)=>{this.setState({orderiostppt:Number(result.data)})})
          rpc.blockchain.getContractStorage(ContractID,'iostsab','order_number')
          .then((result)=>{this.setState({orderiostsab:Number(result.data)})})
          rpc.blockchain.getContractStorage(ContractID,'iostbpow','order_number')
          .then((result)=>{this.setState({orderiostbpow:Number(result.data)})})
          rpc.blockchain.getContractStorage(ContractID,'iosttpt','order_number')
          .then((result)=>{this.setState({orderiosttpt:Number(result.data)})})
          rpc.blockchain.getContractStorage(ContractID,'iostppt','pool_token_a')
          .then((result)=>{this.setState({pooliostppt:Number(result.data)})})
          rpc.blockchain.getContractStorage(ContractID,'iostsab','pool_token_a')
          .then((result)=>{this.setState({pooliostsab:Number(result.data)})})
          rpc.blockchain.getContractStorage(ContractID,'iostbpow','pool_token_a')
          .then((result)=>{this.setState({pooliostbpow:Number(result.data)})})
          rpc.blockchain.getContractStorage(ContractID,'iosttpt','pool_token_a')
          .then((result)=>{this.setState({pooliosttpt:Number(result.data)})})
          rpc.blockchain.getContractStorage(ContractID,'TotalWGDeXvalue','wgtoken_mined')
          .then((result)=>{this.setState({GlobalWGmined:Number(result.data).toFixed(2)})})
      })
        }

        copy = () => {
          var copyDOM = document.getElementById("copyTarget");  //需要复制文字的节点  
          var range = document.createRange(); //创建一个range
          window.getSelection().removeAllRanges();   //清楚页面中已有的selection
          range.selectNode(copyDOM);    // 选中需要复制的节点    
          window.getSelection().addRange(range);   // 执行选中元素
          var successful = document.execCommand('copy');    // 执行 copy 操作  
          if(successful){
              message.success('复制成功！ Copy Done!')
          }else{
              message.warning('复制失败，请手动复制！')
          }
          // 移除选中的元素  
          window.getSelection().removeAllRanges();
        }


    render(){

   return (
     <div>
        
        <div className="footer">

        <div className="footer-info">

        <div><Translation>
        { t => <div>{t('WG All Maker IOST')}:<span className="footer-span"> {(this.state.pooliostbpow+this.state.pooliostppt+this.state.pooliostsab+this.state.pooliosttpt).toFixed(2)} iost</span></div>}  
          </Translation></div> 
        <div><Translation>
        { t => <div>{t('WG All Orders')}:<span className="footer-span"> {(this.state.orderiostbpow+this.state.orderiostppt+this.state.orderiostsab+this.state.orderiosttpt)}</span></div>}  
          </Translation></div> 
          <div><Translation>
        { t => <div>{t('WG 24Hours Amount')}:<span className="footer-span"> {(this.state.amountiostppt24H+this.state.amountiostsab24H+this.state.amountiostbpow24H+this.state.amountiosttpt24H).toFixed(2)} iost</span></div>}  
          </Translation></div> 
        <div><Translation>      
        { t => <div>{t('WG Mine Yields')}:<span className="footer-span">{this.state.GlobalWGmined} wg</span> </div>}  
          </Translation></div>

        </div>
        
        <div className="footer-contact" onClick={this.copy}> <WechatOutlined />
        <div id="copyTarget">
        zhangren0501
        </div>
      
         </div>
        
        </div>


    </div>



  )};
};
