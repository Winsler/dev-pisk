import Handler from '../../Handler';

export default function getToolSelectionHandler(target, actionOnTool, tools) {
  function onClick(clickEvt) {
    const excludes = ['mainColorPicker', 'subColorPicker', 'shortCutsSetter', 'swapcolors'];
    let currentNode = clickEvt.target;
    let tool = currentNode.getAttribute('data-tool-type');
    while (!tool) {
      currentNode = currentNode.parentNode;
      tool = currentNode.getAttribute('data-tool-type');
    }
    if (!excludes.includes(tool)) {
      actionOnTool(tools[tool]);
    }
  }

  const toolSelectionHandler = new Handler(target, 'click', onClick);
  return toolSelectionHandler;
}
