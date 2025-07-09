
export interface State {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    selectedNodes: Node[];
    openedNodes: string[];
    highlightedNode: string | null;
  }

export interface Node {
    cat?: Node[];
    leaf?: Node[];
    _nodeId: string;
    _name: string;
    _fgs: string;
    _state: string;
    _overstock: string;
    _stockout: string;
    _nodeFlags: string;
}
