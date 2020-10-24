const TOKEN={
    tokenSymbol: 'sab',
    totalSupply: 21000000,
    decimal: 8,
    fullName:'Sell and Buy Token',
}
const hawker_tokenpair_info={
    hawername:'',
    pairKey:'',
    balance_a:'0',
    balance_b:'0',
    islock:'0',
    limitbuy:'0',
    limitsell:'0',
    fee:'0.005',
    feemode:'md_re',
    order_number:'0',
    amount_token_a:'0',
    amount_token_b:'0',
    order_number_24H:'0',
    amount_token_a_24H:'0',
    amount_token_b_24H:'0',
    onshelf_start:'',
    dayflag:'0',
    WGmined:'0',
    WGminedmaker:"0",
    lastpledgeiost:"0",
    lastpledgesymb:"0",
    lpr:"0",
    wg2wd_time:"0",
}

const Tax_Banus_Bank='zhangiost2';   // for special contributer  5%
const fee_to_hawker_ratio=0.9;
const fee_to_bonuspool_ratio=0.05;
const Team_Account='waxgourd'; // for developer  5%
const TOKENPAIR_KEYS={
    tokenPairList:'tokenpairlist', 
}
const WG_MINE_PARA={
    mine_difficulty_tk_step:500000,
    mine_difficulty_stepratio:0.9,
    maker_ratio:1,    
    maker_mine_interval:86400,
    bank_ratio:0.001,
    trade_buy_ratio:0.5,
}

const TOKENPAIR_FIELD={
    tokenPairID:'tokenpairID',
    tokenPair_symbola:'tokenPair_symbola',
    tokenPair_symbolb:'tokenPair_symbolb',
    tokenPair_decimal_a:'tokenPair_decimal_a',
    tokenPair_decimal_b:'tokenPair_decimal_b',
    pool_token_a:'pool_token_a',  
    pool_token_b:'pool_token_b', 
    pool_fee_token_a:'pool_fee_token_a',
    pool_fee_token_b:'pool_fee_token_b',
    price_token_a:'price_token_a',
    price_token_b:'price_token_b',
    order_number:'order_number',
    amount_token_a:'amount_token_a',
    amount_token_b:'amount_token_b',
    order_number_24H:'order_number_24H',
    amount_token_a_24H:'amount_token_a_24H',
    amount_token_b_24H:'amount_token_b_24H',
    block_start:'block_start',   
    timestamp:'timestamp',  
    trade_mine_weight:'trade_mine_weight',
    maker_mine_weight:'maker_mine_weight',
    amount_mined:'amount_mined',
    amount_mined_2wd:'amount_mined_2wd',
    dayflag:'dayflag',
    lprall:'lprall',
}

const Hawker_FILED={
    ID:'hawkerID',   
    Authority:'hawkerAuthority',
    Banlist:'banlist',
    Intro:'intro',
    TotalValue:'totalvalue',
    TotalVolume:'totalvolume',
    TotalAmounts:'totalamounts',
    TotalMined:'totalmined',  
    StatusCheck:'statuscheck',
}

const Market_Keys={
    registed_hawker:'registed_hawker', 
    WGDeXinfo:'TotalWGDeXvalue',
}
const WGDeXinfo_Field={
    Value:"Dexinfo_value",
    Volume:'Dexinfo_volume',
    TotalAmounts:'totalamounts',
    WGtoken_mined:'wgtoken_mined'
}

const RegHawkerIndex="reghawkerindex";
const tokenpair_index='tokenpair_index';
const TradeLockAll='tradelockaLL';

class SaBSwap {
    init () {
        this._create();
    }

    mstart(){
        this._contractOwnerAuth();
        storage.put(tokenpair_index,"0",tx.publisher)
        storage.put(RegHawkerIndex,"0",tx.publisher)
        storage.mapPut(Market_Keys.WGDeXinfo,WGDeXinfo_Field.WGtoken_mined,"0",tx.publisher); 
        storage.put(TradeLockAll,"0",tx.publisher)
    }    

