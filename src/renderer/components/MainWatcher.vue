<template>
  <div id="wrapper" v-bind:class="{ alertOffline: !watchdogOnline}">
    
    <main>
    {{t}}
    
    </main>

    <router-link to="/landing">/landing</router-link>
  </div>
</template>

<script>
  import { mapGetters, mapActions, mapState } from 'vuex'
    import { remote } from 'electron'

  export default {
    name: 'main-watcher',
    data () {
      return {
        t: 0,
        bouncer: 0
      }
    },
    components: {},
    computed: {
      ...mapState('Watchdog', [
        'onlineOutages',
        'watchshift',
        'currentOutage',
        'watchdogOnline'
        ])
    },
    mounted () {
      this.initAndStartWatchDog()
      
      
      console.log(remote.app)
      remote.app.dock.bounce("critial")
  },
    methods: {
      ...mapActions('Watchdog', [
        'initAndStartWatchDog' ,
        'startNewOutage'
      ]),
      
    },
    watch: {
      watchdogOnline(){
        if(!this.watchdogOnline){
          this.bouncer = setInterval(() => remote.app.dock.bounce("critial"), 2000);
          remote.app.dock.setBadge("offline")
        } else {
          clearInterval(this.bouncer)
          remote.app.dock.setBadge(":)")
        }
      }
    }
  }
</script>

<style>
    #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  .alertOffline {
      animation: colorchange 5s infinite; /* animation-name followed by duration in seconds*/
         /* you could also use milliseconds (ms) or something like 2.5s */
      -webkit-animation: colorchange 5s infinite; 
  }
  
    @keyframes colorchange
    {
      0%   {background: red;}
      25%  {background: yellow;}
      50%  {background: orange;}
      100% {background: red;}
    }

    @-webkit-keyframes colorchange /* Safari and Chrome - necessary duplicate */
    {
      0%   {background: red;}
      25%  {background: yellow;}
      50%  {background: orange;}
      100% {background: red;}
    }

</style>
