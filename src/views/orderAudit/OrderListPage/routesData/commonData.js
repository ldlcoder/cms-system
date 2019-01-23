import { checkoutFormItems, checkoutTableColumns } from '@/common'

const formItems = checkoutFormItems(['orderRandomId', 'name', 'mobile', 'subCompany', 'team'])
const tableColumns = checkoutTableColumns(['orderRandomId', 'name', 'mobile', 'model', 'isNew', 'subCompany', 'team', 'time', 'action'])

export default {
  formItems,
  tableColumns
}
