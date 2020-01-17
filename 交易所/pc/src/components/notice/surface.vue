<style type="less" lang="less">
    @import './surface.less';
</style>
<template lang="html">
    <div class="surface">
        <div class="title">GTEEX数字合约平台交易费率标准</div>
        <div class="list">
            <ul class="kuang">
                <li class="kuang_1 kuang_cu">
                  <div class="one">交易币种</div>
                  <div>BTC</div>
                  <div>ETH</div>
                  <div>BCH</div>
                  <div>LTC</div>
                  <div>ZEC</div>
                  <div>DASH</div>
                  <div>ETC</div>
                  <div>EOS</div>
                  <div>XRP</div>
                </li>
                <li class="kuang_1">
                  <div class="one">最小报价单位</div>
                  <div>0.01</div>
                  <div>0.01</div>
                  <div>0.01</div>
                  <div>0.01</div>
                  <div>0.01</div>
                  <div>0.01</div>
                  <div>0.01</div>
                  <div>0.0001</div>
                  <div>0.0001</div>
                </li>
                <li class="kuang_1">
                  <div class="one">最小下单数量</div>
                  <div>2</div>
                  <div>100</div>
                  <div>100</div>
                  <div>200</div>
                  <div>200</div>
                  <div>200</div>
                  <div>2000</div>
                  <div>2000</div>
                  <div>20000</div>
                </li>
                <li class="kuang_1">
                  <div class="one">币种点差</div>
                  <div>3U</div>
                  <div>0.4U</div>
                  <div>0.4U</div>
                  <div>0.2U</div>
                  <div>0.2U</div>
                  <div>0.3U</div>
                  <div>0.02U</div>
                  <div>0.02U</div>
                  <div>0.0025U</div>
                </li>
                <li class="kuang_1">
                  <div class="one">交易杠杆</div>
                  <div class="two">50，75，100</div>
                </li>
                <li class="kuang_1">
                  <div class="one">占用保证金</div>
                  <div class="two">占用保证金=每手保证金X数量/杠杆</div>
                </li>
                <li class="kuang_1">
                  <div class="one">计价单位</div>
                  <div class="two">USDT</div>
                </li>
                <li class="kuang_1">
                  <div class="one">手续费</div>
                  <div class="two">单边0.05%</div>
                </li>
                <li class="kuang_1">
                  <div class="one">交易机制</div>
                  <div class="two">T+0双向交易，无交割</div>
                </li>
                <li class="kuang_1">
                  <div class="one">交易时间</div>
                  <div class="two">7X24小时</div>
                </li>
                <li class="kuang_1">
                  <div class="one">充提币种</div>
                  <div class="two">USDT</div>
                </li>
                <li class="kuang_1">
                  <div class="one">强制平仓</div>
                  <div class="two">爆仓率高于爆仓率高于80%系统会强行平仓,爆仓率=账户净值/占用保证金</div>
                </li>
                <li class="kuang_1">
                  <div class="one">提币审核</div>
                  <div class="two">提币审核时间:周一到周六9:00--20:00</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        
    }
  },
  watch: {},
  methods: {

  },
  created() {
    
  },
  mounted() {}
}

</script>
