import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Translation  } from 'react-i18next';
import i18n from 'i18next';

import { UnorderedListOutlined} from '@ant-design/icons';
import { Modal } from 'antd';
 




 export default class Header extends Component {
 
  
  constructor(){
    super();
    this.state={ lang:i18n.language}
    }

    setLang=()=>{
      i18n.changeLanguage(i18n.language==='zh'?'en':'zh')
      let langtemp=(i18n.language==='zh'?'en':'zh')
      this.setState({lang:langtemp
      })

    }


    showwhitepaper=()=>{
      Modal.info({
        title: '白皮书',
        content: (
          <div>
          <h2>简介</h2>
        <p>
        冬瓜金融(WaxGourdFinance)是基于IOST开发的Defi项目。冬瓜将建立一套交易所聚合系统，任何人都可以在冬瓜金融合于上建立并管理自己的去中心化SwapDex。
        我们在吸取了EOS-DFS的交易和做市挖矿概念基础上，也为参与者提供WG代币作为激励，生态建设和社区的治理。</p>
        <h2>MySwapDex</h2>
        
        用户通过0费用创建自己的交易所，为交易对提供流动性后便可以挖矿。
        由于采用C2C模式，交易通过去中心化合约在用户与用户间执行。手续费将不再像LP占比的模式平摊，将全额的手续费的50%支付给交易所拥有者，剩余25%会进入基金会，25%作为团队的正常运营。这种模式能够最大限度的减小LP占比较小的用户产生做市磨损，同时可以营销自己的交易所，赚取更多手续费的同时 还能获得做市代币激励 和 被动式交易代币挖矿激励。
        
        <h2>C2CSwap</h2>
        对于交易用户，可以根据自己的预计兑换额度，选择规模不同的dex交易。这就意味着交易者可能够找到更便宜的兑换价格。同时每一笔交易还能够产生WG挖矿激励。
        在冬瓜C2CSwap上交易。交易挖矿的效率将比做市更大。
        
        <h2>关于挖矿</h2>
        代币：WG
        数量：2100万最大， 仅发行1000万作为挖矿(剩余1100万不发行，即不流通，需要根据市场社区规模和未来发展综合考虑)
        难度调整：每50万产出后，日产难度系数会增加，每日产出减少10%。
        挖矿模式：1.主动交易挖矿 2.Dex被动交易挖矿 3. 做市挖矿(按秒计算)
        
        团队不预留，不预挖
        
        <h2>关于Dex特色功能</h2>
        1.自由设置手续费 2. 挂单式添加流动性 3.黑名单 4.允许单边交易(做市挖矿停止)
        
        <h2> 关于基金会</h2>
        基金会赋值WG矿币，形式包括不仅限于回购销毁，分红，存储借贷等，根据社区情况做开发

        <h2> 风险</h2>
        冬瓜采取先内测，再公测的方式取验证合约可靠性后， 最大程度降低风险后再正式上线。

        任何参与冬瓜项目的用户请悉知：
        1.所有交易都是去中心化的用户行为，其中交易或者做市产生的损失我们一律不会负责。所以请务必了解交易规则和风险后再参与。
        2.合约中未知的bug导致用户损失我们不会负责，对此我们深表抱歉。但我们会第一时间立即采取措施锁住合约接口并修复。
        
        总之，任何投资都存在风险，请谨慎行事。  


       <h2> 团队介绍</h2>
        我们是一个长期从事于金融行业的从业者+也有实力的开发工程师，我们拥护IOST，我们相信新金融的可能将是无限的。

        </div>
        ),
        onOk() {},
      });
    }


    render(){

   return (
     <div className="header" >
     
      <Link  to ="/Home"> <div id='header-logo'></div></Link>
      <div id='header-name'>

      <Translation>
      { t => <div>{t('WaxGourdFinance')}</div>}
      </Translation>
      
      </div>   
    
   <div className="box11 shadow"></div>
     
  <div className="dropdown">
  <button className="dropbtn"><UnorderedListOutlined /></button>
  <div className="dropdown-content">
     <Translation>
      { t => <div onClick={this.showwhitepaper}>{t('WhitePaper')}</div>}
      </Translation>
    <br/>
      <div onClick={this.setLang}>{this.state.lang}</div>
    <hr />
    <Link className="headerlink" to ="/MySwapDex"> <div  >My Dex</div></Link>
    <br/>
    <Link className="headerlink" to ="/C2CSwap"> <div  >C2C Swap</div></Link>
    <hr />
    <div>Beta</div>
  </div>
</div>

    </div>



  )};
};
