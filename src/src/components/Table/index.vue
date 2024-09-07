<script lang="tsx" generic="T">
import { defineComponent, PropType, toRefs, } from 'vue'
import { ElTable, ElEmpty, ElTableColumn, } from 'element-plus'
import { Column, ColumnRenderScope, } from './column'

export type { Column }
interface Props {
  columns: Column[]
}

export default defineComponent(
  (props, { slots, }) => {
    const { columns, } = toRefs(props)

    function renderColumn(col: Column) {
      const renderInner = (scope: ColumnRenderScope) => {
        if (col.render) return col.render(scope)
        if (col.children && col.children.length) {
          return col.children.map(child => renderColumn(child))
        }
      }
      return (
        <ElTableColumn {...col}>{{
          default: (scope: ColumnRenderScope) => renderInner(scope),
        }}</ElTableColumn>
      )
    }

    function render() {
      if (slots.default) return slots.default()
      if (!columns.value) return null
      return columns.value.map(col => renderColumn(col))
    }

    function renderEmpty() {
      if (slots.empty) return slots.empty()
      return (
        <ElEmpty />
      )
    }

    return () => (
      <ElTable>{{
        default: render,
        empty: renderEmpty,
      }}</ElTable>
    )
  },
  {
    props: {
      columns: {
        type: Object as PropType<Props['columns']>,
      },
    },
  },
)

</script>
