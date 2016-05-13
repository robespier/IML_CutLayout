"use strict";

/**
 * Shortcut to platform
 *
 * @var {boolean}
 */
const isWindows = process.platform === 'win32';

/**
 * Spread changes on remote machines using rsync
 *
 * Export env var before `grunt exec:sync`:
 * export GRUNT_HOSTS="192.168.0.152[,192.168.0.153[:8011]]"
 *   ip   -- IP address, mandatory
 *   port -- optional, default is 8011
 *
 * On remote end rsync runs as a daemon with `package.name` stanza
 */
let exec = "echo 'No GRUNT_HOSTS exported'"; // No need to sync...
// ... or harvest remotes
if (process.env.GRUNT_HOSTS) {
  const devHosts = process.env.GRUNT_HOSTS.split(',');
  const commands = devHosts.map(host => {
    const params = host.split(':');
    const devHostIp = params[0];
    const devHostPort = params[1] || 8011;
    const command = [
      // @fixme replace `echo` with cygwin path
      isWindows ? "echo" : "/usr/bin/rsync",
      "-avz",
      "--exclude *.swp",
      `--port ${devHostPort}`,
      "src/extension/", // @fixme head to dist
      `${devHostIp}::<%= pkg.name %>`
    ];
    return command.join(" ");
  });
  exec = commands.join(";");
}

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
  /**
   * Синхронизация кода с тестовыми машинами
   */
  sync: {
    command: exec
  },
};
