import { getCarsConfig } from '@/api/common'
export function distRules (required, message) {
  return (required ? [{ required: true, message, trigger: 'change' }] : [])
}

export default {
  name: 'FormItemCarsCascader',
  components: {
  },
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    onChange: Function,
    events: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      options: []
    }
  },
  created () {
    this.handleItemChange(this.value)
  },
  computed: {
    handleEvents () {
      return this.onChange ? Object.assign({ change: this.getFullValue }, this.events) : this.events
    },
    handleValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    value () {
      this.handleItemChange(this.value)
    }
  },
  methods: {
    async handleItemChange (value) {
      !this.options.length && (this.options = await this.getCarsInfoList())
      let lastItem = this.options
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          const val = value[i]
          let curItem = lastItem && lastItem.find(item => item.value === val)
          switch (i) {
            case 0:
            case 1:
              const type = i === 0 ? 'series' : 'type'
              curItem && curItem.children && !curItem.children.length && (curItem.children = await this.getCarsInfoList(val, type))
              break
          }
          lastItem = curItem && curItem.children
        }
      }
    },
    getCarsInfoList (value = '', type = 'brand', curItem) {
      return new Promise(resolve => {
        this.$fetch(getCarsConfig, { type, value }).done(data => {
          this.dataHandler(type, data)
          resolve(data)
        })
      })
    },
    dataHandler (type, data) {
      if (type === 'brand' || type === 'series') {
        data.forEach(item => (!item.children && (item.children = [])))
      }
    },
    getFullValue (value) {
      let lastItem = this.options
      const fullValues = value.map((val, index) => {
        const curItem = index === 0 ? lastItem.find(item => item.value === val) : lastItem.children.find(item => item.value === val)
        lastItem = curItem
        return curItem
      })
      this.onChange(fullValues)
    }
  }
}
