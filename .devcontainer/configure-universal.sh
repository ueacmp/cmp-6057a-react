#!/usr/bin/env bash
set -euo pipefail

# The universal image inherits these lifecycle hooks. Configure their existing
# opt-outs before postCreateCommand and postStartCommand run.
lfs_hook=/usr/local/share/pull-git-lfs-artifacts.sh
if [[ -f "$lfs_hook" ]]; then
  sudo sed -i 's/^AUTO_PULL=.*/AUTO_PULL=false/' "$lfs_hook"
fi

# The Copilot update hook only runs when this marker exists.
sudo rm -f /etc/devcontainer-copilot-cli/auto-update
