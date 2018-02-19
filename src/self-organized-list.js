class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class SelfOrganizedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    insert(data) {
        let node = new Node(data);
        if (this.head == null) {
            this.head = this.tail = node;
        }
        else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
    }

    size() {
        var count = 0;
        var iterator = this.head;
        while (iterator) {
            ++count;
            iterator = iterator.next;
        }
        return count;
    }

    nodeAt(index) {
        if (!this.size() || index < 0 || index >= this.size()) return null;
        var i = 0;
        var iterator = this.head;
        while (i != index) {
            iterator = iterator.next;
            ++i;
        }
        return iterator;
    }

    at(index) {
        if (!this.nodeAt(index)) return null;
        else return this.nodeAt(index).data;
    }

    findNode(data) {
        if (!this.size()) return null;
        var iterator = this.head;
        while (iterator.data != data) {
            if (iterator == this.tail) return null;
            iterator = iterator.next;
        }
        return iterator;
    }

    toArray() {
        var array = [];
        for (var iterator = this.head; iterator; iterator = iterator.next)
            array.push(iterator.data);
        return array;
    }

    removeAt(index) {
        var currentNode = this.nodeAt(index);
        if (currentNode == this.head) this.head = currentNode.next;
        else currentNode.prev.next = currentNode.next;
        if (currentNode == this.tail) this.tail = currentNode.prev;
        else currentNode.next.prev = currentNode.prev;
        currentNode.next = currentNode.prev = currentNode.data = null;
    }

    moveToFront(node) {
        if (this.size() < 2 || node == this.head) return;
        if (node == this.tail) {
            this.tail = node.prev;
            this.tail.next = null;
        }
        else {
            node.next.prev = node.prev;
            node.prev.next = node.next;
        }
        this.head.prev = node;
        node.next = this.head;
        node.prev = null;
        this.head = node;
    }

    reorganize(data) {
        var currentNode = this.findNode(data);
        if (currentNode == null) return false;
        this.moveToFront(currentNode);
        return true;
    }
}

module.exports = {
    SelfOrganizedList,
    Node
};
