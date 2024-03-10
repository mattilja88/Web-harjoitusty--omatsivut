export class Square{
    _x
    _y
    _height
    _vari
    _lineWidth
    _fillColor

    constructor(x,y, height, vari, lineWidth, fillColor) {
        this._x = x
        this._y = y
        this._vari = vari
        this._height = height
        this._lineWidth = lineWidth
        this._fillColor = fillColor
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this._x, this._y, this._height, this._height)
        ctx.lineWidth = this._lineWidth
        ctx.strokeStyle = this._vari
        ctx.stroke()
        ctx.fillStyle = this._fillColor
        ctx.fill()
    }
}