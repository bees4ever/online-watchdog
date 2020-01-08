<template>
  <div id="wrapper" v-bind:class="{ alertOffline: !watchdogOnline}">
    Status: <span v-if="watchdogOnline">online <span class="lamp green"></span> </span>
            <span v-if="!watchdogOnline">offline <span class="lamp red"></span> </span>
    <main>
    {{t}}
    
    </main>

  <div class="my-2">
            <router-link to="/outages">
              <v-btn x-large color="success" dark>Details of Outtages</v-btn>
            </router-link>
            
          </div>
    <router-link to="/landing">/landing</router-link>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  // import { remote } from 'electron'
  import { VBtn } from 'vuetify/lib'

  export default {
    name: 'main-watcher',
    data () {
      return {
        t: 0,
        bouncer: 0
      }
    },
    components: {
      VBtn
    },
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
    //       console.log(remote.app)
    },
    methods: {
      ...mapActions('Watchdog', [
        'initAndStartWatchDog',
        'startNewOutage'
      ])
  
    },
    watch: {
      watchdogOnline () { /*
        if (!this.watchdogOnline) {
          this.bouncer = setInterval(() => remote.app.dock.bounce('informational'), 2000)
          remote.app.dock.setBadge('offline')
          remote.app.dock.show()
        } else {
          clearInterval(this.bouncer)
          remote.app.dock.setBadge('')
        } */
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

.lamp {
    border-radius: 100%;
    width: 10px;
    display: inline-block;
    height: 10px;
}

.green {
  animation: greenblink 5s infinite;
}

.red {
  animation: redblink 5s infinite;
}


 @keyframes greenblink
    {
      0%   {background-color: rgb(0, 255, 85);}
      100% {background-color: rgb(0, 255, 170);}
    }

    @keyframes redblink
    {
      0%   {background-color: rgb(255, 60, 0);}
      100% {background-color: rgb(255, 0, 0);}
    }

</style>
