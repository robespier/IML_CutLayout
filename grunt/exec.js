"use strict";

/**
 * Shortcut to platform
 *
 * @var {boolean}
 */
const isWindows = process.platform === 'win32';

module.exports = {
  /**
   * Включение/выключение режима отладки CSXS
   */
  debugon: {
    command: isWindows ? "reg add HKCU\\Software\\Adobe\\CSXS.<%= ccVersion %> /v PlayerDebugMode /d 1 /f" : "defaults write com.adobe.CSXS.<%= ccVersion %> PlayerDebugMode 1"
  },
  debugoff: {
    command: isWindows ? "reg delete HKCU\\Software\\Adobe\\CSXS.<%= ccVersion %> /v PlayerDebugMode /f" : "defaults delete com.adobe.CSXS.<%= ccVersion %> PlayerDebugMode"
  },
};
