import { TableColumnCtx, } from 'element-plus'
import { VNode, } from 'vue'

export type ElColumnKeys =
  'type' |
  'index' |
  'label' |
  'columnKey' |
  'prop' |
  'width' |
  'minWidth' |
  'fixed' |
  'renderHeader' |
  'sortable' |
  'sortMethod' |
  'sortBy' |
  'sortOrders' |
  'resizable' |
  'formatter' |
  'showOverflowTooltip' |
  'align' |
  'headerAlign' |
  'className' |
  'labelClassName' |
  'selectable' |
  'reserveSelection' |
  'filters' |
  'filterPlacement' |
  'filterClassName' |
  'filterMultiple' |
  'filterMethod' |
  'filteredValue'

export interface ColumnRenderScope<T = any> {
  row: T
  $index: number
  column: TableColumnCtx<T>
  cellValue: any
}

export interface Column<T = any> extends Partial<Pick<TableColumnCtx<T>, ElColumnKeys>> {
  children?: Column<T>[]
  render?: (scope: ColumnRenderScope<T>) => VNode | any
}
