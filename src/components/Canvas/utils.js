export const getShapesAtCoord = (shapes, x, y) => {
    let result = []
    for (const shape of shapes.toReversed()) {
        if (shape.containsCoordinate(x, y)) {
            result.push(shape);
        }
    }
    return result;
}

export const containsCoordinate = (shape, x, y) => {
    const maxX = shape.x + shape.width;
    const maxY = shape.y + shape.height;

    return x >= shape.x && x <= maxX && y >= shape.y && y <= maxY;
}