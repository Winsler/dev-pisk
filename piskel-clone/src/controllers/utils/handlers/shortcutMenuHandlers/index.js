import getOnOpenShortcutMenuHandler, {
  getShortcutMenuClickHandler,
  getCloseShortcutMenuHandler,
  getRestoreBtnHandler,
} from './shortcutMenuHandlers';

const getShortcutMenuHandlers = {
  onOpen: getOnOpenShortcutMenuHandler,
  onMenuClick: getShortcutMenuClickHandler,
  closeMenu: getCloseShortcutMenuHandler,
  restoreShortCuts: getRestoreBtnHandler,
};

export default getShortcutMenuHandlers;
