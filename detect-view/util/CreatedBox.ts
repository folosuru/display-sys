import {Color} from "./color.js";
import {add, onClick} from "./CreatedBoxManager.js";


export class CreatedBox{

    // @ts-ignore
    private canvas : HTMLCanvasElement = document.getElementById('canvas');

    public readonly height : number;
    public readonly width : number;
    public readonly x : number;
    public readonly y : number;

    public readonly uniq_id : string;

    private sendName : string = "";

    private light_threshold : number = 128;

    private light_biggest : number = 256;
    private light_smallest : number = 0;

    private selectedBox :HTMLDivElement;

    showEditWindow(ev : MouseEvent){
        // @ts-ignore
        let edit_window: HTMLDivElement = document.getElementById("created_box_edit");
        edit_window.style.display = "block";
        edit_window.style.left = String(ev.pageX) + "px";
        edit_window.style.top = String(ev.pageY) + "px";
        edit_window.style.position = "absolute";
        // @ts-ignore
        let element_name_input: HTMLInputElement = document.getElementById("element_name");
        element_name_input.value = this.uniq_id;
    }

    showSelectedBox() :void {
        console.log(this.uniq_id);
    }

    createSelectedBox(id : String) :HTMLDivElement{
        // @ts-ignore
        let parent :HTMLDivElement = document.getElementById("created_box_wrap");
        let new_box :HTMLDivElement =  document.createElement("div");
        new_box.id = String(id);
        new_box.addEventListener("click",onClick);
        new_box.style.top = String(this.y+"px");
        new_box.style.left = String(this.x+"px");
        new_box.style.width = String(this.width+"px");
        new_box.style.height = String(this.height+"px");
        parent.appendChild(new_box);
        return new_box;
    }


    getColor(){
        const context = this.canvas.getContext("2d");
        if (context == null) {return}
        let img: ImageData = context.getImageData(this.x, this.y, this.width, this.height);
        return this.getImageAverage(img);
    }

    changeSendName(name :string){
        this.sendName = name;
        console.log(name);
    }

    getSendName() : string{
        return  this.sendName;
    }

    isLighterThanThreshold() :boolean{
        let color : any = this.getColor();
        if (color != undefined){
            return  color.lighterThan(this.light_threshold);
        } else  {
            return true;//ごめん
        }
    }

    createThreshold_min() : void{
        let color : Color|undefined = this.getColor();
        if (color == undefined){
            alert("読み取りに失敗したので、うん。ごめん");
        } else {
            this.light_smallest = color.getBiggest();
        }
    }
    createThreshold_max() : void{
        let color : Color|undefined = this.getColor();
        if (color == undefined){
            alert("読み取りに失敗したので、うん。ごめん");
        } else {
            this.light_biggest = color.getBiggest();
        }
    }

    constructor(x1 : number, y1 :number, x2 :number, y2 :number) {
        this.x = Math.min(x1,x2);
        this.y = Math.min(y1,y2);
        this.width = Math.max(x1,x2) - this.x;
        this.height = Math.max(y1,y2) - this.y;
        this.uniq_id = new Date().getTime().toString(16);
        this.selectedBox = this.createSelectedBox(this.uniq_id);
        console.log(this.uniq_id);
        add(this);
    }

    getImageAverage(image : ImageData) : Color {
        let r : number = 0;
        let g : number = 0;
        let b : number = 0;
        for (let i = 0; i <image.data.length; i = i + 4) {
            r = r + image.data[i];
            g = g + image.data[i+1];
            b = b + image.data[i+1];
        }
        return new Color(
            r/(image.data.length/4),
            g/(image.data.length/4),
            b/(image.data.length/4),
        );
    }


}