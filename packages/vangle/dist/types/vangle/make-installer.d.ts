import type { App, Plugin } from 'vue';
export declare function makeInstaller(components?: Plugin[]): {
    install: (app: App) => void;
};
