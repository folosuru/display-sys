import {CreatedBox} from "./CreatedBox.js";

export let list : Map<string,CreatedBox> = new Map();

let result_map : Map<string,boolean> = new Map();

export function onClick(ev :MouseEvent){
    // @ts-ignore
    list.get(this.id).showEditWindow(ev);
}
export function add(box :CreatedBox){
    list.set(box.uniq_id,box);
}

export function changeSendName(ev :MouseEvent){
    // @ts-ignore
    let box : CreatedBox = list.get(document.getElementById("element_name").value);
    console.log(box);
    box.changeSendName(
        // @ts-ignore
        document.getElementById("send_name_input").value
    );
    // @ts-ignore
    document.getElementById("created_box_edit").style.display = "none";
}

export function takeAll() : Map<string,boolean>{
    result_map = new Map();
    list.forEach(function (value, key, map){
        result_map.set(value.getSendName(),value.isLighterThanThreshold())
    });
    console.log("take!")
    return result_map;
}
