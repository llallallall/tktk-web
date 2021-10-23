import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeIn =
  trigger('fadeIn', [
    // route 'enter' transition
    transition(':enter', [

      // styles at start of transition
      style({ opacity: 0 }),

      // animation and styles at end of transition
      animate('0.3s', style({ opacity: 1 }))
    ]),
  ]);
