export default {
  methods: {
    cloneJsonObj (obj) {
      try {
        return JSON.parse(JSON.stringify(obj))
      } catch (e) {}
    }
  }
}