    createtokenpair(tokenpaira,decimala,tokenpairb,decimalb){   
        //this._contractOwnerAuth();
        
        let tokenpairname=tokenpaira+tokenpairb;
        if(tokenpaira!="iost"){throw "a must be iost"}
        if (storage.mapHas(TOKENPAIR_KEYS.tokenPairList, tokenpairname.toString())) {
            return "tokenpair has been in Pool"
        }
        let ndecimala = Number(decimala);
        if (isNaN(decimala)) {
            throw 'ndecimal is not number';
        }
        let ndecimalb = Number(decimalb);
        if (isNaN(decimala)) {
            throw 'ndecimal is not number';
        }
        let index_tokenpair=Number(storage.get(tokenpair_index))+1;
        storage.put(tokenpair_index,index_tokenpair.toFixed(0),tx.publisher);
        storage.mapPut(TOKENPAIR_KEYS.tokenPairList,tokenpairname.toString(), (index_tokenpair).toFixed(0),tx.publisher); 
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.tokenPairID,(index_tokenpair).toFixed(0),tx.publisher); 
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.tokenPair_symbola,tokenpaira,tx.publisher); 
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.tokenPair_symbolb,tokenpairb,tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.tokenPair_decimal_a,ndecimala.toFixed(0),tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.tokenPair_decimal_b,ndecimalb.toFixed(0),tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.pool_token_a, "0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.pool_token_b, "0",tx.publisher);  
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.pool_fee_token_a, "0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.pool_fee_token_b, "0",tx.publisher);   
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.price_token_a, "0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.price_token_b, "0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.order_number, "0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.amount_token_a, "0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.amount_token_b, "0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.order_number_24H, "0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.amount_token_a_24H, "0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.amount_token_b_24H, "0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.amount_mined, "0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.amount_mined_2wd, "0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.trade_mine_weight, "0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.maker_mine_weight,"0",tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.block_start, (block.number).toString(),tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.timestamp, (block.time).toString(),tx.publisher);
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.dayflag,'0',tx.publisher);
        let arr=new Array()
        arr[0]={id:'0',lp:'0'}
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.lprall,JSON.stringify(arr),tx.publisher); 
   
    }

    SetWeight(tokenpairname,which,weight){
        this._contractOwnerAuth();
        let nweight = Number(weight);
        if (isNaN(nweight) ) {
            throw 'weight is not number';
        }
        if(which=="1"){
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.maker_mine_weight,nweight.toFixed(2),tx.publisher);
        return "setting_maker_OK"
        }
        if(which=="2"){
        storage.mapPut(tokenpairname,TOKENPAIR_FIELD.trade_mine_weight,nweight.toFixed(2),tx.publisher);
         return "setting_trader_OK"
        }
        throw "para not right"
    }
    register(){
        let hawker=tx.publisher;
        this._checkHawkerAuth(hawker)      
        let index=Number(storage.get(RegHawkerIndex))+1;   
        storage.put(RegHawkerIndex,index.toFixed(0),tx.publisher); 
        storage.mapPut(Market_Keys.registed_hawker,index.toFixed(0),hawker,hawker);
        storage.mapPut(hawker,Hawker_FILED.Authority,'1',hawker);
        storage.mapPut(hawker,Hawker_FILED.ID,index.toFixed(0),hawker);
        storage.mapPut(hawker,Hawker_FILED.Intro,'Greetings!',hawker);
        let arr=new Array();
        arr[0]=hawker;
        storage.mapPut(hawker,Hawker_FILED.Banlist,JSON.stringify(arr),hawker); 
        return(`Create Dex Succesfully,Your Dex ID ${index}`)

    }

    onshelf(tokenPairName){
       
        let hawker=tx.publisher;
        this._addHawkerAuth(hawker);
        if (!storage.mapHas(TOKENPAIR_KEYS.tokenPairList,tokenPairName.toString())) {
            throw "tokenpair is not support now!"
        }   
        if (storage.mapHas(hawker,tokenPairName)) {
            throw "already onshelfied"
        }     
        let pairKey=tokenPairName.toString();
        let syma=storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_symbola);
        let symb=storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_symbolb);
        let balance_a=pairKey+'_balance_'+syma;
        let balance_b=pairKey+'_balance_'+symb;
        let islock=pairKey+'_islock';
        let limitbuy=pairKey+'_limitbuy';
        let limitsell=pairKey+'_limitsell';
        let fee=pairKey+'_swapfee';
        let feemode=pairKey+'_swapfeemode';
        let makermined=pairKey+'_wg2withdraw';
        let wg2wd_time=pairKey+'_wg2wd_time';
        let tradeinfo=pairKey+'_returnarr'; 
        storage.mapPut(hawker,pairKey,'1',hawker);
        storage.mapPut(hawker,balance_a,'0',hawker);
        storage.mapPut(hawker,balance_b,'0',hawker);
        storage.mapPut(hawker,limitbuy,'0',hawker);
        storage.mapPut(hawker,limitsell,'0',hawker);
        storage.mapPut(hawker,islock,'0',hawker);
        storage.mapPut(hawker,fee,'0.005',hawker);
        storage.mapPut(hawker,feemode,'md_re',hawker);
        storage.mapPut(hawker,makermined,'0',hawker);
        storage.mapPut(hawker,wg2wd_time,'0',hawker);
        let temp=hawker_tokenpair_info;
        temp.hawername=tx.publisher;
        temp.pairKey=pairKey;
        temp.onshelf_start=(block.time).toString()
        storage.mapPut(hawker,tradeinfo,JSON.stringify(temp),hawker);
        return(`onShelf ${tokenPairName} success`)
    }
    MineMakerWithdraw(tokenPairName){
        let hawker=tx.publisher;
        let pairKey=tokenPairName.toString();
        this._addHawkerAuth(hawker);
        if (!storage.mapHas(hawker,pairKey)) {
            throw "not onshelfied yet!"
        }
        let hawkerpool_status=JSON.parse(storage.mapGet(hawker,(pairKey+'_returnarr')));
        let syma=storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_symbola);
        let symb=storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_symbolb);
        let balance_a=pairKey+'_balance_'+syma;
        let balance_b=pairKey+'_balance_'+symb;

        let bt = block.time;
        let wg2wd_time=pairKey+'_wg2wd_time';
        let lgt=Number(storage.mapGet(hawker,wg2wd_time));
        if(lgt== 0 || lgt=="null"){
           return "The mine is not allowed. no liquidity added"
        }
        let timefact=Number((((bt-lgt)/1000000000)/Number(WG_MINE_PARA.maker_mine_interval)));
        let Pooliost=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.pool_token_a));
        let Poolsymb=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.pool_token_b));
        let Poolscale=Math.sqrt((Pooliost*Poolsymb));
        if(Pooliost<1){throw "balance of iost must >1"}
        let Pooliostmaker=Number(storage.mapGet(hawker,balance_a));
        let Poolsymbmaker=Number(storage.mapGet(hawker,balance_b));
        let Poolmakerscale=Math.sqrt(Pooliostmaker*Poolsymbmaker);
        if(Pooliostmaker<1){throw "balance of iost must >1"}

        let maker_mine_weight=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.maker_mine_weight));
        let maker_ratio=Number(WG_MINE_PARA.maker_ratio)
        let PoolMakerWeight=Poolmakerscale/Poolscale;
        if(PoolMakerWeight>1) throw('PoolMakerWeight>1')
        
        let WGmined=Number(storage.mapGet(Market_Keys.WGDeXinfo,WGDeXinfo_Field.WGtoken_mined));
        let cur_diff_e=Math.floor(WGmined/WG_MINE_PARA.mine_difficulty_tk_step);
        let cur_diff=Math.pow(WG_MINE_PARA.mine_difficulty_stepratio,cur_diff_e);
        if(cur_diff>1) throw('cur_diff>1 !!')

        let WGowed=(Math.sqrt(2*Pooliost)*cur_diff*maker_mine_weight*maker_ratio)*PoolMakerWeight*timefact;

        let roolback_r=Math.floor(WGowed/WG_MINE_PARA.mine_difficulty_tk_step)

        if(roolback_r>=1)
        {  WGowed=WGowed*Math.pow(WG_MINE_PARA.mine_difficulty_stepratio,roolback_r) }

         blockchain.callWithAuth('token.iost', 'transfer', [
            'sab',
            blockchain.contractName(),
            tx.publisher,
            WGowed.toFixed(8),
            `WaxGourdSwap: You have withdraw ${ WGowed.toFixed(8) } WG tokens`
        ]) 
        //globle
        storage.mapPut(Market_Keys.WGDeXinfo,WGDeXinfo_Field.WGtoken_mined,(WGmined+WGowed).toFixed(8),hawker)
        
        //tkpair
        let WGminedinTKP=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.amount_mined));
        storage.mapPut(pairKey,TOKENPAIR_FIELD.amount_mined,(WGminedinTKP+WGowed).toFixed(8),hawker);
        //hawker
        let makermined=pairKey+'_wg2withdraw';
        let WGminedinHAW=Number(storage.mapGet(hawker,makermined));
        storage.mapPut(hawker,makermined,(WGminedinHAW+WGowed).toFixed(8),hawker);
        storage.mapPut(hawker,wg2wd_time,bt.toString(),hawker);
        hawkerpool_status.WGmined=(Number(hawkerpool_status.WGmined)+WGowed).toFixed(8); 
        hawkerpool_status.WGminedmaker=(Number(hawkerpool_status.WGminedmaker)+WGowed).toFixed(8); 
        hawkerpool_status.wg2wd_time=bt.toString()
        storage.mapPut(hawker,(pairKey+'_returnarr'),JSON.stringify(hawkerpool_status),tx.publisher);
    }

    addliquidity(tokenPairName,amount_token_a,amount_token_b){        
        let hawker=tx.publisher;
        let pairKey=tokenPairName.toString();
        this._addHawkerAuth(hawker);
        let nAmount_token_a= Number(amount_token_a);
        let nAmount_token_b = Number(amount_token_b);
        let tradelockall=storage.get(TradeLockAll);  
        if (tradelockall=='lock'){throw "all trading is locked"}
         if (isNaN(nAmount_token_a) ||isNaN(nAmount_token_b) ) {
             throw 'amount is not number';
         }
         if (nAmount_token_a<1 || nAmount_token_b<=0 ) {
            throw 'at least 1 iost and token should >0';
        }
        if (!storage.mapHas(TOKENPAIR_KEYS.tokenPairList,tokenPairName.toString())) {
            throw "tokenpair is not support now!"
        }   
        if (!storage.mapHas(hawker,tokenPairName.toString())) {
            throw "Open the pair first."
        }   
        let wg2wd_time=pairKey+'_wg2wd_time';
        let lgt=Number(storage.mapGet(hawker,wg2wd_time));

        let syma=storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_symbola);
        let symb=storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_symbolb);
        let decimala=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_decimal_a));
        let decimalb=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_decimal_b));
        let balance_a=pairKey+'_balance_'+syma;
        let balance_b=pairKey+'_balance_'+symb;
        let pool_token_a=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.pool_token_a));
        let pool_token_b=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.pool_token_b));
        let hawkerpool_token_a=Number(storage.mapGet(hawker,balance_a));
        let hawkerpool_token_b=Number(storage.mapGet(hawker,balance_b));


        if(lgt != 0 && hawkerpool_token_a>0 && hawkerpool_token_b>0){

            this.MineMakerWithdraw(tokenPairName);
        }


        blockchain.callWithAuth('token.iost', 'transfer', [
            syma,
            hawker,
            blockchain.contractName(), 
            nAmount_token_a.toFixed(decimala),
            `addliquidity ${ nAmount_token_a.toFixed(decimala) } ${syma} tokens`
        ])    
       
        blockchain.callWithAuth('token.iost', 'transfer', [
            symb,
            hawker,
            blockchain.contractName(), 
            nAmount_token_b.toFixed(decimalb),
            `addliquidity ${ nAmount_token_b.toFixed(decimalb) } ${symb} tokens`
        ])    
    
        
        storage.mapPut(pairKey,TOKENPAIR_FIELD.pool_token_a, (pool_token_a+nAmount_token_a).toFixed(decimala),hawker);
        storage.mapPut(pairKey,TOKENPAIR_FIELD.pool_token_b, (pool_token_b+nAmount_token_b).toFixed(decimalb),hawker);  

        storage.mapPut(hawker,balance_a, (hawkerpool_token_a+nAmount_token_a).toFixed(decimala),hawker);
        storage.mapPut(hawker,balance_b, (hawkerpool_token_b+nAmount_token_b).toFixed(decimalb),hawker);  
   
        
        let tradeinfo=pairKey+'_returnarr';
        let temp=JSON.parse(storage.mapGet(hawker,tradeinfo));
        temp.balance_a=(hawkerpool_token_a+nAmount_token_a).toFixed(decimala);
        temp.balance_b=(hawkerpool_token_b+nAmount_token_b).toFixed(decimalb);
        temp.lastpledgeiost=(Number(temp.lastpledgeiost)+nAmount_token_a).toFixed(decimala);
        temp.lastpledgesymb=(Number(temp.lastpledgesymb)+nAmount_token_b).toFixed(decimalb);
        temp.wg2wd_time=(block.time).toString();
        let hawker_lpr=Math.sqrt((Number(temp.lastpledgeiost))*(Number(temp.lastpledgesymb)));
        temp.lpr=hawker_lpr.toFixed(8)
        storage.mapPut(hawker,tradeinfo,JSON.stringify(temp),hawker);
        storage.mapPut(hawker,wg2wd_time,(block.time).toString(),hawker);
        let setprice=(hawkerpool_token_a+nAmount_token_a).toFixed(2);
        let market_lp=Math.sqrt((pool_token_a+nAmount_token_a)*(pool_token_b+nAmount_token_b));
        let hawkerid=storage.mapGet(hawker,Hawker_FILED.ID);
        let arr=JSON.parse(storage.mapGet(pairKey,TOKENPAIR_FIELD.lprall));
        let index=arr.findIndex((value)=>(value.id==hawkerid))
        if(JSON.stringify(arr).length>60000){
            storage.mapPut(pairKey,TOKENPAIR_FIELD.lprall,JSON.stringify(arr),hawker);
            return `add liquidity successfully`}
        if(index==-1 && (hawker_lpr/market_lp)>0.001){
            arr.push({id:hawkerid,lp:hawker_lpr.toFixed(2),bl:setprice} )
        }
        if(index>0){
            arr.splice(index,1)
            if((hawker_lpr/market_lp)>0.001)
            {arr.push({id:hawkerid,lp:hawker_lpr.toFixed(2),bl:setprice})}     
        }
        storage.mapPut(pairKey,TOKENPAIR_FIELD.lprall,JSON.stringify(arr),hawker); 
        return `add liquidity successfully`
       
    }

    HawkerWithdraw(tokenPairName){    
        let hawker=tx.publisher;
        let pairKey=tokenPairName.toString();
        this._addHawkerAuth(hawker);

        if (!storage.mapHas(TOKENPAIR_KEYS.tokenPairList,tokenPairName.toString())) {
            throw "tokenpair is not support now!"
        }   
        if (!storage.mapHas(hawker,tokenPairName.toString())) {
            throw "Open the pair first."
        }   
        let wg2wd_time=pairKey+'_wg2wd_time';
        let lgt=Number(storage.mapGet(hawker,wg2wd_time));
        if(lgt != 0){
            this.MineMakerWithdraw(tokenPairName);
        }

        let syma=storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_symbola);
        let symb=storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_symbolb);
        let decimala=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_decimal_a));
        let decimalb=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_decimal_b));
        let balance_a=pairKey+'_balance_'+syma;
        let balance_b=pairKey+'_balance_'+symb;
        let pool_token_a=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.pool_token_a));
        let pool_token_b=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.pool_token_b));
        let hawkerpool_token_a=Number(storage.mapGet(hawker,balance_a));
        let hawkerpool_token_b=Number(storage.mapGet(hawker,balance_b));
        let nAmount_token_a=hawkerpool_token_a;
        let nAmount_token_b=hawkerpool_token_b;
        if (isNaN(nAmount_token_a) ||isNaN(nAmount_token_b) ) {
            throw 'amount is not number';
        }

        blockchain.callWithAuth('token.iost', 'transfer', [
            syma,
            blockchain.contractName(), 
            hawker,
            nAmount_token_a.toFixed(decimala),
            `withdraw ${ nAmount_token_a.toFixed(decimala) } ${syma} tokens`
        ])    
       
        blockchain.callWithAuth('token.iost', 'transfer', [
            symb,
            blockchain.contractName(), 
            hawker,
            nAmount_token_b.toFixed(decimalb),
            `withdraw ${ nAmount_token_b.toFixed(decimalb) } ${symb} tokens`
        ])    
    
        
        storage.mapPut(pairKey,TOKENPAIR_FIELD.pool_token_a, (pool_token_a-nAmount_token_a).toFixed(decimala),hawker);
        storage.mapPut(pairKey,TOKENPAIR_FIELD.pool_token_b, (pool_token_b-nAmount_token_b).toFixed(decimalb),hawker);  
        storage.mapPut(hawker,balance_a, (0).toFixed(decimala),hawker);
        storage.mapPut(hawker,balance_b, (0).toFixed(decimalb),hawker);  
   
        let tradeinfo=pairKey+'_returnarr';
        let temp=JSON.parse(storage.mapGet(hawker,tradeinfo));
        temp.balance_a=(0).toFixed(decimala);
        temp.balance_b=(0).toFixed(decimalb);
        temp.lastpledgeiost=(0).toFixed(decimala);
        temp.lastpledgesymb=(0).toFixed(decimalb);
        temp.wg2wd_time=(block.time).toString();
        temp.lpr=(0).toFixed(8);
        storage.mapPut(hawker,tradeinfo,JSON.stringify(temp),hawker);
        storage.mapPut(hawker,wg2wd_time,(block.time).toString(),hawker);
        let hawkerid=storage.mapGet(hawker,Hawker_FILED.ID);
        let arr=JSON.parse(storage.mapGet(pairKey,TOKENPAIR_FIELD.lprall));
        let  index=arr.findIndex((value)=>(value.id==hawkerid))
        if(index>0){
            arr.splice(index,1)
        }
        storage.mapPut(pairKey,TOKENPAIR_FIELD.lprall,JSON.stringify(arr),hawker); 
        return 'withdraw OK'
    }     
    Swap_Buy(whichhawker,tokenpair,pay_a,expect_gain_b,slippage) {
        let nPay_a = Number(pay_a);
        let nExpect_gain_b = Number(expect_gain_b);
        let nslippage = Number(slippage);
        let pairKey=tokenpair.toString();
        let tradelockall=storage.get(TradeLockAll);  
        if (tradelockall=='lock'){throw "all trading is locked"}
        if (isNaN(nPay_a) || isNaN(nExpect_gain_b) ||isNaN(nslippage) ) {
             throw 'amount is not number';
        }
        if ((nPay_a<=0) || (nExpect_gain_b<=0) ) {
            throw 'add zero amount of tokens';
        }
        if ((nslippage<=0.001) || (nslippage > 0.05)) {
            throw 'slippage not support';
        }
        
         if (!storage.mapHas(TOKENPAIR_KEYS.tokenPairList, tokenpair.toString())) {
            throw 'tokenpair is not exist';
        }
   
        if(whichhawker==tx.publisher){throw 'can not operate yourself'}
  
        if (!storage.mapHas(whichhawker,tokenpair.toString())) {
            throw "The hawker is not support this tokenpair."
        }  
        if (!storage.mapHas(whichhawker,Hawker_FILED.ID)) {
            throw "The hawker is not exist."
        }   
        let islock=storage.mapGet(whichhawker,(pairKey+'_islock'));
        if(islock=='1'){return 'Sorry. Closed Now'}

        let limitbuy=storage.mapGet(whichhawker,(pairKey+'_limitbuy'));
        if(limitbuy=='1'){return 'Sorry. Buy is limited by Hawker'}

        let hawkerbanlist=JSON.parse(storage.mapGet(whichhawker,Hawker_FILED.Banlist))
        if(hawkerbanlist.includes(tx.publisher)){return `Sorry, you are in ${whichhawker} banlist`}

        let syma=storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_symbola);
        if(syma!='iost') {throw `must be iost`}
        let symb=storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_symbolb);
        let decimala=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_decimal_a));
        nPay_a =Number(nPay_a.toFixed(decimala));
        let decimalb=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_decimal_b));
        let pool_token_a=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.pool_token_a));
        let pool_token_b=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.pool_token_b));
        let orderID=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.order_number))+1;
        let amount_token_a=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.amount_token_a))+nPay_a;
        let amount_token_a_24H=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.amount_token_a_24H));
        let timestampflag=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.timestamp));
        let daycount=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.dayflag));
        let balance_a=pairKey+'_balance_'+syma;
        let balance_b=pairKey+'_balance_'+symb;
        let hawkerpool_token_a=Number(storage.mapGet(whichhawker,balance_a));
        let hawkerpool_token_b=Number(storage.mapGet(whichhawker,balance_b));
        if(hawkerpool_token_a<=0 || hawkerpool_token_b<=0) {throw `${whichhawker} balance not enough <=0`}
        let fee=Number(storage.mapGet(whichhawker,(pairKey+'_swapfee')));
        let feemode=storage.mapGet(whichhawker,(pairKey+'_swapfeemode'));
        let hawkerpool_status=JSON.parse(storage.mapGet(whichhawker,(pairKey+'_returnarr')));
        let fee_to_hawker=(nPay_a*fee)*fee_to_hawker_ratio;
        let fee_to_bonuspool=(nPay_a*fee)*fee_to_bonuspool_ratio;
        let fee_to_Team=nPay_a*fee-fee_to_hawker-fee_to_bonuspool;
        let token_Owed=hawkerpool_token_b-((hawkerpool_token_a*hawkerpool_token_b)/(nPay_a*(1-fee)+hawkerpool_token_a))
        if((token_Owed<(nExpect_gain_b*(1-nslippage)))||(token_Owed>(nExpect_gain_b*(1+nslippage))) ){throw `Exceed ${100*nslippage}%, deal terminated`}
        blockchain.callWithAuth('token.iost', 'transfer', [
            syma,
            tx.publisher,
            blockchain.contractName(),
            nPay_a.toFixed(decimala),
            `WaxGourdSwap：Pay ${(nPay_a*(1-fee)).toFixed(decimala)} ${syma} tokens for ${token_Owed.toFixed(decimalb)} ${symb}, trade with ${whichhawker}`
        ])    

        blockchain.callWithAuth('token.iost', 'transfer', [
            symb,
            blockchain.contractName(),
            tx.publisher,
            token_Owed.toFixed(decimalb),
            `WaxGourdSwap：Got ${token_Owed.toFixed(decimalb)} ${symb}, deal price:${(nPay_a/token_Owed).toFixed(8)},trade with ${whichhawker}`
        ])  
        blockchain.callWithAuth('token.iost', 'transfer', [
            syma,
            blockchain.contractName(),
            Tax_Banus_Bank,
            fee_to_bonuspool.toFixed(decimala),
            `5% fee for future run`
        ])    
        blockchain.callWithAuth('token.iost', 'transfer', [
            syma,
            blockchain.contractName(),
            Team_Account,
            fee_to_Team.toFixed(decimala),
            `5% fee to WG`
        ])  
        if(feemode=='md_re'){
            storage.mapPut(whichhawker,balance_a,(hawkerpool_token_a+nPay_a-fee_to_bonuspool-fee_to_Team).toFixed(decimala),tx.publisher);
            storage.mapPut(whichhawker,balance_b,(hawkerpool_token_b-token_Owed).toFixed(decimalb),tx.publisher);
            hawkerpool_status.balance_a=(hawkerpool_token_a+nPay_a-fee_to_bonuspool-fee_to_Team).toFixed(decimala);
            hawkerpool_status.balance_b=(hawkerpool_token_b-token_Owed).toFixed(decimalb);
            storage.mapPut(pairKey,TOKENPAIR_FIELD.pool_token_a,(pool_token_a+nPay_a-fee_to_bonuspool-fee_to_Team).toFixed(decimala),tx.publisher);
            storage.mapPut(pairKey,TOKENPAIR_FIELD.pool_token_b,(pool_token_b-token_Owed).toFixed(decimalb),tx.publisher);
        }
        if(feemode=='md_wi'){
            storage.mapPut(whichhawker,balance_a,(hawkerpool_token_a+nPay_a*(1-fee)).toFixed(decimala),tx.publisher);
            storage.mapPut(whichhawker,balance_b,(hawkerpool_token_b-token_Owed).toFixed(decimalb),tx.publisher);
            hawkerpool_status.balance_a=(hawkerpool_token_a+nPay_a*(1-fee)).toFixed(decimala);
            hawkerpool_status.balance_b=(hawkerpool_token_b-token_Owed).toFixed(decimalb);
            storage.mapPut(pairKey,TOKENPAIR_FIELD.pool_token_a,(pool_token_a+nPay_a*(1-fee)).toFixed(decimala),tx.publisher);
            storage.mapPut(pairKey,TOKENPAIR_FIELD.pool_token_b,(pool_token_b-token_Owed).toFixed(decimalb),tx.publisher);
            blockchain.callWithAuth('token.iost', 'transfer', [
                syma,
                blockchain.contractName(),
                whichhawker,
                fee_to_hawker.toFixed(decimala),
                `WaxGourdSwap: Pool:${pairKey}: Got fee ${fee_to_hawker} ${syma} from ${tx.publisher}`
            ]) 
        }

         let WGmined=Number(storage.mapGet(Market_Keys.WGDeXinfo,WGDeXinfo_Field.WGtoken_mined));
         let cur_diff_e=Math.floor(WGmined/WG_MINE_PARA.mine_difficulty_tk_step);
         let cur_diff=Math.pow(WG_MINE_PARA.mine_difficulty_stepratio,cur_diff_e);
         let trade_mine_weight=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.trade_mine_weight));

         let ntoBuyer=(nPay_a*fee*cur_diff*trade_mine_weight*WG_MINE_PARA.trade_buy_ratio);
         let ntoHawker=nPay_a*fee*cur_diff*trade_mine_weight-ntoBuyer;

         blockchain.callWithAuth('token.iost', 'transfer', [
            'sab',
            blockchain.contractName(),
            tx.publisher,
            ntoBuyer.toFixed(8),
            `WaxGourdSwap: You have mined ${ ntoBuyer.toFixed(8) } WG tokens`
        ]) 

        blockchain.callWithAuth('token.iost', 'transfer', [
            'sab',
            blockchain.contractName(),
            whichhawker,
            ntoHawker.toFixed(8),
            `WaxGourdSwap:Pool ${pairKey}, ${tx.publisher} help you mined ${ ntoHawker.toFixed(8) } WG tokens`
        ]) 

        storage.mapPut(Market_Keys.WGDeXinfo,WGDeXinfo_Field.WGtoken_mined,(WGmined+ntoBuyer+ntoHawker).toFixed(8),tx.publisher)
        
              
        storage.mapPut(pairKey,TOKENPAIR_FIELD.order_number,orderID.toFixed(0),tx.publisher);  
        storage.mapPut(pairKey,TOKENPAIR_FIELD.amount_token_a,(amount_token_a+nPay_a).toFixed(decimala),tx.publisher);             
        let bt = block.time;
        let curdayflag=Math.floor((((bt-timestampflag)/1000000000))/86400);   
        if(daycount==curdayflag){storage.mapPut(pairKey,TOKENPAIR_FIELD.amount_token_a_24H,(amount_token_a_24H+nPay_a).toFixed(decimala),tx.publisher);} 
        if(daycount!=curdayflag){storage.mapPut(pairKey,TOKENPAIR_FIELD.amount_token_a_24H,(nPay_a).toFixed(decimala),tx.publisher);
                              storage.mapPut(pairKey,TOKENPAIR_FIELD.dayflag,(curdayflag).toFixed(decimala),tx.publisher)}
        
  
        hawkerpool_status.order_number=(Number(hawkerpool_status.order_number)+1).toFixed(0);
        hawkerpool_status.amount_token_a=(Number(hawkerpool_status.amount_token_a)+nPay_a).toFixed(decimala); 
        
        let hawker_curdayflag=Math.floor((((bt-Number(hawkerpool_status.onshelf_start))/1000000000))/86400);   
        if(hawkerpool_status.dayflag==hawker_curdayflag.toFixed(0)){
            hawkerpool_status.amount_token_a_24H=(Number(hawkerpool_status.amount_token_a_24H)+nPay_a).toFixed(decimala);
        }
        if(hawkerpool_status.dayflag!=hawker_curdayflag.toFixed(0)){
            hawkerpool_status.amount_token_a_24H=(nPay_a.toFixed(decimala));
            hawkerpool_status.dayflag=hawker_curdayflag.toFixed(0);
        }
        hawkerpool_status.WGmined=(Number(hawkerpool_status.WGmined)+ntoHawker).toFixed(8); 
       

        storage.mapPut(whichhawker,(pairKey+'_returnarr'),JSON.stringify(hawkerpool_status),tx.publisher);
        
        
        return 'Successfully Swapped'
     }


     Swap_Sell(whichhawker,tokenpair,sell_b,expect_gain_a,slippage) {
        let nSell_b = Number(sell_b);
        let nExpect_gain_a = Number(expect_gain_a);
        let nslippage = Number(slippage);
        let pairKey=tokenpair.toString();
        let tradelockall=storage.get(TradeLockAll);
        if (tradelockall=='lock'){throw "all trading is locked"}

        if (isNaN(nSell_b) || isNaN(nExpect_gain_a) ||isNaN(nslippage) ) {
            throw 'amount is not number';
        }
        if ((nSell_b<=0) || (nExpect_gain_a<=0) ) {
        throw 'add zero amount of tokens';
        }
        if ((nslippage<=0.001) || (nslippage > 0.05)) {
        throw 'slippage not support';
        }
   
        if (!storage.mapHas(TOKENPAIR_KEYS.tokenPairList, tokenpair.toString())) {
        throw 'tokenpair is not exist';
        }

        if(whichhawker==tx.publisher){throw 'can not operate yourself'}

        if (!storage.mapHas(whichhawker,tokenpair.toString())) {
        throw "The hawker is not support this tokenpair."
        }

        if (!storage.mapHas(whichhawker,Hawker_FILED.ID)) {
            throw "The hawker is not exist."
        }   
        let islock=storage.mapGet(whichhawker,(pairKey+'_islock'));
        if(islock=='1'){return 'Sorry. Closed Now'}
        let limitsell=storage.mapGet(whichhawker,(pairKey+'_limitsell'));
        if(limitsell=='1'){return 'Sorry. Sell is limited by Hawker'} 
        let hawkerbanlist=JSON.parse(storage.mapGet(whichhawker,Hawker_FILED.Banlist))
        if(hawkerbanlist.includes(tx.publisher)){return `Sorry, you are in ${whichhawker} banlist`}
        let syma=storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_symbola);
        if(syma!='iost') {throw `must be iost`}
        let symb=storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_symbolb);
        let decimala=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_decimal_a));
        let decimalb=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.tokenPair_decimal_b));
        nSell_b =Number(nSell_b.toFixed(decimalb));
        let pool_token_a=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.pool_token_a));
        let pool_token_b=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.pool_token_b));
        let orderID=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.order_number))+1;
        let amount_token_a=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.amount_token_a))+nSell_b;
        let amount_token_a_24H=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.amount_token_a_24H));
        let timestampflag=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.timestamp));
        let daycount=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.dayflag));
        let balance_a=pairKey+'_balance_'+syma;
        let balance_b=pairKey+'_balance_'+symb;      
        let hawkerpool_token_a=Number(storage.mapGet(whichhawker,balance_a));
        let hawkerpool_token_b=Number(storage.mapGet(whichhawker,balance_b));
        if(hawkerpool_token_a<=0 || hawkerpool_token_b<=0) {throw `${whichhawker} balance not enough <=0`}
        let fee=Number(storage.mapGet(whichhawker,(pairKey+'_swapfee')));
        let feemode=storage.mapGet(whichhawker,(pairKey+'_swapfeemode'));      
        let hawkerpool_status=JSON.parse(storage.mapGet(whichhawker,(pairKey+'_returnarr'))); 
        let token_Owed_wofee=(hawkerpool_token_a-((hawkerpool_token_a*hawkerpool_token_b)/(nSell_b+hawkerpool_token_b)))
        let token_Owed=token_Owed_wofee*(1-fee);
        let fee_token_a=token_Owed_wofee-token_Owed;
        let fee_to_hawker=(fee_token_a)*fee_to_hawker_ratio;
        let fee_to_bonuspool=(fee_token_a)*fee_to_bonuspool_ratio;
        let fee_to_Team=fee_token_a-fee_to_hawker-fee_to_bonuspool;
        if((token_Owed<(nExpect_gain_a*(1-nslippage)))||(token_Owed>(nExpect_gain_a*(1+nslippage))) ){throw `Exceed ${100*nslippage}%, deal terminated`}  
        blockchain.callWithAuth('token.iost', 'transfer', [
            symb,
            tx.publisher,
            blockchain.contractName(),
            nSell_b.toFixed(decimalb),
            `WaxGourdSwap：Sell ${nSell_b} ${symb} tokens for ${token_Owed.toFixed(decimala)} ${syma}, trade with ${whichhawker}`
        ])    

        blockchain.callWithAuth('token.iost', 'transfer', [
            syma,
            blockchain.contractName(),
            tx.publisher,
            token_Owed.toFixed(decimala),
            `WaxGourdSwap：Got ${token_Owed.toFixed(decimala)} ${syma}, deal price:${(token_Owed/nSell_b).toFixed(8)},trade with ${whichhawker}`
        ]) 

        blockchain.callWithAuth('token.iost', 'transfer', [
            syma,
            blockchain.contractName(),
            Tax_Banus_Bank,
            fee_to_bonuspool.toFixed(decimala),
            `5% fee to Banus_Bank`
        ])    

        blockchain.callWithAuth('token.iost', 'transfer', [
            syma,
            blockchain.contractName(),
            Team_Account,
            fee_to_Team.toFixed(decimala),
            `5% fee to WG team`
        ]) 

        if(feemode=='md_re'){

            storage.mapPut(whichhawker,balance_b,(hawkerpool_token_b+nSell_b).toFixed(decimalb),tx.publisher);
            storage.mapPut(whichhawker,balance_a,(hawkerpool_token_a-token_Owed-fee_to_bonuspool-fee_to_Team).toFixed(decimala),tx.publisher);
            storage.mapPut(pairKey,TOKENPAIR_FIELD.pool_token_b,(pool_token_b+nSell_b).toFixed(decimalb),tx.publisher);
            storage.mapPut(pairKey,TOKENPAIR_FIELD.pool_token_a,(pool_token_a-token_Owed-fee_to_bonuspool-fee_to_Team).toFixed(decimala),tx.publisher);
            hawkerpool_status.balance_a=(hawkerpool_token_a-token_Owed-fee_to_bonuspool-fee_to_Team).toFixed(decimala);
            hawkerpool_status.balance_b=(hawkerpool_token_b+nSell_b).toFixed(decimalb);
        }
        if(feemode=='md_wi'){
            storage.mapPut(whichhawker,balance_b,(hawkerpool_token_b+nSell_b).toFixed(decimalb),tx.publisher);
            storage.mapPut(whichhawker,balance_a,(hawkerpool_token_a-token_Owed_wofee).toFixed(decimala),tx.publisher);
            storage.mapPut(pairKey,TOKENPAIR_FIELD.pool_token_b,(pool_token_b+nSell_b).toFixed(decimalb),tx.publisher);
            storage.mapPut(pairKey,TOKENPAIR_FIELD.pool_token_a,(pool_token_a-token_Owed_wofee).toFixed(decimala),tx.publisher);
            hawkerpool_status.balance_a=(hawkerpool_token_a-token_Owed_wofee).toFixed(decimala);
            hawkerpool_status.balance_b=(hawkerpool_token_b+nSell_b).toFixed(decimalb);

            blockchain.callWithAuth('token.iost', 'transfer', [
                syma,
                blockchain.contractName(),
                whichhawker,
                fee_to_hawker.toFixed(decimala),
                `WaxGourdSwap: Pool:${pairKey}: Got fee ${fee_to_hawker} ${syma} from ${tx.publisher}`
            ]) 
        }
        let WGmined=Number(storage.mapGet(Market_Keys.WGDeXinfo,WGDeXinfo_Field.WGtoken_mined));
        let cur_diff_e=Math.floor(WGmined/WG_MINE_PARA.mine_difficulty_tk_step);
        let cur_diff=Math.pow(WG_MINE_PARA.mine_difficulty_stepratio,cur_diff_e);
        let trade_mine_weight=Number(storage.mapGet(pairKey,TOKENPAIR_FIELD.trade_mine_weight));

        let ntoSeller=(fee_token_a*cur_diff*trade_mine_weight*WG_MINE_PARA.trade_buy_ratio);
        let ntoHawker=fee_token_a*cur_diff*trade_mine_weight-ntoSeller;

        blockchain.callWithAuth('token.iost', 'transfer', [
            'sab',
            blockchain.contractName(),
            tx.publisher,
            ntoSeller.toFixed(8),
            `WaxGourdSwap: You have mined ${ ntoSeller.toFixed(8) } WG tokens`
        ]) 

        blockchain.callWithAuth('token.iost', 'transfer', [
            'sab',
            blockchain.contractName(),
            whichhawker,
            ntoHawker.toFixed(8),
            `WaxGourdSwap:Pool ${pairKey}, ${tx.publisher} help you mined ${ ntoHawker.toFixed(8) } WG tokens`
        ]) 

        storage.mapPut(Market_Keys.WGDeXinfo,WGDeXinfo_Field.WGtoken_mined,(WGmined+ntoSeller+ntoHawker).toFixed(8),tx.publisher)

        storage.mapPut(pairKey,TOKENPAIR_FIELD.order_number,orderID.toFixed(0),tx.publisher);  
        storage.mapPut(pairKey,TOKENPAIR_FIELD.amount_token_a,(amount_token_a+token_Owed_wofee).toFixed(decimala),tx.publisher);             
        let bt = block.time;
        let curdayflag=Math.floor((((bt-timestampflag)/1000000000))/86400);   
        if(daycount==curdayflag){storage.mapPut(pairKey,TOKENPAIR_FIELD.amount_token_a_24H,(amount_token_a_24H+token_Owed_wofee).toFixed(decimala),tx.publisher);} 
        if(daycount!=curdayflag){storage.mapPut(pairKey,TOKENPAIR_FIELD.amount_token_a_24H,(token_Owed_wofee).toFixed(decimala),tx.publisher);
                              storage.mapPut(pairKey,TOKENPAIR_FIELD.dayflag,(curdayflag).toFixed(decimala),tx.publisher)}
        
   
        hawkerpool_status.order_number=(Number(hawkerpool_status.order_number)+1).toFixed(0);
        hawkerpool_status.amount_token_a=(Number(hawkerpool_status.amount_token_a)+token_Owed_wofee).toFixed(decimala); 
        
        let hawker_curdayflag=Math.floor((((bt-Number(hawkerpool_status.onshelf_start))/1000000000))/86400);   
        if(hawkerpool_status.dayflag==hawker_curdayflag.toFixed(0)){
            hawkerpool_status.amount_token_a_24H=(Number(hawkerpool_status.amount_token_a_24H)+token_Owed_wofee).toFixed(decimala);
        }
        if(hawkerpool_status.dayflag!=hawker_curdayflag.toFixed(0)){
            hawkerpool_status.amount_token_a_24H=(token_Owed_wofee.toFixed(decimala));
            hawkerpool_status.dayflag=hawker_curdayflag.toFixed(0);
        }
        
        hawkerpool_status.WGmined=(Number(hawkerpool_status.WGmined)+ntoHawker).toFixed(8); 
        storage.mapPut(whichhawker,(pairKey+'_returnarr'),JSON.stringify(hawkerpool_status),tx.publisher);

        return 'Successfully Swapped'
    }

    opbanlist(someone,par) {
        let hawker=tx.publisher;
        this._addHawkerAuth(hawker);

        if(someone==hawker){throw 'can not operate yourself'}
        if(par=="add"){

           let arr=JSON.parse(storage.mapGet(tx.publisher,Hawker_FILED.Banlist))
           if(arr.includes(someone)){throw 'allready in banlist'}

           arr.push(someone)
           storage.mapPut(hawker,Hawker_FILED.Banlist,JSON.stringify(arr),hawker); 
           
           return JSON.stringify(arr)
       }   
       if(par=="del"){
           let arr=JSON.parse(storage.mapGet(tx.publisher,Hawker_FILED.Banlist))
           if(arr.includes(someone)){
   
               let index=arr.indexOf(someone)
               arr.splice(index,1)
               storage.mapPut(hawker,Hawker_FILED.Banlist,JSON.stringify(arr),tx.publisher);
               return JSON.stringify(arr)
           }
         throw 'not in bandlist'
    
       }
       }

    DexSet(par1,par2,par3)
       {
        let hawker=tx.publisher;
        this._addHawkerAuth(hawker);
        if(par1=="setintro"){
        storage.mapPut(hawker,Hawker_FILED.Intro,par2,hawker);
        return 'YourDex intro set sucessfully!'
        }
        if(par1=='setfee'){
            let nfee=Number(par2)
            if (isNaN(nfee)) {throw 'fee is not number'}      
            if ((nfee<0.002) || (nfee>0.02) ) {throw 'InvalidFee0 exceed [0.2%-2%]';}
            let fee=par3+'_swapfee'
            let sta=par3+'_returnarr'
            if (!storage.mapHas(hawker,par3) || !storage.mapHas(hawker,fee) ||!storage.mapHas(hawker,sta)) {throw "notokenpair."}  
            storage.mapPut(hawker,fee,nfee.toFixed(4),hawker);
            let hawkerpool_status=JSON.parse(storage.mapGet(hawker,sta)); 
            hawkerpool_status.fee=nfee.toFixed(4)
            storage.mapPut(hawker,sta,JSON.stringify(hawkerpool_status),tx.publisher);
            return "fee Set OK"   
        }

       }


    can_update(data) {
        return blockchain.requireAuth(blockchain.contractOwner(), "active");
    }
    

    _contractOwnerAuth() {
        if (!blockchain.requireAuth(blockchain.contractOwner(), 'active')) {
          throw 'no auth.'
        }
      }
    _addHawkerAuth(hawker) {

        if (!storage.mapHas(hawker, Hawker_FILED.Authority)) {
            throw new Error("No Authority");
          }
    }
    _checkHawkerAuth(hawker) {

        if (storage.mapHas(hawker, Hawker_FILED.Authority)) {
            throw new Error("Had Already Authority");
          }   
    }

    issue(amountStr){
        this._contractOwnerAuth();
    
        return blockchain.callWithAuth('token.iost', 'issue', [
            TOKEN.tokenSymbol,
            blockchain.contractName(),
            amountStr.toString(),
        ]);
        }

    tradelock_all(par){
            this._contractOwnerAuth();
            storage.put(TradeLockAll,par);
            }
 
    _create() {
        
        return blockchain.callWithAuth('token.iost', 'create', [
            TOKEN.tokenSymbol,
            blockchain.contractName(),
            TOKEN.totalSupply,
            {
                'decimal': TOKEN.decimal,
                'canTransfer': true,
                'fullName': TOKEN.fullName
            }
        ]);
    }
}
module.exports = SaBSwap;
