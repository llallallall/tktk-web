import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInSlow =
  trigger('fadeInSlow', [
    // route 'enter' transition
    transition(':enter', [

      // styles at start of transition
      style({ opacity: 0 }),

      // animation and styles at end of transition
      animate('1.3s', style({ opacity: 1 }))
    ]),
  ]);
