function distancia(obj1, obj2) {
    return Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2)
}

function truncateV(vector, max) {
    const lenght = Math.hypot(vector.x, vector.y);
    if (lenght > max) {
        const scale = max / lenght;
        return {
            x: vector.x * scale,
            y: vector.y * scale
        }
    }
    return vector
}

function divideV(vector, scala) {
    return {
        x: vector.x / scala,
        y: vector.y / scala
    }
}

function sumV(vector1, vector2) {
    return {
        x: vector1.x + vector2.x,
        y: vector1.y + vector2.y
    }
}

function normalizeV(vector) {
    const lenght = Math.hypot(vector.x, vector.y)
    if (lenght == 0) return { x: 0, y: 0 };
    return {
        x: vector.x / lenght,
        y: vector.y / lenght
    }
}

function perpendicular(vector) {
    return { x: -vector.y, y: vector.x }
}