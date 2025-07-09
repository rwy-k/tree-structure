<template>
  <div class="main">
    <div>
      <div class="actions">
        <button @click="openSelected">Expand</button>
        <button @click="closeSelected">Collapse</button>
      </div>
      <TreeStructure :data="tree" />
    </div>
    <NodeList />
  </div>
</template>

<script lang="ts">
import store from './store/tree';
import TreeStructure from './components/TreeStructure.vue';
import NodeList from './components/NodeList.vue';

export default defineComponent({
  components: {
    TreeStructure,
    NodeList
  },
  setup() {
    const tree = ref(store.state.data)
    const openSelected = () => {
      store.commit('openAllChildren', store.state.highlightedNode || "");
    }
    const closeSelected = () => {
      store.commit('closeAllChildren', store.state.highlightedNode || "");
    }
    onMounted(async () => {
      const saved = localStorage.getItem('tree-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        store.state.highlightedNode = parsed.highlightedNode || "1";
        store.state.openedNodes = parsed.openedNodes || ["1"];
        store.state.selectedNodes = parsed.selectedNodes || [];
      }
    })

    return {
      tree,
      openSelected,
      closeSelected
    }
  }
})
</script>
<style lang="scss">
.main {
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
}
</style>