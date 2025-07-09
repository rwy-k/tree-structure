import { createStore } from "vuex";
import test from '../public/8096720258560649974test.json';
import type { State, Node } from '../types/tree';

const saveState = (state: State) => {
  localStorage.setItem('tree-state', JSON.stringify(state));
}

const store = createStore<State>({
  state(): State {
    return {
      data: test.tree,
      selectedNodes: [],
      openedNodes: ["1"],
      highlightedNode: "1",
    };
  },
  mutations: {
    addSelected(state: State, node: Node) {
      if (!state.selectedNodes.some(n => n._nodeId === node._nodeId)) state.selectedNodes.push(node);
      saveState(state);
    },
    removeSelected(state: State, node: Node) {
      state.selectedNodes = state.selectedNodes.filter(n => n._nodeId !== node._nodeId);
      saveState(state);
    },
    setOpened(state: State, id: string) {
      state.openedNodes.push(id);
      saveState(state);
    },
    setClosed(state: State, id: string) {
      state.openedNodes = state.openedNodes.filter(node => node !== id);
      saveState(state);
    },
    setHighlightedNode(state: State, id: string) {
      console.log('Mutation setHighlightedNode:', id);
      state.highlightedNode = id;
      saveState(state);
    },
    removeHighlightedNode(state: State) {
      state.highlightedNode = null;
      saveState(state);
    },
    openAllChildren(state: State, id: string) {
      const openChildren = (nodeId: string, data: Node) => {
        if (data._nodeId === nodeId) {
          state.openedNodes.push(nodeId);
          data.cat?.forEach?.((child: Node) => openChildren(child._nodeId, child))
        } else {
          data.cat?.forEach?.((child: Node) => openChildren(nodeId, child))
        }
      };
      state.data.cat.forEach((child: Node) => openChildren(id, child));
      saveState(state);
    },
    closeAllChildren(state: State, id: string) {
      const closeChildren = (nodeId: string, data: Node) => {
        if (data._nodeId === nodeId) {
          state.openedNodes = state.openedNodes.filter(n => n !== nodeId);
          data.cat?.forEach?.((child: Node) => closeChildren(child._nodeId, child))
        } else {
          data.cat?.forEach?.((child: Node) => closeChildren(nodeId, child))
        }
      };
      state.data.cat.forEach((child: Node) => closeChildren(id, child));
      saveState(state);
    }
  },
});

export default store;