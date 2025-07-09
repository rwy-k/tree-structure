<template>
    <div>
        <div v-if="data.cat && !data._name">
            <TreeStructure v-for="item in data.cat" :key="item._nodeId" :data="item"/>
        </div>
        <div v-else-if="data.cat">
            <CollapsibleGroup :title="data._name" :id="data._nodeId" :is-open="openedNodes.includes(data._nodeId)" @toggle="toggleNode(data._nodeId)" @select="addToSelected(data)">
                <TreeStructure v-for="item in data.cat" :key="item._nodeId" :data="item" />
            </CollapsibleGroup >
        </div>
        <div v-else-if="data.leaf">
            <CollapsibleGroup :title="data._name" :id="data._nodeId" :is-open="openedNodes.includes(data._nodeId)" @toggle="toggleNode(data._nodeId)" @select="addToSelected(data)">
                <div v-for="item in data.leaf" :key="item._nodeId" @click="addToSelected(item)" class="leaf-item">{{item._name}}</div>
            </CollapsibleGroup>
        </div>
    </div>
</template>


<script lang="ts">
import CollapsibleGroup from './CollapsibleGroup.vue';
import store from '../store/tree';
import type { Node } from '../types/tree';

export default defineComponent({
  name: 'TreeStructure',
  components: {
    CollapsibleGroup
  },
  props: {
    data: {
      type: Object as PropType<Node>,
      required: true
    }
  },
  setup() {
    const openedNodes = computed(() => {
      return  store.state.openedNodes;
    });

    const toggleNode = (id: string) => {
      if (openedNodes.value.includes(id)) {
        store.commit('setClosed', id) 
      } else {
        store.commit('setOpened', id)
      }
    }

    const addToSelected = (node: Node) => {
      store.commit('addSelected', node)
    }
    return {
      openedNodes,
      toggleNode,
      addToSelected
    }
  }
})
</script>

<style scoped>
.leaf-item {
    cursor: pointer;
}
</style>
