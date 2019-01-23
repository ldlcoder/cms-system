import FormItemField from '@/components/FormItemFields/FormItemField'
import FormBtns from '@/components/FormBtns'
import { setUserRoles } from '@/api/rightMana'
import store from '@/store'

const createRolesField = (data = []) => ({
  props: { label: '分配角色' },
  fields: {
    component: 'ElCheckboxGroup',
    data
  }
})

export default {
  name: 'UserRolesSetPage',
  components: {
    FormItemField,
    FormBtns
  },
  data () {
    const query = JSON.parse(this.$route.query.row)
    const roles = query.roles
    const id = Number(query.id)
    return {
      id,
      loading: false,
      sending: false,
      formProps: { labelWidth: '100px' },
      userInfo: {
        name: query.name
      },
      formData: {
        id,
        roles: roles.length ? roles.map(item => item.id) : []
      }
    }
  },
  created () {
    this.$store.commit('SET_ADMIN_LAYOUT_SWITCH', { key: 'roles', value: true })
  },
  computed: {
    rolesList () {
      return this.$store.getters.roles
    },
    fieldItem () {
      const { rolesList } = this
      return createRolesField(rolesList)
    },
    baseParams () {
      return this.id ? { id: this.id } : {}
    }
  },
  methods: {
    /** utils **/
    /** business **/
    formDataHandle (data) {
      return { 'id': data.id, roles: data.roles }
    },
    formDataSend () {
      this.$fetch(setUserRoles, this.formDataHandle(this.formData)).lock('sending').done(data => {
        const msgConfig = data ? { message: '提交成功', type: 'success', onClose: this.returnToList } : { message: '提交失败，请稍后再试', type: 'error' }
        this.$message(msgConfig)
      })
    },
    /** event **/
    returnToList () {
      this.$router.push({ name: 'AccountList' })
    }
  }

}
