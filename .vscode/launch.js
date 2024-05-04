{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Express App",
            "skipFiles": ["<node_internals>/**"],
            "program": "${workspaceFolder}/app.js",
            "restart": true,
            "runtimeExecutable": "node",
            "env": {
                "NODE_ENV": "development"
            },
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen"
        }
    ]
}
