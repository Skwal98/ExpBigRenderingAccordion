import {
    animate,
    AnimationKeyframesSequenceMetadata,
    AnimationTriggerMetadata,
    keyframes,
    state,
    style,
    transition,
    trigger
  } from '@angular/animations';
  
  export class BaseAnimation {
    static getShakeAnimation(): AnimationKeyframesSequenceMetadata {
      return keyframes([
        style({ transform: 'translate(2px, 1px) rotate(0deg)' }),
        style({ transform: 'translate(-1px, -2px) rotate(-1deg)' }),
        style({ transform: 'translate(-3px, 0px) rotate(1deg)' }),
        style({ transform: 'translate(0px, 2px) rotate(0deg)' }),
        style({ transform: 'translate(1px, -1px) rotate(1deg)' }),
        style({ transform: 'translate(-1px, 2px) rotate(-1deg)' }),
        style({ transform: 'translate(-3px, 1px) rotate(0deg)' }),
        style({ transform: 'translate(2px, 1px) rotate(-1deg)' }),
        style({ transform: 'translate(-1px, -1px) rotate(1deg)' }),
        style({ transform: 'translate(2px, 2px) rotate(0deg)' }),
        style({ transform: 'translate(1px, -2px) rotate(-1deg)' })
      ]);
    }
  
    static getSlideAnimation(addInitialState: boolean = true): AnimationTriggerMetadata {
      return trigger('slide', [
        ...(addInitialState ? [state('*', style({ height: 0 }))] : []),
        state('up', style({ height: 0 })),
        state('down', style({ height: '*' })),
        transition('up <=> down', animate('100ms ease-out'))
      ]);
    }
  }
  