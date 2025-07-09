<template>
    <div>
        <div class="collapsible-group-header" :class="{ 'collapsible-group-header-highlight': isHighlighted }">
            <button @dblclick="toggle" @click="highlight">
                <span class="material-symbols-outlined">
                    {{ isOpen ? 'expand_less' : 'expand_more' }}
                </span>
                <div class="collapsible-group-title">{{ title }}</div>
            </button>
        </div>
        <div class="collapsible-group-content" v-if="isOpen">
            <slot></slot>
        </div>
    </div>
</template>


<script lang="ts">
import store from '../store/tree';
export default defineComponent({
  name: 'CollapsibleGroup',
  props: {
    title: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select', 'toggle'],
  setup(props, { emit }) {
    const isHighlighted = computed(() => store.state.highlightedNode === props.id)

    const toggle = () => {
      emit('toggle');
    }
    const highlight = () => {
      if (isHighlighted.value) store.commit('removeHighlightedNode')
      else store.commit('setHighlightedNode', props.id);

      emit('select', props.title)
    }
    return {
      toggle,
      highlight,
      isHighlighted
    }
  }
})
</script>

<style scoped>
.collapsible-group-header {
    button  {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: transparent;
        border: none;
        cursor: pointer;  
    }


  &.collapsible-group-header-highlight {
    background-color: #f0f0f0;
  }
}

.collapsible-group-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.collapsible-group-content {
  margin-left: 2rem;
  padding-left: 1rem;
  border-left: 1px solid #f0f0f0;

}
</style>