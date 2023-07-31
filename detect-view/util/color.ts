export class Color {
    public r : number;
    public b : number;
    public g : number;

    constructor(r_ : number, g_ : number, b_ : number) {
        this.r = r_;
        this.g = g_;
        this.b = b_;
    }

    getBiggest() : number {
        return  Math.max(this.r,this.g,this.b);
    }

    lighterThan(color : Color|number) : boolean{
        if (color instanceof Color) {
            return (color.getBiggest() < this.getBiggest());
        } else {
            return (color < this.getBiggest());
        }
    }
}