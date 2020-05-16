/// <reference types="node" />

declare module 'secure-env' {
    export default function (secret: { secret: string }): NodeJS.ProcessEnv;
}

