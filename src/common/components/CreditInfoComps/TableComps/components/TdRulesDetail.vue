<template>
  <ul class="detail-items">
    <li v-for="item in handleItems" :key="item.label"><span>{{item.label}}:</span><span>{{item.value}}</span>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'TdRulesDetail',
  props: {
    scope: Object,
  },
  computed: {
    handleItems () {
      return Array.isArray(this.scope.row.detail) ? this.scope.row.detail : []
    }
  }
}
</script>
