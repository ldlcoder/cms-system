import FormItemField from '@/components/FormItemFields/FormItemField'
import FormBtns from '@/components/FormBtns'
import { getCompanyRights, addRole, setRoleRights, getRoleInfo } from '@/api/rightMana'
import { createRolesNameField, rightsRule } from './dataHandle'

export default {
  name: 'RoleRightsEditPage',
  components: {
    FormItemField,
    FormBtns
  },
  data () {
    const { query } = this.$route
    const roleId = query.id ? Number(query.id) : 0
    return {
      roleId,
      loading: false,
      sending: false,
      formProps: { labelWidth: '100px' },
      formData: {
        name: '',
        right_ids: []
      },
      rightsList: [],
      rightsRule
    }
  },
  computed: {
    isEdit () {
      return this.$route.name === 'RoleEdit'
    },
    roleNameField () {
      return createRolesNameField(this.isEdit)
    },
    baseParams () {
      return this.roleId ? { 'role_id': this.roleId } : {}
    }
  },
  created () {
    this.rightCheck()
    this.getCompanyRights()
    this.isEdit && this.getRoleInfo()
  },
  methods: {
    /** utils **/
    rightCheck () {
      this.isEdit && !this.roleId && this.returnToList()
    },
    /** business **/
    getCompanyRights () {
      this.$fetch(getCompanyRights).done(data => {
        this.rightsList = Array.isArray(data) ? data : []
      })
    },
    getRoleInfo () {
      this.roleId && this.$fetch(getRoleInfo, this.baseParams).lock('loading').done(data => {
        if (data) {
          this.formData = data
        } else {
          this.$leaseMessage(false, '获取角色数据失败，请稍后重试')
        }
      })
    },
    formDataSend (api, params) {
      this.$fetch(api, params).lock('sending').done(data => {
        this.$leaseMessage(data, (data ? '提交成功' : '提交失败，请稍后再试'), this.returnToList)
      })
    },
    // 递归处理权限树选中状态
    setChildrenNodeCheck (node, checked) {
      const { rightsTree } = this.$refs
      Array.isArray(node.childNodes) && node.childNodes.forEach(cnode => {
        cnode.checked !== checked && rightsTree.setChecked(cnode.data, checked)
        this.setChildrenNodeCheck(cnode, checked)
      })
    },
    setParentNodeCheck (node) {
      const { rightsTree } = this.$refs
      let { parent } = node
      while (parent) {
        rightsTree.setChecked(parent.data, true)
        parent = parent.parent
      }
    },
    /** event **/
    formDataSubmit () {
      const { isEdit, baseParams, formData } = this
      const api = isEdit ? setRoleRights : addRole
      const params = isEdit ? { ...baseParams, ...formData } : formData
      this.formDataSend(api, params)
    },
    rightChange (data) {
      const { rightsTree } = this.$refs
      const curNode = rightsTree.getNode(data)
      const { checked } = curNode
      if (data.is_menu === 1) {
        this.setChildrenNodeCheck(curNode, checked)
      } else if (checked) {
        this.setParentNodeCheck(curNode)
      }
      const { getCheckedKeys } = rightsTree || {}
      this.formData.right_ids = getCheckedKeys()
      this.$refs.form.validateField('right_ids')
    },
    returnToList () {
      this.$router.push({ name: 'RoleMana' })
    }
  }

}
