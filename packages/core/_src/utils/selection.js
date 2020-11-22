export const getSelectionRect = (selected) => {
    const _rect = selected.getRangeAt(0).getBoundingClientRect();

    let rect = _rect && _rect.top ? _rect : selected.getRangeAt(0).getClientRects()[0];
    if (!rect) {
        if (selected.anchorNode && selected.anchorNode.getBoundingClientRect) {
            rect = selected.anchorNode.getBoundingClientRect();
            rect.isEmptyline = true;
        } else {
            return null;
        }
    }
    return rect;
};


export const getSelection = (root) => {
    let t = null;
    if (root.getSelection) {
        t = root.getSelection();
    } else if (root.document.getSelection) {
        t = root.document.getSelection();
    } else if (root.document.selection) {
        t = root.document.selection.createRange().text;
    }
    return t;
};

export const getSelectedBlockNode = (root) => {
    const selection = root.getSelection();

    if (selection.rangeCount === 0) {
        return null;
    }

    let node = selection.getRangeAt(0).startContainer;
    console.log(node)
    do {
        if (node.getAttribute && node.getAttribute('data-block') === 'true') {
            return node;
        }

        node = node.parentNode;

    } while (node !== null);

    return null;
};
