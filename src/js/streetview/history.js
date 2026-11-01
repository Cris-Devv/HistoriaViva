const backStack = [];
const forwardStack = [];

export function startHistory(locationId) {
    backStack.length = 0;
    forwardStack.length = 0;
    backStack.push(locationId);
}

export function visitLocation(locationId) {
    if (backStack.at(-1) !== locationId) {
        backStack.push(locationId);
    }
    forwardStack.length = 0;
}

export function goBack() {
    if (backStack.length < 2) return null;
    forwardStack.push(backStack.pop());
    return backStack.at(-1);
}

export function goForward() {
    const locationId = forwardStack.pop();
    if (!locationId) return null;
    backStack.push(locationId);
    return locationId;
}

export function getHistoryState() {
    return {
        canGoBack: backStack.length > 1,
        canGoForward: forwardStack.length > 0
    };
}
