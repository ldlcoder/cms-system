import FormItemField from '@/components/FormItemFields/FormItemField'
export default {
  components: {
    FormItemField
  },
  props: {
    field: Object,
    value: null,
    required: Boolean,
    prop: String
  },
  computed: {
    handleValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
  }
}
