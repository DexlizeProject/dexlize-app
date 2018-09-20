<template>
  <footer class="footer">
    <nav class="social-links">
      <ul>
        <li>
          <a href="//twitter.com/DappPub" target="_blank">
            <img 
              class="footer-icon"
              :src="iconTwitter" 
              alt="twitter" />
          </a>
        </li>
        <li>
          <a href="//github.com/dappub" target="_blank">
            <img 
              class="footer-icon"
              :src="iconGithub" 
              alt="github" />
          </a>
        </li>
        <li>
          <a href="//medium.com/dapppub" target="_blank">
            <img 
              class="footer-icon"
              :src="iconMedium" 
              alt="medium" />
          </a>
        </li>
        <li>
          <a href="//www.reddit.com/user/dapppub" target="_blank">
            <img 
              class="footer-icon"
              :src="iconReddit" 
              alt="reddit" />
          </a>
        </li>
      </ul>
    </nav>
    <p class="copyright">Copyright &copy; 2018. DAPP PUBLISH PTE. LTD.</p>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        iconGithub: require('@/assets/github.svg'),
        iconTwitter: require('@/assets/twitter.svg'),
        iconMedium: require('@/assets/medium.svg'),
        iconReddit: require('@/assets/reddit.svg')
      };
    }
  };
</script>

<style scoped>
  .footer {
    padding: 15px 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff; 
  } 

  .footer-icon {
    width: 30px;
  }

  .social-links > ul {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .social-links > ul > li:not(:last-child) {
    margin-right: 60px;
  }

  .social-links > ul > li {
    cursor: pointer;
    transition: margin 200ms ease;
    opacity: .5;
  }

  .social-links > ul > li:hover {
    margin-top: -10px;
    opacity: 1;
  }

  .copyright {
    color: #888;
    font-size: .8em;
    font-weight: 300;
  }
</style>

