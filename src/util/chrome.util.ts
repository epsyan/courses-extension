export const getModuleFromBackgroundPage = <T>(moduleName: keyof Window): T => {
    const module = chrome.extension.getBackgroundPage()?.window[moduleName];

    if (!module) {
        throw new Error(`No ${module} found in background page`);
    }

    return module;
};

export const getMethodFromBackgroundPage = <Module extends keyof Window, Method extends keyof Window[Module]>(
    moduleName: Module,
    method: Method
): Window[Module][Method] => {
    const module = getModuleFromBackgroundPage<Window[Module]>(moduleName);

    return module[method].bind(module);
};
