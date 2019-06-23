import Handler from '../../Handler';

export default function getToolSelectionHandler(target, actionOnTool, tools) {
  function onClick(clickEvt) {
    let currentNode = clickEvt.target;
    let tool = currentNode.getAttribute('data-tool-type');
    while (!tool) {
      currentNode = currentNode.parentNode;
      tool = currentNode.getAttribute('data-tool-type');
    }
    if (tool !== 'mainColorPicker' && tool !== 'subColorPicker') {
      actionOnTool(tools[tool]);
    }
  }

  const toolSelectionHandler = new Handler(target, 'click', onClick);
  return toolSelectionHandler;
}
