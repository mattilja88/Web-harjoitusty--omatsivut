export class Square{
    _x
    _y
    _height
    _vari
    _lineWidth
    _fillColor
    _text

    constructor(x,y,height,vari,lineWidth,fillColor,text) {
        this._x = x
        this._y = y
        this._vari = vari
        this._height = height
        this._lineWidth = lineWidth
        this._fillColor = fillColor
        this._text = text
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.rect(this._x, this._y, this._height, this._height)
        ctx.lineWidth = this._lineWidth
        ctx.strokeStyle = this._vari
        ctx.stroke()
        ctx.fillStyle = this._fillColor
        ctx.fill()

        ctx.fillStyle = 'black'; // tekstin väri
        ctx.font = '12px Arial'; // Fonttityyppi
        ctx.textAlign = 'center'; // keskelle horisontaalisesti
        ctx.textBaseline = 'middle'; // keskelle vertikaalisesti
        ctx.fillText(this._text, this._x + this._height / 2, this._y + this._height / 2); // piirtää tekstin
    }
}