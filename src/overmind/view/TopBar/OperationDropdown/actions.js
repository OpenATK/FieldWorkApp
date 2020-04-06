export default {
  onAdd({actions}) {
    return actions.view.Modals.NewOperation.open()
  },
  onChange({state}, {id}) {
    const myState = state.view.TopBar.OperationDropdown;
    myState.selected = id;
    myState.open = true;
  },
  onOpenChange({state}, {open}) {
    const myState = state.view.TopBar.OperationDropdown;
    myState.open = open;
  },
  onSearch({state}, {search}) {
    const myState = state.view.TopBar.OperationDropdown;
    myState.search = search;
  }
}
