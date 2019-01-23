import CardModulePane from '@/common/components/CardModulePane'
import FormItemFields from '@/components/FormItemFields'
import FormItemField from '@/components/FormItemFields/FormItemField'
import LoansList from './components/LoansList'
import LoanConfirm from './components/LoanConfirm'
import FormBtns from '@/components/FormBtns'
import { getFormFields, getFormulaField } from './dataHandler'
import { commonFormProps } from '@/common'
import { getLoanPrintList, setMonthlyformula, addLoanPrint, editLoanPrint, deleteLoanPrint, getMonthlyformula } from '@/api/loanMana'
import { cloneDeep } from 'lodash'
export default {
  name: 'LoadnIndex',
  components: {
    CardModulePane,
    FormItemField,
    FormItemFields,
    LoanConfirm,
    FormBtns,
    LoansList
  },
  beforeRouteEnter (to, from, next) {
    next(vm => { vm.$forceUpdate() })
  },
  data () {
    return {
      formProps: commonFormProps(true),
      fieldItems: getFormFields.call(this),
      formulaEdit: false,
      isEdit: false,
      editRow: -1,
      data: [],
      loading: false,
      ffSending: false,
      sending: false,
      loanConfirm: false,
      formData: {},
      formulaFormData: {
        formula: ''
      }
    }
  },
  computed: {
    formulaItem () {
      return getFormulaField.call(this, this.formulaEdit)
    }
  },
  created () {
    this.getLoanFormula()
    this.getLoanList()
  },
  methods: {
    /** utils **/
    formDataSwitch (data, isSend) {
      data = cloneDeep(data)
      if (isSend) {
        data.loan_rate /= 100
      } else {
        data.loan_rate *= 100
      }
      return data
    },
    /** business **/
    getLoanFormula () {
      this.$fetch(getMonthlyformula).done(data => {
        const { formula } = data
        data && formula && (this.formulaFormData.formula = formula)
      })
    },
    getLoanList () {
      this.$fetch(getLoanPrintList).lock('loading').done(data => {
        this.data = data && Array.isArray(data.list) ? data.list : []
      })
    },
    formulaSend () {
      this.$fetch(setMonthlyformula, this.formulaFormData).lock('ffSending').done(data => {
        this.$leaseMessage(data, data ? '公式提交成功' : '公式提交失败')
        data && (this.formulaEdit = false)
      })
    },
    loanSend () {
      const api = this.isEdit ? editLoanPrint : addLoanPrint
      const word = this.isEdit ? '编辑' : '添加'
      const params = this.formDataSwitch(this.formData, true)
      this.$fetch(api, params).lock('sending').done(data => {
        this.loanConfirm = false
        this.$leaseMessage(data, data ? `贷款方案${word}成功` : `贷款方案${word}失败`)
        if (data) {
          this.getLoanList()
          this.loanEditCancel()
        }
      })
    },
    /** event **/
    loanEditCancel () {
      this.isEdit = false
      this.formData = {}
    },
    loanFormSubmit () {
      this.$refs.loan && this.$refs.loan.validate(res => { res && (this.loanConfirm = true) })
    },
    editLoan (item, scope) {
      this.isEdit = true
      this.editRow = scope.$index
      this.formData = this.formDataSwitch(item)
    },
    deleteLoan (item, scope) {
      item.id && this.$fetch(deleteLoanPrint, { id: item.id }).done(data => {
        this.$leaseMessage(data, data ? `贷款方案删除成功` : `贷款方案删除失败`)
        data && this.data.splice(scope.$index, 1)
      })
    }
  }

}
