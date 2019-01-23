import Vue from 'vue'
Vue.mixin({
  computed: {
    RouteRights () {
      const { meta } = this.$route
      return meta && Array.isArray(meta.actions) ? meta.actions : []
    }
  },
  methods: {
    $leaseMessage (success, message, onClose) {
      let config = {
        type: success ? 'success' : 'error',
        message
      }
      success && typeof onClose === 'function' && (config.onClose = onClose)
      this.$message(config)
    }
  }
})
