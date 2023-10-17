import {Ref, ref} from "vue";

export type TouchPoint = {
    left: number,
    top: number,
}

export const useButtonTouch = (event: TouchEvent, refDom: Ref<HTMLElement | null>, status: number): TouchPoint => {
    let pageX = ref(0), pageY = ref(0),
        offsetTop = ref(0), offsetLeft = ref(0);
    const { changedTouches, target  } = event || {};
    if(changedTouches && changedTouches[0]){
        pageX.value = changedTouches[0].pageX;
        pageY.value = changedTouches[0].pageY;
    }
    console.dir(event)
    console.dir(refDom.value)
    if(refDom.value){
        offsetTop.value = refDom.value?.offsetTop || 0;
        offsetLeft.value = refDom.value?.offsetLeft || 0;
    }
    console.log(pageY.value - offsetTop.value)
    return {
        left: pageX.value - offsetLeft.value,
        top: pageY.value - offsetTop.value
    }
}

export const useButtonMouse = (event: MouseEvent, refDom: Ref<HTMLElement | null>, status: number): TouchPoint => {
    let left = event.offsetX,
        top = event.offsetY;
    ;
    return {
        left,
        top
    }
}