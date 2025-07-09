<template>
    <div class="node-list">
        <div v-for="node in selectedNodes" :key="node._nodeId" class="node-list-item">
            <button class="material-symbols-outlined" @click="removeFromSelected(node)">remove</button>
            <div class="node-list-item-name">{{ node._name }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import store from '../store/tree';
import type { Node } from '../types/tree';

export default defineComponent({
    name: 'NodeList',
    setup() {
        const selectedNodes = computed(() => store.state.selectedNodes)
        const removeFromSelected = (node: Node) => {
            store.commit('removeSelected', node)
        }
        return {
            selectedNodes,
            removeFromSelected
        }
    }
})
</script>

<style lang="scss">
.node-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    .node-list-item {
        display: flex;
        flex-direction: row;
        gap: 10px;
        .node-list-item-name {
            font-size: 20px;
            font-weight: 500;
        }
    }
}
</style>