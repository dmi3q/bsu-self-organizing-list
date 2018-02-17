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
            this.tail = node;
            this.head = this.tail;
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
        while (iterator != null) {
            ++count;
            iterator = iterator.next;
        }
        return count;
    }

    at(index) {
        if (!this.size() || index > this.size()) return null;
        var i = 0;
        var iterator = this.head;
        while (i != index) {
            iterator = iterator.next;
            ++i;
        }
        return iterator.data;
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
        var iterator = this.head;
        while (iterator != null) {
            array.push(iterator.data);
            iterator = iterator.next;
        }
        return array;
    }

    removeAt(index) {
        var currentNode = this.findNode(this.at(index));
        if (this.size() == 1) {
            this.head = null;
            this.tail = null;
            return;
        }
        if (currentNode == this.head) this.head = currentNode.next;
        if (currentNode == this.tail) this.tail = currentNode.prev;
        if (index < this.size() - 1) currentNode.next.prev = currentNode.prev;
        if (index > 0) currentNode.prev.next = currentNode.next;
        currentNode.next = null;
        currentNode.prev = null;
        currentNode.data = null;
    }

    moveToFront(node) {
        var currentNode = this.findNode(node.data);
        if (this.size() < 2 || currentNode == this.head) return;
        if (this.size() == 2) {
            currentNode.next = currentNode.prev;
            currentNode.next.prev = currentNode;
            currentNode.next.next = null;
            currentNode.prev = null;
            currentNode.next = this.tail;
            currentNode = this.head;
        }
        if (currentNode != this.tail) {
            currentNode.next.prev = currentNode.prev;
            currentNode.prev.next = currentNode.next;
            currentNode.next = this.head;
            currentNode.prev = null;
            this.head = currentNode;
        }
        if (currentNode == this.tail) {
            this.tail = currentNode.prev;
            currentNode.next = this.head;
            currentNode.prev.next = null;
            currentNode.prev = null;
            this.head.prev = currentNode;
            this.head = currentNode;
        }
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
