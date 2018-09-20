<template>
  <section class="termsheet">
    <header>Term Sheet</header>
    <p>Trading and financing trades in DApp Tokens entails certain risks. This risk disclosure statement cannot and does not disclose all risks and other aspects involved in holding, trading, or engaging in financing or financed transactions in DApp Tokens. Risks include, but are not limited to, the following:

1. Market Risk: The market for DApp Tokens is still new and uncertain. No-one should have funds invested in DApp Tokens or speculate in DApp Tokens that she is not prepared to lose entirely. Whether the market for one or more DApp Tokens will move up or down, or whether a particular DApp Token will lose all or substantially all of its value, is unknown. Participants should be cautious about holding DApp Tokens.
2. Liquidity and Listing Risk: Any market for tokens may abruptly appear and vanish. DappPub makes no representations or warranties about whether a DApp Token that may be traded on the Site may be traded on the Site any point in the future, if at all. Any DApp Token is subject to delisting without notice or consent.
3. Legal Risk: The legal status of certain DApp Tokens may be uncertain. This can mean that the legality of holding or trading them is not always clear. Whether and how one or more DApp Tokens constitute property, or assets, or rights of any kind may also seem unclear. Participants are responsible for knowing and understanding how DApp Tokens will be addressed, regulated, and taxed under applicable law.
4. Exchange Risk: Having DApp Tokens on deposit or with any third party in a custodial relationship has attendant risks. These risks include security breaches, risk of contractual breach, and risk of loss. Participants should be wary of allowing third parties to hold their property for any reason.
5. Trading Risk: In addition to liquidity risks, values in any DApp Token marketplace are always changing (e.g., the initial token selling fee set by the DApp team could be up to 50%). Participants in any DApp Tokens market are warned that they should pay close attention to their position and holdings, and how they may be impacted by sudden and adverse shifts in trading and other market activities.
6. Risks Associated with Financing Activities: When you finance a purchase or sale of DApp Tokens on a peer-to-peer basis, you run the risk of losing your provided financing. Similarly, when you accept financing to enter a trading agreement, you accept the risk of not being able to repay that financing (e.g., if the market price of the DApp Token you purchased with the financing falls). Participants should know all of the terms of any contracts they enter and how their trading strategies and other market and risk factors can affect their financing obligations.

<strong>You acknowledge and consent that you shall access and use the Services at your own risk. The final interpretation of this agreement belongs to DappPub.</strong></p>
  </section>
</template>

<script>
export default {
  computed: {
    token() {
      return this.$state.token;
    }
  }
};
</script>

<style scoped>
.termsheet {
  background-color: #fff;
  box-shadow: rgba(114, 115, 119, 0.05) 0px 4px 14px;
  border: 1px solid #DBE1E8;
  border-radius: 6px;
  padding: 24px 32px 150px 32px;
} 

.termsheet > header {
  font-weight: 600;
  color: rgb(80, 92, 108);
  margin-bottom: 30px;
  line-height: 1.5;
}

.termsheet hr {
  margin: 60px 0;
}

.termsheet h1 {
  margin-bottom: 10px;
}

.termsheet h2 {
  margin-bottom: 60px;
  text-align: right;
}

.termsheet h3 {
  margin-top: 30px;
  margin-bottom: 5px;
}
</style>

