export const ANIMATION = {
  open: {
    duration: 0.32,
    backdropEase: 'power2.out',
    panelEase: 'power3.out'
  },
  close: {
    duration: 0.28,
    backdropEase: 'power2.in',
    panelEase: 'power3.in'
  }
} as const;

type TimelineRef = React.MutableRefObject<gsap.core.Timeline | null>;

export function getReducedMotionPreference(): boolean {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function applyReducedMotionState({
  isOpen,
  container,
  panel,
  backdrop
}: AnimationElements & { isOpen: boolean }) {
  gsap.set(panel, {
    xPercent: isOpen ? 0 : 100,
    force3D: true
  });

  gsap.set(backdrop, {
    opacity: isOpen ? 1 : 0
  });

  container.classList.toggle('is-open', isOpen);
  container.style.visibility = isOpen ? 'visible' : 'hidden';
}

type AnimationElements = {
  container: HTMLDivElement;
  panel: HTMLElement;
  backdrop: HTMLDivElement;
};

export function animateOpen({
  container,
  panel,
  backdrop,
  timelineRef
}: AnimationElements & {
  timelineRef: TimelineRef;
}) {
  container.classList.add('is-open');
  container.style.visibility = 'visible';

  const timeline = gsap.timeline();

  timelineRef.current = timeline;

  timeline
    .set(panel, {
      xPercent: 100,
      force3D: true
    })
    .set(backdrop, {
      opacity: 0
    })
    .to(
      backdrop,
      {
        opacity: 1,
        duration: ANIMATION.open.duration,
        ease: ANIMATION.open.backdropEase
      },
      0
    )
    .to(
      panel,
      {
        xPercent: 0,
        duration: ANIMATION.open.duration,
        ease: ANIMATION.open.panelEase
      },
      0
    );
}

export function animateClose({
  container,
  panel,
  backdrop,
  timelineRef
}: AnimationElements & {
  timelineRef: TimelineRef;
}) {
  const timeline = gsap.timeline({
    onComplete: () => {
      container.classList.remove('is-open');
      container.style.visibility = 'hidden';
    }
  });

  timelineRef.current = timeline;

  timeline
    .to(panel, {
      xPercent: 100,
      duration: ANIMATION.close.duration,
      ease: ANIMATION.close.panelEase
    })
    .to(
      backdrop,
      {
        opacity: 0,
        duration: ANIMATION.close.duration,
        ease: ANIMATION.close.backdropEase
      },
      0
    );
}
