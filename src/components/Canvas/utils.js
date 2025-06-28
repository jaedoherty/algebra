export const getShapesAtCoord = (shapes, x, y) => {
    let result = []
    for (const shape of shapes.toReversed()) {
        if (shape.containsCoordinate(x, y)) {
            result.push(shape);
        }
    }
    return result;
}