<template>
  <div class="comp-radio-tags">
    <template v-if="data.length">
      <a
        v-for="(item, index) of data"
        v-if="item && item.hasOwnProperty(valueKey)"
        @click="tagHandle(index)"
        :class="['rt-tag', tagClassName, {current: curIndexHandle === index}]"
        href="javascript:void(0)"
      >
        {{filter ? filter(item) : item.text}}
      </a>
    </template>
  </div>
</template>

<script>
export default {
  name: 'RadioTags',
  props: {
    data: {
      type: Array,
      required: true
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    tagClassName: String,
    filter: Function,
    value: [String, Number]
  },
  data () {
    return {
      curIndex: this.getInitIndex()
    }
  },
  created () {
  },
  computed: {
    curIndexHandle () {
      const { value } = this
      this.curIndex = this.data.findIndex(item => (item[this.valueKey] === value)) || 0
      return this.curIndex
    }
  },
  methods: {
    // utils
    getInitIndex () {
      return typeof this.initValue !== 'undefined' ? this.data.findIndex(item => (item[this.valueKey] === this.initValue)) : 0
    },
    // bussiness
    // events
    tagHandle (index) {
      if (this.curIndex !== index) {
        this.curIndex = index
        let { onChange, data } = this
        this.$emit('input', data[index][this.valueKey])
        this.$emit('on-change', data[index][this.valueKey], data[index])
      }
    }
  }
}
</script>
<style lang="scss" scoped >
.comp-radio-tags {
  text-align: left;
  .rt-tag {
    display: inline-block;
    box-sizing: border-box;
    margin: 0 10px 10px 0;
    padding: 0 14px;
    height: 30px;
    min-width: 120px;
    line-height: 30px;
    border-radius: 2px;
    text-align: center;
    font-size: 14px;
    color: #367ded;
    background-color: #e6f1fe;
    text-decoration: none;
    &.current {
      color: #fff;
      background-color: #357ced;
    }
  }
}
</style>
