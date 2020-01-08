<template>
  <div id="wrapper" v-bind:class="{ alertOffline: !watchdogOnline}">
    

      <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Start</th>
          <th class="text-left">End</th>
          <th class="text-left">Dauer</th>
        </tr>
      </thead>
      <tbody>
        <tr @click="readMessage(index)" v-for="(out, index) in onlineOutages" v-bind:key="index" style="cursor: pointer;" v-bind:class="{ unreadMsg: (unreadMessageNums.indexOf(index) > -1)}">
          <td>{{out['start'] | moment("d.MM.YYYY HH:mm:ss") }}</td>
          <td>{{out['end'] | moment("d.MM.YYYY HH:mm:ss")}}</td>
          <td>{{ calcDiff(out['start'], out['end']) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

              <v-btn x-large color="danger" @click="cleanOutages()" dark>Clean</v-btn>

             <router-link to="/">
              <v-btn x-large color="success" dark>Zurück</v-btn>
            </router-link>
            
            
          
  </div>
</template>

<script>
  // mapGetters,
  import { mapActions, mapState } from 'vuex'
  // import { remote } from 'electron'
  import { VBtn, VSimpleTable } from 'vuetify/lib'
  // import { moment } from 'moment'
  export default {
    name: 'main-watcher',
    data () {
      return {
  
      }
    },
    components: {
      VSimpleTable,
      VBtn
    },
    computed: {
      ...mapState('Watchdog', [
        'onlineOutages',
        'watchshift',
        'currentOutage',
        'watchdogOnline',
        'unreadMessageNums'
      ])
    },
    mounted () {
      this.initAndStartWatchDog()
      setInterval(() => console.warn(this.watchdogOnline), 500)
    },
    methods: {
      ...mapActions('Watchdog', [
        'initAndStartWatchDog',
        'cleanOutages',
        'readMessage'
      ]),
      calcDiff (start, end) {
        var diff = Math.floor((Date.parse(end) - Date.parse(start)) / 1000)
        var sec = diff % 60
        diff = (diff - sec) / 60
        var min = diff % 60
        diff = (diff - min) / 60
        var hours = diff
        return `${hours}:${min}:${sec}`
      }
  
    },
    watch: {
  
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

.unreadMsg{
    font-weight: bolder;
}
  

</style>
