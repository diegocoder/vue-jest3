<template>
  <div>
    <message :msg="msg"></message>
    <button id="toggle-message" @click="toggleMessage">
      Change message
    </button>
    <message id="callMsg" :msg="important"></message>
    <button id="call" @click="makeCall">
      Call remote json
    </button>
  </div>
</template>

<script>
import Message from '@/components/Message.vue'
// import axios from 'axios'


export default {
  name: 'message-toggle',
  data: () => ({
    msg: null,
    important: null
  }),
  methods: {
    toggleMessage () {
      this.msg = this.msg === 'message' ? 'toggled message' : 'message'
    },
    storeResponse (response) {
      console.log(response)
      this.important = response.data['disclaimer']
    },
    makeCall () {
      this.$http
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.storeResponse(response)))
    }
  },
  components: {
    Message
  }
}
</script>
