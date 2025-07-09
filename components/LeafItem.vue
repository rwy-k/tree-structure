<template>
    <div class="leaf-item" :class="{ 'highlighted': isHighlighted }" @click="highlight">{{title}}</div>
</template>

<script lang="ts">
import store from '../store/tree';

export default defineComponent({
    name: 'LeafItem',
    props: {
        title: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
    },
    setup(props) {
        const isHighlighted = computed(() => store.state.highlightedNode === props.id)
        const highlight = () => {
            if (isHighlighted.value) store.commit('removeHighlightedNode')
            else store.commit('setHighlightedNode', props.id);
        }
        return {
            isHighlighted,
            highlight
        }
    }
})
</script>

<style scoped>
.leaf-item {
    cursor: pointer;

    &.highlighted {
        background-color: #f0f0f0;
    }
}
</style>