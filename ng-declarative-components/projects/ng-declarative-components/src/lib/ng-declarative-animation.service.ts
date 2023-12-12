// animation.service.ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AnimationService {
  private applyStyles(
    element: HTMLElement,
    styles: Partial<CSSStyleDeclaration>
  ) {
    Object.assign(element.style, styles);
  }

  private animateFadeUp(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      opacity: "0",
      transform: "translateY(50px)",
      transition: `opacity ${duration} ease-out, transform ${duration} ease-out`,
    });

    setTimeout(() => {
      this.applyStyles(element, {
        opacity: "1",
        transform: "translateY(0)",
      });
    });
  }

  private animateFadeIn(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      opacity: "0",
      transition: `opacity ${duration} ease-out`,
    });

    setTimeout(() => {
      this.applyStyles(element, {
        opacity: "1",
      });
    });
  }

  private animateSlideIn(element: HTMLElement, duration: string = "0.5s") {
    // Set initial styles
    this.applyStyles(element, {
      transform: "translateX(-100%)",
    });

    // Use setTimeout to delay applying final styles
    setTimeout(() => {
      // Set final styles with transition
      this.applyStyles(element, {
        transform: "translateX(0px)",
        transition: `transform ${duration} ease-out`,
      });
    }, 0);
  }

  private animateBounce(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      animation: `bounce ${duration} ease-in-out`,
    });

    // Add bounce keyframes
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `@keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-30px);
      }
      60% {
        transform: translateY(-15px);
      }
    }`,
      styleSheet.rules.length
    );
  }
  private animateRotate(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      transform: "rotate(0deg)",
      transition: `transform ${duration} ease-out`,
    });

    setTimeout(() => {
      this.applyStyles(element, {
        transform: "rotate(360deg)",
      });
    });
  }
  private animateZoomIn(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      transform: "scale(0)",
      transition: `transform ${duration} ease-out`,
    });

    setTimeout(() => {
      this.applyStyles(element, {
        transform: "scale(1)",
      });
    });
  }
  private animateZoomOut(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      transform: "scale(1)",
      transition: `transform ${duration} ease-out`,
    });

    setTimeout(() => {
      this.applyStyles(element, {
        transform: "scale(0)",
      });
    });
  }
  private animateFlipX(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      transform: "rotateX(0deg)",
      transition: `transform ${duration} ease-out`,
    });

    setTimeout(() => {
      this.applyStyles(element, {
        transform: "rotateX(180deg)",
      });
    });
  }
  private animateFlipY(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      transform: "rotateY(0deg)",
      transition: `transform ${duration} ease-out`,
    });

    setTimeout(() => {
      this.applyStyles(element, {
        transform: "rotateY(180deg)",
      });
    });
  }
  private animateScaleUp(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      transform: "scale(0)",
      transition: `transform ${duration} ease-out`,
    });

    setTimeout(() => {
      this.applyStyles(element, {
        transform: "scale(1)",
      });
    });
  }

  private animateShake(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      animation: `shake ${duration} ease-in-out`,
    });

    // Add shake keyframes
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `@keyframes shake {
      0%, 100% {
        transform: translateX(0);
      }
      10%, 30%, 50%, 70%, 90% {
        transform: translateX(-10px);
      }
      20%, 40%, 60%, 80% {
        transform: translateX(10px);
      }
    }`,
      styleSheet.rules.length
    );
  }
  private animatePulse(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      transform: "scale(1)",
      animation: `pulse ${duration} infinite`,
    });

    // Add pulse keyframes
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `@keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }`,
      styleSheet.rules.length
    );
  }
  private animateSwing(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      transform: "rotate(0deg)",
      transformOrigin: "top center",
      animation: `swing ${duration} ease-in-out`,
    });

    // Add swing keyframes
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `@keyframes swing {
      20% {
        transform: rotate(15deg);
      }
      40% {
        transform: rotate(-10deg);
      }
      60% {
        transform: rotate(5deg);
      }
      80% {
        transform: rotate(-5deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }`,
      styleSheet.rules.length
    );
  }
  private animateFlash(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      animation: `flash ${duration} ease-out`,
    });

    // Add flash keyframes
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `@keyframes flash {
      0%, 50%, 100% {
        opacity: 1;
      }
      25%, 75% {
        opacity: 0;
      }
    }`,
      styleSheet.rules.length
    );
  }
  private animateBounceIn(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      animation: `bounceIn ${duration} ease-out`,
    });

    // Add bounceIn keyframes
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `@keyframes bounceIn {
      0%, 20%, 50%, 80%, 100% {
        transform: scale(0);
      }
      40% {
        transform: scale(1.2);
      }
      60% {
        transform: scale(0.9);
      }
    }`,
      styleSheet.rules.length
    );
  }
  private animateTada(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      animation: `tada ${duration} ease-out`,
    });

    // Add tada keyframes
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `@keyframes tada {
      0%, 100% {
        transform: scale(1);
      }
      10%, 20% {
        transform: scale(0.9) rotate(-3deg);
      }
      30%, 50%, 70%, 90% {
        transform: scale(1.1) rotate(3deg);
      }
      40%, 60%, 80% {
        transform: scale(1.1) rotate(-3deg);
      }
    }`,
      styleSheet.rules.length
    );
  }
  private async animateTyping(element: HTMLElement, duration: string = '2s') {

    // Extract text content from the element
    const text = element.textContent || '';

    // Clear existing content
    element.innerHTML = '';


    // Convert duration to milliseconds
    const durationMs = this.convertToMilliseconds(duration);

    // Calculate delay based on duration and text length
    const delay = durationMs / text.length;

    // Iterate over each character and add it to inner HTML with calculated delay
    for (let i = 0; i < text.length; i++) {
      element.innerHTML += text.charAt(i);

      // Wait for the calculated delay
      await this.delay(delay);
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private convertToMilliseconds(duration: string): number {
    const value = parseFloat(duration);
    return duration.includes('ms') ? value : value * 1000;
  }



  private animateRollIn(element: HTMLElement, duration: string = "0.5s") {
    this.applyStyles(element, {
      animation: `rollIn ${duration} ease-out`,
    });

    // Add rollIn keyframes
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(
      `@keyframes rollIn {
      0% {
        opacity: 0;
        transform: translateX(-100%) rotate(-120deg);
      }
      100% {
        opacity: 1;
        transform: translateX(0) rotate(0deg);
      }
    }`,
      styleSheet.rules.length
    );
  }
  private findClosestScrollableAncestor(element: HTMLElement): HTMLElement | null {
    let parent = element.parentElement;

    while (parent) {
      const style = getComputedStyle(parent);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        return parent;
      }

      parent = parent.parentElement;
    }

    return null;
  }

  private animateOnScroll(
    element: HTMLElement,
    animationMethod: (element: HTMLElement, duration?: string) => void,
    duration: string = "0.5s"
  ): void {
    const scrollContainer = this.findClosestScrollableAncestor(element);

    if (!scrollContainer) {
      console.error('Unable to find a scrollable ancestor.');
      return;
    }

    const animateIfVisible = () => {
      if (this.isInViewport(element, scrollContainer)) {
        animationMethod(element, duration);
        window.removeEventListener('scroll', animateIfVisible);
      }
    };

    window.addEventListener('scroll', animateIfVisible);

    // Initial check in case the element is already in the viewport
    animateIfVisible();
  }
  private isInViewport(el: HTMLElement, scrollContainer: HTMLElement | Window): boolean {
    const rect = el.getBoundingClientRect();
    const containerRect =
      scrollContainer instanceof Window
        ? { top: 0, left: 0, bottom: window.innerHeight, right: window.innerWidth }
        : scrollContainer.getBoundingClientRect();

    return (
      rect.top >= containerRect.top &&
      rect.left >= containerRect.left &&
      rect.bottom <= containerRect.bottom &&
      rect.right <= containerRect.right
    );
  }


  animate(transition: string, element: HTMLElement, duration: string = "0.5s") {
    switch (transition.toLowerCase()) {
      case "fade-up":
        this.animateFadeUp(element, duration);
        break;
      case "fade-in":
        this.animateFadeIn(element, duration);
        break;
      case "slide-in":
        this.animateSlideIn(element, duration);
        break;
      case "bounce":
        this.animateBounce(element, duration);
        break;
      case "rotate":
        this.animateRotate(element, duration);
        break;
      case "zoom-in":
        this.animateZoomIn(element, duration);
        break;
      case "zoom-out":
        this.animateZoomOut(element, duration);
        break;
      case "flip-x":
        this.animateFlipX(element, duration);
        break;
      case "flip-y":
        this.animateFlipY(element, duration);
        break;
      case "scale-up":
        this.animateScaleUp(element, duration);
        break;
      case "shake":
        this.animateShake(element, duration);
        break;
      case "pulse":
        this.animatePulse(element, duration);
        break;
      case "swing":
        this.animateSwing(element, duration);
        break;
      case "flash":
        this.animateFlash(element, duration);
        break;
      case "bounce-in":
        this.animateBounceIn(element, duration);
        break;
      case "tada":
        this.animateTada(element, duration);
        break;
      case "roll-in":
        this.animateRollIn(element, duration);
        break;
      case "typing":
        this.animateTyping(element, duration);
        break;
      // Add more cases for other animations as needed
      default:
        console.warn(
          `Animation ${transition} not found. No animation applied.`
        );
        break;
    }
  }
}
