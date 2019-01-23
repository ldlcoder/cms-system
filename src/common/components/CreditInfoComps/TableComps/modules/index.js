import pbank from './pbank'
import fico from './fico'
import bank100 from './bank100'
import tongdun from './tongdun'
import verify from './verify'
import special from './brspecial'
import natural from './brnatural'
import tongdunDetail from './tongdunDetail'
export default {
  pbank,
  fico,
  bank100,
  tongdun,
  verify,
  special,
  natural,
  duotou: tongdunDetail(true, '多头详情'),
  net: tongdunDetail()
}