export function isMockedContent(other) {
    return ('object' === typeof other
        &&
            (('cuid' in other) || ('locale' in other) || ('type' in other) || ('headers' in other) || ('modifiers' in other)));
}
export function isMockedFragment(other) {
    return ('object' === typeof other
        &&
            'children' in other);
}
export function isTestDataRecordData(other) {
    return ('object' === typeof other
        &&
            'name' in other
        &&
            'data' in other
        && (isMockedContent(other['data']) || isMockedFragment(other['data'])));
}
export function isTestDataRecord(other) {
    return ('object' === typeof other
        &&
            'componentName' in other
        &&
            'data' in other
        && ((Array.isArray(other['data']) ? other['data'].every(isTestDataRecordData) : isTestDataRecordData(other['data']))
            ||
                isMockedContent(other['data'])
            ||
                isMockedFragment(other['data'])));
}
export function isComponentBuilderData(other) {
    return ('object' === typeof other
        &&
            'componentName' in other
        &&
            'node' in other);
}
export function isTestDataRecordDataType(other) {
    return ('string' === typeof other
        ||
            (isMockedContent(other)
                ||
                    isMockedFragment(other)
                ||
                    isTestDataRecordData(other)));
}
//# sourceMappingURL=interfaces.js.map