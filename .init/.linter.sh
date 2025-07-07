#!/bin/bash
cd /home/kavia/workspace/code-generation/multiverse-nexus-110544-dd67cfb8/mirrorverse_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

